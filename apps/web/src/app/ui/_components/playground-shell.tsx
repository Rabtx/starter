"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { COMPONENTS } from "./components";
import { DEFAULT_DESIGN, type Design, DesignControls } from "./design-controls";

const STORAGE_KEY = "rabtx-playground-design";

function readDesign(): Design {
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (raw) return { ...DEFAULT_DESIGN, ...(JSON.parse(raw) as Partial<Design>) };
	} catch {
		// Private mode or bad JSON: fall back to the defaults.
	}
	return DEFAULT_DESIGN;
}

/**
 * The playground frame. The Design controls set `data-theme`, `data-depth`, `data-radius` and
 * `data-motion` on one wrapper, which is exactly how an app switches the modes, so what you see
 * here is what a consumer gets.
 */
export function PlaygroundShell({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const [design, setDesign] = useState<Design>(DEFAULT_DESIGN);

	useEffect(() => {
		setDesign(readDesign());
	}, []);

	function update(next: Design) {
		setDesign(next);
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
		} catch {
			// Storage is a convenience only.
		}
	}

	return (
		<div
			data-theme={design.theme}
			data-depth={design.depth}
			data-radius={design.radius}
			data-motion={design.motion}
			className="flex min-h-dvh flex-col bg-[var(--rx-app)] font-[family-name:var(--rx-font-sans)] text-[var(--rx-text)]"
		>
			<header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-[var(--rx-border-strong)] bg-[var(--rx-app)] px-5 py-3">
				<Link
					href="/ui"
					className="flex items-baseline gap-2 text-[14px] font-medium tracking-[-0.15px]"
				>
					Rabtx UI
					<span className="text-[13px] font-normal text-[var(--rx-text-tertiary)]">Playground</span>
				</Link>
				<DesignControls design={design} onChange={update} />
			</header>
			<div className="flex flex-1 flex-col md:flex-row">
				<nav
					aria-label="Components"
					className="flex gap-1 overflow-x-auto border-b border-[var(--rx-border-strong)] p-3 md:w-56 md:flex-none md:flex-col md:border-r md:border-b-0"
				>
					<p className="hidden px-2 pt-1 pb-2 text-[12px] font-medium tracking-[0.06em] text-[var(--rx-text-tertiary)] uppercase md:block">
						Components
					</p>
					{COMPONENTS.map((component) => {
						const active = pathname === `/ui/${component.slug}`;
						return (
							<Link
								key={component.slug}
								href={`/ui/${component.slug}`}
								aria-current={active ? "page" : undefined}
								className={
									active
										? "rounded-lg bg-[var(--rx-selected)] px-2.5 py-1.5 text-[13px] font-medium text-[var(--rx-text)]"
										: "rounded-lg px-2.5 py-1.5 text-[13px] text-[var(--rx-text-secondary)] hover:bg-[var(--rx-pressed)] hover:text-[var(--rx-text)]"
								}
							>
								{component.name}
							</Link>
						);
					})}
				</nav>
				<main className="min-w-0 flex-1 px-5 py-8 md:px-10">
					<div className="mx-auto max-w-5xl">{children}</div>
				</main>
			</div>
		</div>
	);
}
