"use client";

import { type InputHTMLAttributes, type ReactNode, type Ref, useRef } from "react";
import { type InputSize, inputClass, inputParts } from "./input.styles";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
	/** Control height: 28, 32, 36, 44 and 48. */
	size?: InputSize;
	/** A fully rounded field, for search bars. Independent of the radius mode. */
	pill?: boolean;
	leadingIcon?: ReactNode;
	trailingIcon?: ReactNode;
	ref?: Ref<HTMLInputElement>;
};

/**
 * A native `<input>` inside a wrapper that draws the field. Mark an invalid field with
 * `aria-invalid`, which also turns the edge red. Give it a visible `<label>` or an `aria-label`.
 */
export function Input({
	size,
	pill,
	leadingIcon,
	trailingIcon,
	className,
	ref,
	...rest
}: InputProps) {
	const inner = useRef<HTMLInputElement>(null);
	const { field, icon } = inputParts;

	return (
		// The wrapper only forwards pointer focus; keyboard users already land on the input.
		// oxlint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			className={`${inputClass({ size, pill })} ${className ?? ""}`}
			onPointerDown={(event) => {
				if (event.target instanceof Element && event.target.closest("input, button, a")) return;
				event.preventDefault();
				inner.current?.focus();
			}}
		>
			{leadingIcon && <span className={icon}>{leadingIcon}</span>}
			<input
				{...rest}
				ref={(node) => {
					inner.current = node;
					if (typeof ref === "function") ref(node);
					else if (ref) ref.current = node;
				}}
				className={field}
			/>
			{trailingIcon && <span className={icon}>{trailingIcon}</span>}
		</div>
	);
}
