"use client";

import type { ButtonHTMLAttributes, MouseEvent, ReactNode, Ref } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "accent" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "xl" | "2xl";

type BaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
	/** Visual role. Primary is black, Accent is blue, Secondary has a hairline, Ghost has none. */
	variant?: ButtonVariant;
	/** Control height: 24, 28, 36, 44 and 48. */
	size?: ButtonSize;
	/** Swaps the content for a spinner without changing the button's width, and blocks clicks. */
	loading?: boolean;
	/** Removes the press scale, for buttons where the motion would distract. */
	static?: boolean;
	ref?: Ref<HTMLButtonElement>;
};

type LabelProps = BaseProps & {
	iconOnly?: false;
	leadingIcon?: ReactNode;
	trailingIcon?: ReactNode;
	children: ReactNode;
};

type IconOnlyProps = BaseProps & {
	/** A square button. Needs an accessible name because it has no visible text. */
	iconOnly: true;
	"aria-label": string;
	leadingIcon?: never;
	trailingIcon?: never;
	/** The icon. */
	children: ReactNode;
};

export type ButtonProps = LabelProps | IconOnlyProps;

/**
 * A native `<button>`. Styling is CSS only (see `@rabtx/ui/styles.css`) and reads the radius and
 * depth modes from an ancestor, so the component carries no per-style branching.
 *
 * Icons are passed in, so the package depends on no icon set. Size them with the icon library's own
 * size prop or leave them to fill the 16px slot (20px at 2X-Large).
 */
export function Button(props: ButtonProps) {
	const {
		variant = "primary",
		size = "md",
		loading = false,
		static: isStatic = false,
		iconOnly = false,
		leadingIcon,
		trailingIcon,
		children,
		className,
		type = "button",
		onClick,
		ref,
		...rest
	} = props;

	function handleClick(event: MouseEvent<HTMLButtonElement>) {
		if (loading) {
			event.preventDefault();
			return;
		}
		onClick?.(event);
	}

	return (
		<button
			{...rest}
			ref={ref}
			type={type}
			className={className ? `rx-btn ${className}` : "rx-btn"}
			data-variant={variant}
			data-size={size}
			data-icon-only={iconOnly ? "" : undefined}
			data-loading={loading ? "" : undefined}
			data-static={isStatic ? "" : undefined}
			aria-busy={loading || undefined}
			onClick={handleClick}
		>
			<span className="rx-btn__content">
				{iconOnly ? (
					<span className="rx-btn__icon">{children}</span>
				) : (
					<>
						{leadingIcon ? <span className="rx-btn__icon">{leadingIcon}</span> : null}
						<span className="rx-btn__label">{children}</span>
						{trailingIcon ? <span className="rx-btn__icon">{trailingIcon}</span> : null}
					</>
				)}
			</span>
			<span className="rx-btn__spinner" aria-hidden="true" />
		</button>
	);
}
