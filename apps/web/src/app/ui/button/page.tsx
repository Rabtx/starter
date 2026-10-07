import type { Metadata } from "next";
import { ButtonPlayground } from "../_components/button-playground";
import { ModesMatrix, SizesMatrix, StatesMatrix } from "../_components/button-matrix";
import { ContextExamples } from "../_components/button-context";
import { COMPONENTS, FIGMA_FILE } from "../_components/components";
import { Section } from "../_components/section";

export const metadata: Metadata = { title: "Button" };

const SPEC = [
	{ size: "Small", height: 24, padding: 8, gap: 4, radius: "6", type: "12 / 16" },
	{ size: "Medium", height: 28, padding: 10, gap: 6, radius: "8", type: "13 / 20" },
	{ size: "Large", height: 36, padding: 12, gap: 6, radius: "8", type: "14 / 20" },
	{ size: "X-Large", height: 44, padding: 16, gap: 8, radius: "8", type: "14 / 20" },
	{ size: "2X-Large", height: 48, padding: 20, gap: 8, radius: "8", type: "14 / 20, 20px icons" },
];

export default function ButtonPage() {
	const component = COMPONENTS.find((item) => item.slug === "button");
	return (
		<>
			<h1 className="text-[22px] font-medium tracking-[-0.3px]">Button</h1>
			<p className="mt-2 max-w-2xl text-[14px] leading-6 text-[var(--rx-text-secondary)]">
				A native button with five styles and five sizes. Radius, depth and motion come from the mode
				controls above, never from props.{" "}
				<a
					className="underline underline-offset-2 hover:text-[var(--rx-text)]"
					href={`${FIGMA_FILE}?node-id=${component?.figmaNode.replace(":", "-")}`}
					target="_blank"
					rel="noreferrer"
				>
					Figma
				</a>
			</p>

			<div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-0">
				<Section
					id="playground"
					title="Playground"
					description="Change anything and copy the code."
				>
					<ButtonPlayground />
				</Section>
				<Section
					id="states"
					title="Styles and states"
					description="Hover, pressed and focus are forced so they can be compared at rest. Disabled and loading are real."
				>
					<StatesMatrix />
				</Section>
				<Section
					id="sizes"
					title="Sizes"
					description="Heights 24, 28, 36, 44 and 48. Icon-only is a square of the same height."
				>
					<SizesMatrix />
				</Section>
				<Section
					id="modes"
					title="Depth and radius"
					description="Every combination at once. Flat is one simple border. Floating is the depth. Round makes buttons pills."
				>
					<ModesMatrix />
				</Section>
				<Section id="context" title="In context">
					<ContextExamples />
				</Section>
				<Section
					id="spec"
					title="Spec"
					description="Medium is the default. Total width is the text plus twice the padding, the 1px edge included."
				>
					<div className="overflow-x-auto rounded-xl border border-[var(--rx-border-strong)]">
						<table className="w-full min-w-[520px] text-left text-[13px]">
							<thead className="text-[12px] text-[var(--rx-text-tertiary)]">
								<tr>
									{["Size", "Height", "Padding", "Gap", "Radius", "Type"].map((head) => (
										<th key={head} className="px-4 py-2.5 font-medium">
											{head}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{SPEC.map((row) => (
									<tr key={row.size} className="border-t border-[var(--rx-border)]">
										<th scope="row" className="px-4 py-2.5 font-medium">
											{row.size}
										</th>
										<td className="px-4 py-2.5 tabular-nums">{row.height}</td>
										<td className="px-4 py-2.5 tabular-nums">{row.padding}</td>
										<td className="px-4 py-2.5 tabular-nums">{row.gap}</td>
										<td className="px-4 py-2.5 tabular-nums">{row.radius}</td>
										<td className="px-4 py-2.5">{row.type}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Section>
				<Section id="a11y" title="Accessibility">
					<ul className="grid max-w-2xl list-disc gap-1.5 pl-5 text-[13px] leading-5 text-[var(--rx-text-secondary)]">
						<li>
							A real <code className="font-mono text-[12px]">button</code>, so Enter and Space work
							and it submits nothing unless you ask (
							<code className="font-mono text-[12px]">type</code> defaults to{" "}
							<code className="font-mono text-[12px]">button</code>).
						</li>
						<li>Keyboard focus shows a 2px ring offset by 2px. Mouse clicks do not.</li>
						<li>
							Icon-only buttons require an <code className="font-mono text-[12px]">aria-label</code>
							; TypeScript enforces it.
						</li>
						<li>
							Loading sets <code className="font-mono text-[12px]">aria-busy</code>, blocks clicks,
							and keeps the button focusable and the same width.
						</li>
						<li>
							With Motion off, or when the OS asks for reduced motion, every state is still visible
							and nothing travels.
						</li>
						<li>
							Hover only applies where a real hover exists, so touch screens never show a stuck
							hover.
						</li>
					</ul>
				</Section>
			</div>
		</>
	);
}
