import {
	Add01Icon,
	ArrowDown01Icon,
	ArrowRight01Icon,
	Delete02Icon,
	Download01Icon,
	Mail01Icon,
	Search01Icon,
	Settings01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export type IconName =
	| "plus"
	| "chevron"
	| "arrow"
	| "delete"
	| "download"
	| "mail"
	| "search"
	| "settings";

const ICONS = {
	plus: Add01Icon,
	chevron: ArrowDown01Icon,
	arrow: ArrowRight01Icon,
	delete: Delete02Icon,
	download: Download01Icon,
	mail: Mail01Icon,
	search: Search01Icon,
	settings: Settings01Icon,
} as const;

/** A HugeIcons icon. The Button's icon slot sets the final size, so this only needs a default. */
export function Icon({ name }: { name: IconName }) {
	return <HugeiconsIcon icon={ICONS[name]} size={16} strokeWidth={1.75} aria-hidden="true" />;
}
