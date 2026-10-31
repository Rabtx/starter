/**
 * Builds the shadcn registry for @rabtx/ui, so any shadcn project can install a component with
 * `npx shadcn@latest add <docs>/r/button.json` (or `@rabtx/button`) and own its source.
 *
 *   1. Stage: copy each component's source into a temporary shadcn source registry, rewriting the
 *      package's imports to shadcn aliases (`@/lib/utils`, `@/hooks/...`) and turning its CSS into the
 *      registry `css` / `cssVars` fields.
 *   2. Build: run `shadcn build` on it.
 *   3. Write the items to apps/docs/registry/r. The docs serve them at /r/<name>.json and replace
 *      `{{origin}}` with the docs URL, so dependencies resolve on localhost and in production alike.
 *
 * `--check` builds to a temporary folder and fails if the committed files are out of date (CI).
 */
import { execFileSync } from "node:child_process";
import {
	cpSync,
	existsSync,
	mkdirSync,
	mkdtempSync,
	readdirSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import postcss, {
	type AtRule,
	type ChildNode,
	type Container,
	parse,
	type Rule,
	root as cssRoot,
} from "postcss";
import nested from "postcss-nested";
import { springVars } from "./generate-springs";

const PKG = new URL("..", import.meta.url).pathname;
const SRC = join(PKG, "src");
const OUT = join(PKG, "../../apps/docs/registry/r");
const ORIGIN = "{{origin}}";
const SHADCN = join(PKG, "node_modules/.bin/shadcn");

type CssObject = { [key: string]: string | CssObject };
type File = { from: string; type: "registry:ui" | "registry:lib" | "registry:hook"; name?: string };
type Item = {
	name: string;
	type: string;
	title: string;
	description: string;
	files?: File[];
	dependencies?: string[];
	registryDependencies?: string[];
	css?: CssObject;
	cssVars?: {
		theme?: Record<string, string>;
		light?: Record<string, string>;
		dark?: Record<string, string>;
	};
	docs?: string;
	categories?: string[];
};

// ---------------------------------------------------------------------------------------------
// CSS: nested source CSS -> the flat object shape the shadcn CLI writes into a project's CSS file.
// The CLI does not unnest, so rules are flattened first (postcss-nested bubbles @media / @supports
// out of rules) and every key is a selector or an at-rule.

function toObject(container: Container, where: string, warnings: string[]): CssObject {
	const out: CssObject = {};
	const put = (key: string, value: string | CssObject) => {
		const existing = out[key];
		if (existing === undefined) out[key] = value;
		else if (typeof existing === "object" && typeof value === "object") {
			warnings.push(`${where}: merged repeated "${key}"`);
			Object.assign(existing, value);
		} else out[key] = value;
	};
	container.each((node: ChildNode) => {
		if (node.type === "comment") return;
		if (node.type === "decl") {
			put(
				node.prop,
				`${node.value.replace(/\s+/g, " ").trim()}${node.important ? " !important" : ""}`,
			);
		} else if (node.type === "rule") {
			put((node as Rule).selectors.join(", "), toObject(node as Rule, where, warnings));
		} else if (node.type === "atrule") {
			const at = node as AtRule;
			if (at.name === "source") return;
			put(`@${at.name} ${at.params.replace(/\s+/g, " ").trim()}`, toObject(at, where, warnings));
		}
	});
	return out;
}

function cssObject(css: string, where: string, warnings: string[]): CssObject {
	const root = postcss([nested()]).process(css, { from: undefined }).root;
	return toObject(root, where, warnings);
}

const readStyle = (name: string) => readFileSync(join(SRC, "styles", name), "utf8");

/** The custom properties declared directly in the first rule matching `selector` in theme.css. */
function themeBlock(selector: string): Record<string, string> {
	const root = parse(readStyle("theme.css"));
	let vars: Record<string, string> | undefined;
	root.walkRules((rule) => {
		if (vars || rule.selectors.join(", ") !== selector) return;
		vars = {};
		rule.each((node) => {
			if (node.type === "decl" && node.prop.startsWith("--")) {
				vars![node.prop.slice(2)] = node.value.replace(/\s+/g, " ").trim();
			}
		});
	});
	if (!vars) throw new Error(`theme.css has no "${selector}" block`);
	return vars;
}

/** `@theme inline` entries in theme.css that map Rabtx-only tokens (shadcn projects have the rest). */
function themeMappings(): Record<string, string> {
	const out: Record<string, string> = {};
	parse(readStyle("theme.css")).walkAtRules("theme", (at) => {
		at.walkDecls((decl) => {
			const token = decl.value.match(/^var\(--([\w-]+)\)$/)?.[1];
			if (token && !SHADCN_TOKENS.has(token)) out[decl.prop.slice(2)] = decl.value;
		});
	});
	return out;
}

/** The selectors in theme.css that switch the radius mode, as registry CSS. */
function radiusModes(warnings: string[]): CssObject {
	const root = parse(readStyle("theme.css"));
	const modes = cssRoot();
	root.walkRules((rule) => {
		if (rule.selector.startsWith("[data-radius")) modes.append(rule.clone());
	});
	return toObject(modes, "theme.css", warnings);
}

// shadcn's own tokens: every shadcn project already defines these, so components may rely on them.
const SHADCN_TOKENS = new Set([
	"background",
	"foreground",
	"card",
	"card-foreground",
	"popover",
	"popover-foreground",
	"primary",
	"primary-foreground",
	"secondary",
	"secondary-foreground",
	"muted",
	"muted-foreground",
	"accent",
	"accent-foreground",
	"destructive",
	"border",
	"input",
	"ring",
	"radius",
	"font-sans",
	"chart-1",
	"chart-2",
	"chart-3",
	"chart-4",
	"chart-5",
	"sidebar",
	"sidebar-foreground",
	"sidebar-primary",
	"sidebar-primary-foreground",
	"sidebar-accent",
	"sidebar-accent-foreground",
	"sidebar-border",
	"sidebar-ring",
]);

// ---------------------------------------------------------------------------------------------
// Source: a component folder -> registry files, with the package's imports rewritten.

// `builtin` names a shadcn item (every shadcn project already has `utils`); `dependency` one of ours.
const REWRITES: [
	RegExp,
	(match: RegExpMatchArray) => { to: string; dependency?: string; builtin?: string },
][] = [
	[/^\.\.\/lib\/utils$/, () => ({ to: "@/lib/utils", builtin: "utils" })],
	[/^\.\.\/hooks\/([\w-]+)$/, (m) => ({ to: `@/hooks/${m[1]}`, dependency: m[1] })],
	[/^\.\.\/field\/field-context$/, () => ({ to: "./field-context", dependency: "field-context" })],
	[/^\.\/([\w.-]+)$/, (m) => ({ to: `./${m[1]}` })],
];

function rewrite(file: string, code: string, dependencies: Set<string>): string {
	return code.replace(/(from\s+|import\s+)"([^"]+)"/g, (whole, lead: string, spec: string) => {
		if (!spec.startsWith(".")) return whole;
		for (const [pattern, map] of REWRITES) {
			const match = spec.match(pattern);
			if (!match) continue;
			const { to, dependency, builtin } = map(match);
			if (dependency) dependencies.add(`${ORIGIN}/r/${dependency}.json`);
			if (builtin) dependencies.add(builtin);
			return `${lead}"${to}"`;
		}
		throw new Error(`${file}: no registry rewrite for import "${spec}"`);
	});
}

