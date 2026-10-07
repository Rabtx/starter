"use client";

import { useRef } from "react";

type Option<T extends string> = { value: T; label: string };

type SegmentedProps<T extends string> = {
	label: string;
	value: T;
	options: Option<T>[];
	onChange: (value: T) => void;
};

/** Playground-only radio group. Arrow keys move and select, Tab leaves the group. */
export function Segmented<T extends string>({
	label,
	value,
	options,
	onChange,
}: SegmentedProps<T>) {
	const refs = useRef<(HTMLButtonElement | null)[]>([]);

	function move(index: number, key: string) {
		const last = options.length - 1;
		const next = {
			ArrowRight: index + 1,
			ArrowDown: index + 1,
			ArrowLeft: index - 1,
			ArrowUp: index - 1,
			Home: 0,
			End: last,
		}[key];
		if (next === undefined) return;
		const target = (next + options.length) % options.length;
		onChange(options[target].value);
		refs.current[target]?.focus();
	}

	return (
		<div
			role="radiogroup"
			aria-label={label}
			className="inline-flex max-w-full flex-wrap gap-0.5 rounded-lg bg-[var(--rx-pressed)] p-0.5"
		>
			{options.map((option, index) => {
				const checked = option.value === value;
				return (
					<button
						key={option.value}
						ref={(node) => {
							refs.current[index] = node;
						}}
						type="button"
						role="radio"
						aria-checked={checked}
						tabIndex={checked ? 0 : -1}
						onClick={() => onChange(option.value)}
						onKeyDown={(event) => {
							if (
								["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(
									event.key,
								)
							) {
								event.preventDefault();
								move(index, event.key);
							}
						}}
						className={
							checked
								? "h-7 rounded-md bg-[var(--rx-surface)] px-2.5 text-[13px] font-medium text-[var(--rx-text)] shadow-[0_0_0_1px_var(--rx-border-strong)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)]"
								: "h-7 rounded-md px-2.5 text-[13px] font-medium text-[var(--rx-text-secondary)] outline-none hover:text-[var(--rx-text)] focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)]"
						}
					>
						{option.label}
					</button>
				);
			})}
		</div>
	);
}
