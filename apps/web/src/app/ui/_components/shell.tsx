"use client";

import { Field } from "@rabtx/ui/field";
import { Slider } from "@rabtx/ui/slider";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type CSSProperties, type ReactNode, useState } from "react";
import { NAV } from "./nav";
import { Stage, hasStage } from "./stage";

const MODES = {
	theme: ["light", "dark"],
	depth: ["flat", "floating"],
	radius: ["sharp", "default", "round"],
	motion: ["on", "off"],
};
type Modes = Record<keyof typeof MODES, string>;

type View = "docs" | "ui";
type ThemeName = "light" | "dark";
type RadiusName = "sharp" | "default" | "round";
type SizeName = "sm" | "md" | "lg";

const COLORS = [
	{ id: "ink", label: "Ink", light: "", dark: "", lightFg: "", darkFg: "" },
	{
		id: "blue",
		label: "Blue",
		light: "#2563eb",
		lightFg: "#ffffff",
		dark: "#60a5fa",
		darkFg: "#0f172a",
	},
	{
		id: "violet",
		label: "Violet",
		light: "#6d28d9",
		lightFg: "#ffffff",
		dark: "#c4b5fd",
		darkFg: "#1e1b4b",
	},
	{
		id: "green",
		label: "Green",
		light: "#15803d",
		lightFg: "#ffffff",
		dark: "#4ade80",
		darkFg: "#052e16",
	},
	{
		id: "orange",
		label: "Orange",
		light: "#c2410c",
		lightFg: "#ffffff",
		dark: "#fdba74",
		darkFg: "#431407",
	},
	{
		id: "rose",
		label: "Rose",
		light: "#be123c",
		lightFg: "#ffffff",
		dark: "#fda4af",
		darkFg: "#4c0519",
	},
] as const;

type ColorId = (typeof COLORS)[number]["id"];

function withView(href: string, view: View) {
	return view === "ui" ? `${href}?view=ui` : href;
}

function SideNav({
	pathname,
	view,
	className,
}: {
	pathname: string;
	view: View;
	className: string;
}) {
	return (
		<nav aria-label={view === "ui" ? "Components" : "Docs"} className={className}>
			{NAV.map(({ title, links }) => (
				<div key={title} className="mb-4">
					<p className="mb-1 text-xs font-medium text-(--subtle-foreground)">{title}</p>
					{links.map(({ href, label }) => (
						<Link
							key={href}
							href={withView(href, view)}
							aria-current={pathname === href ? "page" : undefined}
							className="block rounded-[8px] px-2 py-1 text-[13px] text-muted-foreground hover:text-foreground aria-[current=page]:bg-accent aria-[current=page]:text-foreground"
						>
							{label}
						</Link>
					))}
				</div>
			))}
		</nav>
	);
}

function Pills<T extends string>({
	legend,
	name,
	value,
	options,
	onChange,
}: {
	legend: string;
	name: string;
	value: T;
	options: readonly { id: T; label: string }[];
	onChange: (value: T) => void;
}) {
	return (
		<fieldset className="grid gap-2">
			<legend className="text-[13px]">{legend}</legend>
			<div className="flex gap-0.5 rounded-[10px] bg-muted p-0.5">
				{options.map((option) => (
					<label
						key={option.id}
						className="flex-1 cursor-pointer rounded-[8px] px-2 py-1 text-center text-[13px] text-muted-foreground has-checked:bg-card has-checked:text-foreground has-checked:shadow-[0_0_0_1px_var(--input)] has-focus-visible:outline-2 has-focus-visible:outline-ring"
					>
						<input
							type="radio"
							name={name}
							value={option.id}
							checked={value === option.id}
							onChange={() => onChange(option.id)}
							className="sr-only"
						/>
						{option.label}
					</label>
				))}
			</div>
		</fieldset>
	);
}