function componentFiles(dir: string): File[] {
	return readdirSync(join(SRC, dir))
		.filter((name) => /\.tsx?$/.test(name) && name !== "index.ts" && !/\.test\./.test(name))
		.toSorted()
		.map((name) => ({ from: `${dir}/${name}`, type: "registry:ui" as const }));
}

// ---------------------------------------------------------------------------------------------
// The items.

const COMPONENTS: { name: string; title: string; description: string; css?: string }[] = [
	{
		name: "button",
		title: "Button",
		description:
			"A pill button with spring press, ripple, stateful, magnetic and metallic variants. CSS-only motion.",
		css: "button.css",
	},
	{
		name: "select",
		title: "Select",
		description:
			"A native select that unfolds a styled list where the customizable select is supported.",
		css: "select.css",
	},
	{
		name: "input",
		title: "Input",
		description: "A recessed text field with optional icons, in five sizes.",
	},
	{ name: "textarea", title: "Textarea", description: "A recessed multi-line text field." },
	{
		name: "field",
		title: "Field",
		description: "A label, a hint and an error wired to the control inside it.",
	},
	{
		name: "checkbox",
		title: "Checkbox",
		description:
			"A native checkbox whose tick pops in and draws itself, an indeterminate dash and three sizes. CSS-only motion.",
		css: "checkbox.css",
	},
	{
		name: "card",
		title: "Card",
		description: "A raised surface with title, description and meta text styles.",
	},
	{
		name: "badge",
		title: "Badge",
		description: "A small tinted label in six tones.",
		css: "badge.css",
	},
];

