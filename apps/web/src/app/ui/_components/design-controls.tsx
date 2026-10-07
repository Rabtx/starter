"use client";

import { Segmented } from "./segmented";

export type Design = {
	theme: "light" | "dark";
	depth: "flat" | "floating";
	radius: "sharp" | "default" | "round";
	motion: "on" | "off";
};

export const DEFAULT_DESIGN: Design = {
	theme: "light",
	depth: "floating",
	radius: "default",
	motion: "on",
};

type DesignControlsProps = {
	design: Design;
	onChange: (design: Design) => void;
};

export function DesignControls({ design, onChange }: DesignControlsProps) {
	return (
		<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
			<Segmented
				label="Theme"
				value={design.theme}
				options={[
					{ value: "light", label: "Light" },
					{ value: "dark", label: "Dark" },
				]}
				onChange={(theme) => onChange({ ...design, theme })}
			/>
			<Segmented
				label="Depth"
				value={design.depth}
				options={[
					{ value: "flat", label: "Flat" },
					{ value: "floating", label: "Floating" },
				]}
				onChange={(depth) => onChange({ ...design, depth })}
			/>
			<Segmented
				label="Radius"
				value={design.radius}
				options={[
					{ value: "sharp", label: "Sharp" },
					{ value: "default", label: "Default" },
					{ value: "round", label: "Round" },
				]}
				onChange={(radius) => onChange({ ...design, radius })}
			/>
			<Segmented
				label="Motion"
				value={design.motion}
				options={[
					{ value: "on", label: "On" },
					{ value: "off", label: "Off" },
				]}
				onChange={(motion) => onChange({ ...design, motion })}
			/>
		</div>
	);
}