function Customize({
	theme,
	radius,
	size,
	primary,
	motionMs,
	onTheme,
	onRadius,
	onSize,
	onPrimary,
	onMotion,
}: {
	theme: ThemeName;
	radius: RadiusName;
	size: SizeName;
	primary: ColorId;
	motionMs: number;
	onTheme: (value: ThemeName) => void;
	onRadius: (value: RadiusName) => void;
	onSize: (value: SizeName) => void;
	onPrimary: (value: ColorId) => void;
	onMotion: (value: number) => void;
}) {
	return (
		<aside className="border-t border-input px-5 py-6 xl:sticky xl:top-14 xl:h-[calc(100dvh-3.5rem)] xl:w-72 xl:shrink-0 xl:overflow-y-auto xl:border-t-0 xl:border-l">
			<p className="text-xs font-medium text-(--subtle-foreground)">Customize</p>
			<div className="mt-4 grid gap-5">
				<Pills
					legend="Theme"
					name="ui-theme"
					value={theme}
					onChange={onTheme}
					options={[
						{ id: "light", label: "Light" },
						{ id: "dark", label: "Dark" },
					]}
				/>
				<Pills
					legend="Radius"
					name="ui-radius"
					value={radius}
					onChange={onRadius}
					options={[
						{ id: "sharp", label: "Sharp" },
						{ id: "default", label: "Default" },
						{ id: "round", label: "Round" },
					]}
				/>
				<Pills
					legend="Size"
					name="ui-size"
					value={size}
					onChange={onSize}
					options={[
						{ id: "sm", label: "Small" },
						{ id: "md", label: "Medium" },
						{ id: "lg", label: "Large" },
					]}
				/>
				<fieldset className="grid gap-2">
					<legend className="text-[13px]">Primary</legend>
					<div className="flex gap-2">
						{COLORS.map((color) => {
							const fill = color.light
								? theme === "dark"
									? color.dark
									: color.light
								: "var(--foreground)";
							return (
								<label
									key={color.id}
									title={color.label}
									className="cursor-pointer rounded-full has-checked:outline-2 has-checked:outline-offset-2 has-checked:outline-ring"
								>
									<input
										type="radio"
										name="ui-primary"
										value={color.id}
										checked={primary === color.id}
										onChange={() => onPrimary(color.id)}
										className="sr-only"
									/>
									<span className="sr-only">{color.label}</span>
									<span
										aria-hidden
										className="block size-6 rounded-full shadow-[0_0_0_1px_var(--input)]"
										style={{ background: fill }}
									/>
								</label>
							);
						})}
					</div>
				</fieldset>
				<Field label="Animation">
					<Slider
						aria-label="Animation"
						min={0}
						max={900}
						step={10}
						value={[motionMs]}
						onValueChange={([next]) => {
							if (next !== undefined) onMotion(next);
						}}
						showValue="always"
						formatValue={(value) => `${value} ms`}
					/>
				</Field>
				<p className="text-xs text-muted-foreground">
					Depth stays floating. One duration, in milliseconds, drives every spring.
				</p>
			</div>
		</aside>
	);
}

/**
 * Docs keeps the written pages and the four mode toggles. UI is a separate canvas: one live
 * component, always floating, with radius, primary, size and a single animation-time slider.
 * The settings are attributes and tokens on this wrapper, so every component inside follows them.
 */
