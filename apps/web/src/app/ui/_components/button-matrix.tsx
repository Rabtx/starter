import { Button, type ButtonSize, type ButtonVariant } from "@rabtx/ui/button";
import { Icon } from "./icons";
import { Stage } from "./section";

const VARIANTS: { value: ButtonVariant; label: string }[] = [
	{ value: "primary", label: "Primary" },
	{ value: "secondary", label: "Secondary" },
	{ value: "ghost", label: "Ghost" },
	{ value: "accent", label: "Accent" },
	{ value: "danger", label: "Danger" },
];

const STATES = [
	{ key: "default", label: "Default" },
	{ key: "hover", label: "Hover" },
	{ key: "pressed", label: "Pressed" },
	{ key: "focus", label: "Focus" },
	{ key: "disabled", label: "Disabled" },
	{ key: "loading", label: "Loading" },
] as const;

const SIZES: { value: ButtonSize; label: string }[] = [
	{ value: "sm", label: "Small 24" },
	{ value: "md", label: "Medium 28" },
	{ value: "lg", label: "Large 36" },
	{ value: "xl", label: "X-Large 44" },
	{ value: "2xl", label: "2X-Large 48" },
];

/** Every style in every state. Hover, pressed and focus are forced with `data-rx-force` so they can be seen at rest. */
export function StatesMatrix() {
	return (
		<Stage className="overflow-x-auto">
			<table className="w-full min-w-[640px] border-separate border-spacing-y-3 text-left">
				<thead>
					<tr>
						<th className="w-24">
							<span className="sr-only">Style</span>
						</th>
						{STATES.map((state) => (
							<th
								key={state.key}
								className="pb-1 text-[12px] font-medium text-[var(--rx-text-tertiary)]"
							>
								{state.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{VARIANTS.map((variant) => (
						<tr key={variant.value}>
							<th
								scope="row"
								className="pr-3 text-[13px] font-medium text-[var(--rx-text-secondary)]"
							>
								{variant.label}
							</th>
							{STATES.map((state) => (
								<td key={state.key}>
									<Button
										variant={variant.value}
										disabled={state.key === "disabled"}
										loading={state.key === "loading"}
										data-rx-force={
											state.key === "default" || state.key === "disabled" || state.key === "loading"
												? undefined
												: state.key
										}
									>
										Button
									</Button>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</Stage>
	);
}

/** Every size, with text, a leading icon, a trailing icon, and icon only. */
export function SizesMatrix() {
	return (
		<Stage className="grid gap-5">
			{(["primary", "secondary"] as const).map((variant) => (
				<div key={variant} className="grid gap-3">
					<p className="text-[12px] font-medium text-[var(--rx-text-tertiary)] capitalize">
						{variant}
					</p>
					<div className="flex flex-wrap items-end gap-x-6 gap-y-4">
						{SIZES.map((size) => (
							<div key={size.value} className="grid justify-items-start gap-2">
								<span className="text-[12px] text-[var(--rx-text-tertiary)]">{size.label}</span>
								<div className="flex flex-wrap items-center gap-2">
									<Button variant={variant} size={size.value}>
										Button
									</Button>
									<Button variant={variant} size={size.value} leadingIcon={<Icon name="plus" />}>
										Button
									</Button>
									<Button
										variant={variant}
										size={size.value}
										trailingIcon={<Icon name="chevron" />}
									>
										Button
									</Button>
									<Button variant={variant} size={size.value} iconOnly aria-label="Add">
										<Icon name="plus" />
									</Button>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</Stage>
	);
}

const DEPTHS = ["flat", "floating"] as const;
const RADII = ["sharp", "default", "round"] as const;

/** Every depth and radius at once. Each cell sets its own modes, as an app would on any container. */
export function ModesMatrix() {
	return (
		<div className="grid gap-3 md:grid-cols-3">
			{DEPTHS.flatMap((depth) =>
				RADII.map((radius) => (
					<div
						key={`${depth}-${radius}`}
						data-depth={depth}
						data-radius={radius}
						className="grid gap-3 rounded-xl border border-[var(--rx-border-strong)] bg-[var(--rx-app)] p-4"
					>
						<p className="text-[12px] font-medium text-[var(--rx-text-tertiary)] capitalize">
							{depth} · {radius}
						</p>
						<div className="flex flex-wrap gap-2">
							{VARIANTS.map((variant) => (
								<Button key={variant.value} variant={variant.value} size="lg">
									{variant.label}
								</Button>
							))}
						</div>
					</div>
				)),
			)}
		</div>
	);
}
