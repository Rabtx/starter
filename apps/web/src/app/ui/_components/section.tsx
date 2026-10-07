import type { ReactNode } from "react";

type SectionProps = {
	id: string;
	title: string;
	description?: ReactNode;
	children: ReactNode;
};

export function Section({ id, title, description, children }: SectionProps) {
	return (
		<section aria-labelledby={`${id}-title`} className="mt-12 first:mt-0">
			<h2 id={`${id}-title`} className="text-[15px] font-medium tracking-[-0.15px]">
				{title}
			</h2>
			{description ? (
				<p className="mt-1 max-w-2xl text-[13px] leading-5 text-[var(--rx-text-secondary)]">
					{description}
				</p>
			) : null}
			<div className="mt-4">{children}</div>
		</section>
	);
}

/** A bordered stage that components are shown on. */
export function Stage({ children, className = "" }: { children: ReactNode; className?: string }) {
	return (
		<div
			className={`rounded-xl border border-[var(--rx-border-strong)] bg-[var(--rx-app)] p-5 ${className}`}
		>
			{children}
		</div>
	);
}
