import { Button } from "@rabtx/ui/button";
import { Icon } from "./icons";
import { Stage } from "./section";

/** Buttons where they actually live: a toolbar, a form footer, a destructive confirm, a hero, and tight widths. */
export function ContextExamples() {
	return (
		<div className="grid gap-4">
			<Stage className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex items-center gap-1">
					<Button variant="ghost" size="sm" leadingIcon={<Icon name="search" />}>
						Search
					</Button>
					<Button variant="ghost" size="sm" leadingIcon={<Icon name="settings" />}>
						Settings
					</Button>
				</div>
				<div className="flex items-center gap-1">
					<Button variant="secondary" size="sm" leadingIcon={<Icon name="download" />}>
						Export
					</Button>
					<Button size="sm" leadingIcon={<Icon name="plus" />}>
						New company
					</Button>
				</div>
			</Stage>

			<div className="grid gap-4 md:grid-cols-2">
				<Stage className="grid gap-4">
					<div>
						<p className="text-[14px] font-medium">Rename workspace</p>
						<p className="mt-1 text-[13px] text-[var(--rx-text-secondary)]">
							Pick a name your team will recognise.
						</p>
					</div>
					<div className="flex justify-end gap-2">
						<Button variant="secondary">Cancel</Button>
						<Button>Save</Button>
					</div>
				</Stage>
				<Stage className="grid gap-4">
					<div>
						<p className="text-[14px] font-medium">Delete 3 companies?</p>
						<p className="mt-1 text-[13px] text-[var(--rx-text-secondary)]">
							This cannot be undone.
						</p>
					</div>
					<div className="flex justify-end gap-2">
						<Button variant="ghost">Cancel</Button>
						<Button variant="danger" leadingIcon={<Icon name="delete" />}>
							Delete
						</Button>
					</div>
				</Stage>
			</div>

			<Stage className="grid justify-items-center gap-4 py-10 text-center">
				<p className="text-[18px] font-medium tracking-[-0.15px]">Ship the whole product</p>
				<div className="flex flex-wrap justify-center gap-2">
					<Button size="2xl" variant="accent" trailingIcon={<Icon name="arrow" />}>
						Get started
					</Button>
					<Button size="2xl" variant="secondary">
						Talk to us
					</Button>
				</div>
			</Stage>

			<div className="grid gap-4 md:grid-cols-2">
				<Stage className="grid gap-3">
					<p className="text-[12px] font-medium text-[var(--rx-text-tertiary)]">
						Long label in a 160px column
					</p>
					<div className="w-40">
						<Button variant="secondary" className="w-full" leadingIcon={<Icon name="mail" />}>
							Send the quarterly report to everyone
						</Button>
					</div>
				</Stage>
				<Stage className="grid gap-3">
					<p className="text-[12px] font-medium text-[var(--rx-text-tertiary)]">Full width</p>
					<Button size="xl" className="w-full">
						Continue
					</Button>
				</Stage>
			</div>
		</div>
	);
}