/** A link to another item of this registry; the docs route fills in the origin. */
const dep = (name: string) => `${ORIGIN}/r/${name}.json`;
/** Theme variables for registry users: their own font stays. */
const withoutFont = (block: Record<string, string>) =>
	Object.fromEntries(Object.entries(block).filter(([name]) => name !== "font-sans"));
/** The files in a folder, sorted, or none. */
const listFiles = (dir: string) => (existsSync(dir) ? readdirSync(dir).toSorted() : []);

function buildItems(warnings: string[]): Item[] {
	const springs = springVars();

	const items: Item[] = [
		{
			name: "theme",
			type: "registry:theme",
			title: "Rabtx theme",
			description:
				"The Rabtx colors, radius, depth, shadows and status tones as shadcn theme variables.",
			cssVars: {
				theme: themeMappings(),
				light: withoutFont(themeBlock(":root, .rabtx")),
				dark: withoutFont(themeBlock(".dark, .rabtx.dark, .dark .rabtx:not(.light)")),
			},
		},
		{
			name: "utils",
			type: "registry:lib",
			title: "cn",
			description:
				"The class name helper the components import from @/lib/utils (clsx, then tailwind-merge). shadcn projects already have one; install this only if yours is missing.",
			dependencies: ["clsx", "tailwind-merge"],
			files: [{ from: "lib/utils.ts", type: "registry:lib" }],
		},
		{
			name: "springs",
			type: "registry:lib",
			title: "Springs",
			description:
				"The spring solver and the solved spring easings (--spring-*) every Rabtx animation uses.",
			files: [{ from: "motion/springs.ts", type: "registry:lib" }],
			cssVars: {
				theme: Object.fromEntries(
					Object.keys(springs)
						.filter((name) => !name.endsWith("-duration"))
						.map((name) => [`ease-${name}`, `var(--${name})`]),
				),
				light: springs,
			},
		},
		{
			name: "rabtx",
			type: "registry:style",
			title: "Rabtx base",
			description:
				"Defaults for the Rabtx-only tokens (derived from your theme), the radius and depth modes, and the shared surface styles.",
			registryDependencies: [dep("springs")],
			css: {
				...cssObject(
					readFileSync(join(PKG, "registry/defaults.css"), "utf8"),
					"defaults.css",
					warnings,
				),
				...radiusModes(warnings),
				...cssObject(readStyle("control.css"), "control.css", warnings),
			},
		},
		{
			name: "use-base-select",
			type: "registry:hook",
			title: "useBaseSelect",
			description:
				"Whether the browser draws a customizable select list (appearance: base-select).",
			files: [{ from: "hooks/use-base-select.ts", type: "registry:hook" }],
		},
		{
			name: "field-context",
			type: "registry:ui",
			title: "Field context",
			description: "Shares a Field's id, hint and error with the control inside it.",
			files: [{ from: "field/field-context.ts", type: "registry:ui" }],
		},
	];

	for (const component of COMPONENTS) {
		const files = componentFiles(component.name).filter(
			(f) => !f.from.endsWith("field-context.ts"),
		);
		items.push({
			name: component.name,
			type: "registry:ui",
			title: component.title,
			description: component.description,
			files,
			registryDependencies: [dep("rabtx")],
			css: component.css ? cssObject(readStyle(component.css), component.css, warnings) : undefined,
		});
	}
	return items;
}

