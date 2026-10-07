import Link from "next/link";
import { COMPONENTS } from "./_components/components";

export default function UiIndexPage() {
	return (
		<>
			<h1 className="text-[22px] font-medium tracking-[-0.3px]">Rabtx UI</h1>
			<p className="mt-2 max-w-xl text-[14px] leading-6 text-[var(--rx-text-secondary)]">
				Every finished component, in every mode. Use the controls above to switch theme, depth,
				radius and motion; they work exactly the way an app would switch them.
			</p>
			<ul className="mt-8 grid gap-3 sm:grid-cols-2">
				{COMPONENTS.map((component) => (
					<li key={component.slug}>
						<Link
							href={`/ui/${component.slug}`}
							className="block rounded-xl border border-[var(--rx-border-strong)] p-4 transition-colors hover:bg-[var(--rx-pressed)]"
						>
							<span className="text-[14px] font-medium">{component.name}</span>
							<span className="mt-1 block text-[13px] text-[var(--rx-text-secondary)]">
								{component.description}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}
