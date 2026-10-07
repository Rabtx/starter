export type PlaygroundComponent = {
	slug: string;
	name: string;
	description: string;
	/** Figma node for the component's section. */
	figmaNode: string;
};

/** Components shown in the playground, in build order. Add one entry per finished component. */
export const COMPONENTS: PlaygroundComponent[] = [
	{
		slug: "button",
		name: "Button",
		description: "Five styles, five sizes, Rounded or Pill, Flat or Floating.",
		figmaNode: "5:6",
	},
];

export const FIGMA_FILE = "https://www.figma.com/design/en7xSFtcVYHkX7Iwo4hONQ/rabtx-Design-System";
