"use client";

import { Button, type ButtonSize, type ButtonVariant } from "@rabtx/ui/button";
import { useId, useState } from "react";
import { CodeBlock } from "./code-block";
import { Icon, type IconName } from "./icons";
import { Segmented } from "./segmented";

const VARIANTS: { value: ButtonVariant; label: string }[] = [
	{ value: "primary", label: "Primary" },
	{ value: "secondary", label: "Secondary" },
	{ value: "ghost", label: "Ghost" },
	{ value: "accent", label: "Accent" },
	{ value: "danger", label: "Danger" },
];

const SIZES: { value: ButtonSize; label: string }[] = [
	{ value: "sm", label: "24" },
	{ value: "md", label: "28" },
	{ value: "lg", label: "36" },
	{ value: "xl", label: "44" },
	{ value: "2xl", label: "48" },
];

const ICON_OPTIONS: { value: IconName | "none"; label: string }[] = [
	{ value: "none", label: "None" },
	{ value: "plus", label: "Plus" },
	{ value: "search", label: "Search" },
	{ value: "download", label: "Download" },
	{ value: "chevron", label: "Chevron" },
];

type Toggle = "iconOnly" | "loading" | "disabled" | "isStatic";

function buildCode(state: {
	variant: ButtonVariant;
	size: ButtonSize;
	label: string;
	leading: IconName | "none";
	trailing: IconName | "none";
	iconOnly: boolean;
	loading: boolean;
	disabled: boolean;
	isStatic: boolean;
}): string {
	const props: string[] = [];
	if (state.variant !== "primary") props.push(`variant="${state.variant}"`);
	if (state.size !== "md") props.push(`size="${state.size}"`);
	if (state.iconOnly) {
		props.push("iconOnly", `aria-label="${state.label || "Action"}"`);
	} else {
		if (state.leading !== "none") props.push(`leadingIcon={<Icon name="${state.leading}" />}`);
		if (state.trailing !== "none") props.push(`trailingIcon={<Icon name="${state.trailing}" />}`);
	}
	if (state.loading) props.push("loading");
	if (state.disabled) props.push("disabled");
	if (state.isStatic) props.push("static");

	const body = state.iconOnly
		? `<Icon name="${state.leading === "none" ? "plus" : state.leading}" />`
		: state.label;
	const single = `<Button${props.length ? ` ${props.join(" ")}` : ""}>${body}</Button>`;
	if (single.length <= 72) return single;
	return `<Button\n${props.map((prop) => `\t${prop}`).join("\n")}\n>\n\t${body}\n</Button>`;
}

export function ButtonPlayground() {
	const labelId = useId();
	const [variant, setVariant] = useState<ButtonVariant>("primary");
	const [size, setSize] = useState<ButtonSize>("md");
	const [label, setLabel] = useState("Save changes");
	const [leading, setLeading] = useState<IconName | "none">("none");
	const [trailing, setTrailing] = useState<IconName | "none">("none");
	const [toggles, setToggles] = useState<Record<Toggle, boolean>>({
		iconOnly: false,
		loading: false,
		disabled: false,
		isStatic: false,
	});

	function toggle(key: Toggle) {
		setToggles((current) => ({ ...current, [key]: !current[key] }));
	}

	const iconName: IconName = leading === "none" ? "plus" : leading;
	const code = buildCode({ variant, size, label, leading, trailing, ...toggles });

	return (
		<div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
			<div className="grid grid-cols-[minmax(0,1fr)] min-w-0 content-start gap-4">
				<div className="flex min-h-48 items-center justify-center rounded-xl border border-[var(--rx-border-strong)] bg-[var(--rx-app)] p-8">
					{toggles.iconOnly ? (
						<Button
							iconOnly
							aria-label={label || "Action"}
							variant={variant}
							size={size}
							loading={toggles.loading}
							disabled={toggles.disabled}
							static={toggles.isStatic}
						>
							<Icon name={iconName} />
						</Button>
					) : (
						<Button
							variant={variant}
							size={size}
							leadingIcon={leading === "none" ? undefined : <Icon name={leading} />}
							trailingIcon={trailing === "none" ? undefined : <Icon name={trailing} />}
							loading={toggles.loading}
							disabled={toggles.disabled}
							static={toggles.isStatic}
						>
							{label || "Button"}
						</Button>
					)}
				</div>
				<CodeBlock code={code} />
			</div>

			<div className="grid grid-cols-[minmax(0,1fr)] min-w-0 content-start gap-4 rounded-xl border border-[var(--rx-border-strong)] p-4">
				<Field label="Style">
					<Segmented label="Style" value={variant} options={VARIANTS} onChange={setVariant} />
				</Field>
				<Field label="Size (px)">
					<Segmented label="Size" value={size} options={SIZES} onChange={setSize} />
				</Field>
				<div className="grid gap-1.5">
					<label
						htmlFor={labelId}
						className="text-[12px] font-medium text-[var(--rx-text-secondary)]"
					>
						{toggles.iconOnly ? "Accessible name" : "Label"}
					</label>
					<input
						id={labelId}
						value={label}
						onChange={(event) => setLabel(event.target.value)}
						className="h-8 w-full min-w-0 rounded-lg border border-[var(--rx-border-strong)] bg-[var(--rx-surface)] px-2.5 text-[13px] text-[var(--rx-text)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)]"
					/>
				</div>
				<Field label={toggles.iconOnly ? "Icon" : "Leading icon"}>
					<Select
						value={leading}
						options={ICON_OPTIONS}
						onChange={setLeading}
						label="Leading icon"
					/>
				</Field>
				{toggles.iconOnly ? null : (
					<Field label="Trailing icon">
						<Select
							value={trailing}
							options={ICON_OPTIONS}
							onChange={setTrailing}
							label="Trailing icon"
						/>
					</Field>
				)}
				<div className="grid gap-2 pt-1">
					<Check label="Icon only" checked={toggles.iconOnly} onChange={() => toggle("iconOnly")} />
					<Check label="Loading" checked={toggles.loading} onChange={() => toggle("loading")} />
					<Check label="Disabled" checked={toggles.disabled} onChange={() => toggle("disabled")} />
					<Check
						label="Static (no press scale)"
						checked={toggles.isStatic}
						onChange={() => toggle("isStatic")}
					/>
				</div>
			</div>
		</div>
	);
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<div className="grid gap-1.5">
			<span className="text-[12px] font-medium text-[var(--rx-text-secondary)]">{label}</span>
			{children}
		</div>
	);
}

function Select<T extends string>({
	value,
	options,
	onChange,
	label,
}: {
	value: T;
	options: { value: T; label: string }[];
	onChange: (value: T) => void;
	label: string;
}) {
	return (
		<select
			aria-label={label}
			value={value}
			onChange={(event) => onChange(event.target.value as T)}
			className="h-8 w-full min-w-0 rounded-lg border border-[var(--rx-border-strong)] bg-[var(--rx-surface)] px-2 text-[13px] text-[var(--rx-text)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)]"
		>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
}

function Check({
	label,
	checked,
	onChange,
}: {
	label: string;
	checked: boolean;
	onChange: () => void;
}) {
	return (
		<label className="flex cursor-pointer items-center gap-2 text-[13px] text-[var(--rx-text)]">
			<input
				type="checkbox"
				checked={checked}
				onChange={onChange}
				className="size-4 accent-[var(--rx-accent)]"
			/>
			{label}
		</label>
	);
}