// ---------------------------------------------------------------------------------------------
// Check that the components only use tokens the registry defines.

function checkTokens(items: Item[]) {
	const defined = new Set<string>([...SHADCN_TOKENS, ...Object.keys(springVars())]);
	for (const match of readFileSync(join(PKG, "registry/defaults.css"), "utf8").matchAll(
		/^\s*--([\w-]+):/gm,
	)) {
		defined.add(match[1]);
	}
	for (const item of items) {
		for (const file of item.files ?? []) {
			const code = readFileSync(join(SRC, file.from), "utf8");
			for (const m of code.matchAll(/(?:var\(|\(|\[)--([a-z][\w-]*)/g)) {
				if (!defined.has(m[1]))
					throw new Error(`${file.from}: --${m[1]} is not defined for registry users`);
			}
		}
		for (const m of JSON.stringify(item.css ?? {}).matchAll(/var\(--([a-z][\w-]*)/g)) {
			if (!defined.has(m[1]))
				throw new Error(`${item.name} css: --${m[1]} is not defined for registry users`);
		}
	}
}

// ---------------------------------------------------------------------------------------------

function stage(items: Item[]): string {
	const dir = mkdtempSync(join(tmpdir(), "rabtx-registry-"));
	const registryItems = items.map((item) => {
		const dependencies = new Set<string>();
		const files = (item.files ?? []).map((file) => {
			const folder =
				file.type === "registry:lib" ? "lib" : file.type === "registry:hook" ? "hooks" : "ui";
			const path = `registry/rabtx/${folder}/${basename(file.from)}`;
			mkdirSync(join(dir, `registry/rabtx/${folder}`), { recursive: true });
			const code = rewrite(file.from, readFileSync(join(SRC, file.from), "utf8"), dependencies);
			writeFileSync(join(dir, path), code);
			return { path, type: file.type };
		});
		const registryDependencies = [...(item.registryDependencies ?? []), ...dependencies];
		return {
			name: item.name,
			type: item.type,
			title: item.title,
			description: item.description,
			...(item.dependencies && { dependencies: item.dependencies }),
			...(registryDependencies.length && {
				registryDependencies: [...new Set(registryDependencies)],
			}),
			...(files.length && { files }),
			...(item.cssVars && { cssVars: item.cssVars }),
			...(item.css && { css: item.css }),
		};
	});
	writeFileSync(
		join(dir, "registry.json"),
		JSON.stringify(
			{
				$schema: "https://ui.shadcn.com/schema/registry.json",
				name: "rabtx",
				homepage: `${ORIGIN}/docs/ui`,
				items: registryItems,
			},
			null,
			2,
		),
	);
	return dir;
}

function build(out: string) {
	const warnings: string[] = [];
	const items = buildItems(warnings);
	checkTokens(items);
	const dir = stage(items);
	rmSync(out, { recursive: true, force: true });
	mkdirSync(out, { recursive: true });
	execFileSync(SHADCN, ["build", "registry.json", "--output", out], { cwd: dir, stdio: "pipe" });
	// The catalog `shadcn list` and `search` read, next to the items.
	cpSync(join(dir, "registry.json"), join(out, "registry.json"));
	rmSync(dir, { recursive: true, force: true });
	return warnings;
}

const check = process.argv.includes("--check");
if (check) {
	const tmp = mkdtempSync(join(tmpdir(), "rabtx-registry-check-"));
	build(tmp);
	const stale = [...new Set([...listFiles(tmp), ...listFiles(OUT)])].filter((name) => {
		const a = join(tmp, name);
		const b = join(OUT, name);
		return !existsSync(a) || !existsSync(b) || readFileSync(a, "utf8") !== readFileSync(b, "utf8");
	});
	rmSync(tmp, { recursive: true, force: true });
	if (stale.length) {
		console.error(
			`Registry out of date: ${stale.join(", ")}. Run \`bun run registry\` in packages/rabtx.`,
		);
		process.exit(1);
	}
	console.log("Registry is up to date.");
} else {
	const warnings = build(OUT);
	for (const warning of warnings) console.warn(`warning: ${warning}`);
	console.log(`Wrote ${readdirSync(OUT).length} files to ${OUT}`);
}