export function Shell({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();
	const search = useSearchParams();
	const view: View = search.get("view") === "ui" ? "ui" : "docs";
	const [modes, setModes] = useState<Modes>({
		theme: "light",
		depth: "floating",
		radius: "default",
		motion: "on",
	});
	const [theme, setTheme] = useState<ThemeName>("light");
	const [radius, setRadius] = useState<RadiusName>("default");
	const [size, setSize] = useState<SizeName>("md");
	const [primary, setPrimary] = useState<ColorId>("ink");
	const [motionMs, setMotionMs] = useState(280);

	function setView(next: View) {
		const params = new URLSearchParams(search.toString());
		if (next === "ui") params.set("view", "ui");
		else params.delete("view");
		const query = params.toString();
		router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
	}

	const ui = view === "ui";
	const color = COLORS.find((item) => item.id === primary);
	const style: Record<string, string | number> = { "--motion-ms": motionMs };
	if (color?.light) {
		const hex = theme === "dark" ? color.dark : color.light;
		const fg = theme === "dark" ? color.darkFg : color.lightFg;
		style["--primary"] = hex;
		style["--primary-foreground"] = fg;
		style["--ring"] = hex;
		style["--sidebar-primary"] = hex;
		style["--sidebar-primary-foreground"] = fg;
		style["--chart-1"] = hex;
	}

	return (
		<div
			data-depth={ui ? "floating" : modes.depth}
			data-radius={ui ? radius : modes.radius}
			data-motion={ui ? "on" : modes.motion}
			data-size={ui ? size : undefined}
			style={ui ? (style as CSSProperties) : undefined}
			className={`rabtx ${ui ? theme : modes.theme} min-h-dvh bg-background text-foreground`}
		>
			<header className="sticky top-0 z-10 flex flex-wrap items-center gap-3 border-b border-input bg-background px-5 py-3">
				<Link href={withView("/ui", view)} className="text-sm font-medium">
					Rabtx UI
				</Link>
				<div
					role="group"
					aria-label="Layout"
					className="flex gap-0.5 rounded-[10px] bg-muted p-0.5"
				>
					{(
						[
							["docs", "Docs"],
							["ui", "UI"],
						] as const
					).map(([id, label]) => (
						<button
							key={id}
							type="button"
							aria-pressed={view === id}
							onClick={() => setView(id)}
							className="cursor-pointer rounded-[8px] px-3 py-1 text-[13px] text-muted-foreground aria-pressed:bg-card aria-pressed:text-foreground aria-pressed:shadow-[0_0_0_1px_var(--input)] focus-visible:outline-2 focus-visible:outline-ring"
						>
							{label}
						</button>
					))}
				</div>
				{ui ? null : (
					<div className="ml-auto flex flex-wrap gap-2">
						{Object.entries(MODES).map(([mode, values]) => (
							<fieldset key={mode} className="flex gap-0.5 rounded-[10px] bg-muted p-0.5">
								<legend className="sr-only">{mode}</legend>
								{values.map((value) => (
									<label
										key={value}
										className="cursor-pointer rounded-[8px] px-2.5 py-1 text-[13px] text-muted-foreground capitalize has-checked:bg-card has-checked:text-foreground has-checked:shadow-[0_0_0_1px_var(--input)] has-focus-visible:outline-2 has-focus-visible:outline-ring"
									>
										<input
											type="radio"
											name={mode}
											value={value}
											checked={modes[mode as keyof Modes] === value}
											onChange={() => setModes((current) => ({ ...current, [mode]: value }))}
											className="sr-only"
										/>
										{value}
									</label>
								))}
							</fieldset>
						))}
					</div>
				)}
			</header>
			{ui ? (
				<div className="flex min-h-[calc(100dvh-3.5rem)] flex-col lg:flex-row">
					<SideNav
						pathname={pathname}
						view="ui"
						className="border-b border-input p-4 lg:sticky lg:top-14 lg:h-[calc(100dvh-3.5rem)] lg:w-52 lg:shrink-0 lg:overflow-y-auto lg:border-r lg:border-b-0"
					/>
					<div className="flex min-w-0 flex-1 flex-col xl:flex-row">
						<div className="min-w-0 flex-1 px-5 py-8 xl:px-10">
							{hasStage(pathname) ? <Stage pathname={pathname} /> : children}
						</div>
						<Customize
							theme={theme}
							radius={radius}
							size={size}
							primary={primary}
							motionMs={motionMs}
							onTheme={setTheme}
							onRadius={setRadius}
							onSize={setSize}
							onPrimary={setPrimary}
							onMotion={setMotionMs}
						/>
					</div>
				</div>
			) : (
				<div className="mx-auto flex max-w-6xl flex-col md:flex-row">
					<SideNav pathname={pathname} view="docs" className="p-5 md:w-56 md:flex-none md:py-8" />
					<main className="min-w-0 flex-1 px-5 pt-2 pb-24 md:py-8 md:pr-10">{children}</main>
				</div>
			)}
		</div>
	);
}
