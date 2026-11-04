"use client";

import { Button } from "@rabtx/ui/button";
import { Badge } from "@rabtx/ui/badge";
import { Checkbox } from "@rabtx/ui/checkbox";
import { Field } from "@rabtx/ui/field";
import { Input } from "@rabtx/ui/input";
import { RadioGroup, RadioGroupItem } from "@rabtx/ui/radio-group";
import { Select, SelectItem } from "@rabtx/ui/select";
import { Slider } from "@rabtx/ui/slider";
import { Switch } from "@rabtx/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@rabtx/ui/tabs";
import { Textarea } from "@rabtx/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@rabtx/ui/accordion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@rabtx/ui/tooltip";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "@rabtx/ui/popover";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@rabtx/ui/dropdown-menu";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@rabtx/ui/dialog";
import { Toaster, toast } from "@rabtx/ui/toast";
import { type ReactNode } from "react";
import CardExample from "../card/_examples/default";
import CommandPaletteExample from "../blocks/command/_examples/palette";
import SettingsBlockExample from "../blocks/settings/_examples/settings";
import SignupBlockExample from "../blocks/signup/_examples/signup";

const NOTE = "Floating. Radius, color, size and animation time come from the controls.";

function Frame({ title, children }: { title: string; children: ReactNode }) {
	return (
		<div className="mx-auto w-full max-w-3xl">
			<h1 className="text-2xl font-medium">{title}</h1>
			<p className="mt-2 text-sm text-muted-foreground">{NOTE}</p>
			<div className="mt-8 flex min-h-56 flex-wrap items-center justify-center gap-6">
				{children}
			</div>
		</div>
	);
}

function BlockFrame({ title, children }: { title: string; children: ReactNode }) {
	return (
		<div className="mx-auto w-full max-w-5xl">
			<h1 className="text-2xl font-medium">{title}</h1>
			<p className="mt-2 mb-8 text-sm text-muted-foreground">{NOTE}</p>
			{children}
		</div>
	);
}

function Buttons() {
	return (
		<div className="flex flex-wrap gap-3">
			<Button>Save</Button>
			<Button variant="secondary">Cancel</Button>
		</div>
	);
}

function EmailField() {
	return (
		<Field label="Email" hint="We only use it to sign you in." className="w-72">
			<Input type="email" placeholder="you@example.com" />
		</Field>
	);
}

function Volume() {
	return (
		<div className="w-72">
			<Slider aria-label="Volume" defaultValue={[40]} showValue="always" />
		</div>
	);
}

function Plans() {
	return (
		<RadioGroup aria-label="Plan" defaultValue="pro" className="w-64">
			<RadioGroupItem value="starter">Starter, free</RadioGroupItem>
			<RadioGroupItem value="pro">Pro, $12 a month</RadioGroupItem>
			<RadioGroupItem value="team">Team, $29 a month</RadioGroupItem>
		</RadioGroup>
	);
}

function AccountTabs() {
	return (
		<Tabs defaultValue="account" className="w-full max-w-md">
			<TabsList aria-label="Settings">
				<TabsTrigger value="account">Account</TabsTrigger>
				<TabsTrigger value="password">Password</TabsTrigger>
			</TabsList>
			<TabsContent value="account" className="text-sm text-muted-foreground">
				Your name, email and avatar.
			</TabsContent>
			<TabsContent value="password" className="text-sm text-muted-foreground">
				Change your password.
			</TabsContent>
		</Tabs>
	);
}

function ReleaseNotes() {
	return (
		<Accordion type="single" collapsible defaultValue="brief" className="w-full max-w-sm">
			<AccordionItem value="brief">
				<AccordionTrigger>Release brief</AccordionTrigger>
				<AccordionContent>Launch notes, owners and risks in one short handoff.</AccordionContent>
			</AccordionItem>
			<AccordionItem value="checklist">
				<AccordionTrigger>Launch checklist</AccordionTrigger>
				<AccordionContent>Copy, links, analytics and the final approvals.</AccordionContent>
			</AccordionItem>
			<AccordionItem value="ship">
				<AccordionTrigger>Ship the build</AccordionTrigger>
				<AccordionContent>The current artifact and the sign-off before release.</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}

function PublishTip() {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="secondary">Publish</Button>
			</TooltipTrigger>
			<TooltipContent>Make this page public</TooltipContent>
		</Tooltip>
	);
}

function Dimensions() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="secondary">Dimensions</Button>
			</PopoverTrigger>
			<PopoverContent>
				<PopoverHeader>
					<PopoverTitle>Dimensions</PopoverTitle>
					<PopoverDescription>Set the width and height of the layer.</PopoverDescription>
				</PopoverHeader>
				<div className="grid grid-cols-2 gap-3">
					<Field label="Width">
						<Input defaultValue="100%" />
					</Field>
					<Field label="Height">
						<Input defaultValue="auto" />
					</Field>
				</div>
			</PopoverContent>
		</Popover>
	);
}

function AccountMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary">My account</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-48">
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Billing</DropdownMenuItem>
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function ShareDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary">Share project</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Share project</DialogTitle>
					<DialogDescription>Anyone with the link can view this project.</DialogDescription>
				</DialogHeader>
				<Field label="Link">
					<Input defaultValue="https://grid.dev/acme" readOnly />
				</Field>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="secondary">Close</Button>
					</DialogClose>
					<Button>Copy link</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

function ShowToast() {
	return (
		<>
			<Button
				variant="secondary"
				onClick={() =>
					toast("Event created", {
						description: "Sunday, November 1 at 9:00",
					})
				}
			>
				Show toast
			</Button>
			<Toaster />
		</>
	);
}

function Board() {
	return (
		<div className="mx-auto grid w-full max-w-5xl gap-10">
			<div>
				<h1 className="text-2xl font-medium">UI</h1>
				<p className="mt-2 max-w-xl text-sm text-muted-foreground">
					One set of controls for the whole canvas. Radius, primary color, size and animation time.
					Depth stays floating, so a flat control never sits next to a floating one.
				</p>
			</div>
			<div className="grid items-start gap-10 lg:grid-cols-2">
				<Buttons />
				<EmailField />
				<Volume />
				<div className="grid gap-3">
					<Switch defaultChecked>Wi-Fi</Switch>
					<Checkbox defaultChecked>Email me product updates</Checkbox>
				</div>
				<AccountTabs />
				<ReleaseNotes />
				<div className="flex flex-wrap gap-3">
					<PublishTip />
					<ShowToast />
				</div>
			</div>
		</div>
	);
}

const STAGES: Record<string, () => ReactNode> = {
	"/ui": Board,
	"/ui/button": () => (
		<Frame title="Button">
			<Buttons />
		</Frame>
	),
	"/ui/input": () => (
		<Frame title="Input">
			<EmailField />
		</Frame>
	),
	"/ui/field": () => (
		<Frame title="Field">
			<EmailField />
		</Frame>
	),
	"/ui/textarea": () => (
		<Frame title="Textarea">
			<Field label="Description" hint="Shown on the project page." className="w-72">
				<Textarea placeholder="Add a description…" />
			</Field>
		</Frame>
	),
	"/ui/select": () => (
		<Frame title="Select">
			<Field label="Framework" className="w-64">
				<Select placeholder="Pick a framework" defaultValue="next">
					<SelectItem value="next">Next.js</SelectItem>
					<SelectItem value="remix">Remix</SelectItem>
					<SelectItem value="astro">Astro</SelectItem>
				</Select>
			</Field>
		</Frame>
	),
	"/ui/checkbox": () => (
		<Frame title="Checkbox">
			<div className="grid gap-3">
				<Checkbox defaultChecked>Email me product updates</Checkbox>
				<Checkbox>Share anonymous usage data</Checkbox>
			</div>
		</Frame>
	),
	"/ui/switch": () => (
		<Frame title="Switch">
			<div className="grid gap-3">
				<Switch defaultChecked>Wi-Fi</Switch>
				<Switch>Airplane mode</Switch>
			</div>
		</Frame>
	),
	"/ui/radio-group": () => (
		<Frame title="Radio Group">
			<Plans />
		</Frame>
	),
	"/ui/slider": () => (
		<Frame title="Slider">
			<div className="grid w-72 gap-8">
				<Slider aria-label="Volume" defaultValue={[40]} showValue="always" />
				<Slider aria-label="Price range" defaultValue={[20, 80]} showValue="always" />
			</div>
		</Frame>
	),
	"/ui/tabs": () => (
		<Frame title="Tabs">
			<AccountTabs />
		</Frame>
	),
	"/ui/accordion": () => (
		<Frame title="Accordion">
			<ReleaseNotes />
		</Frame>
	),
	"/ui/card": () => (
		<Frame title="Card">
			<CardExample />
		</Frame>
	),
	"/ui/dialog": () => (
		<Frame title="Dialog">
			<ShareDialog />
		</Frame>
	),
	"/ui/tooltip": () => (
		<Frame title="Tooltip">
			<PublishTip />
		</Frame>
	),
	"/ui/popover": () => (
		<Frame title="Popover">
			<Dimensions />
		</Frame>
	),
	"/ui/dropdown-menu": () => (
		<Frame title="Dropdown Menu">
			<AccountMenu />
		</Frame>
	),
	"/ui/toast": () => (
		<Frame title="Toast">
			<ShowToast />
		</Frame>
	),
	"/ui/badge": () => (
		<Frame title="Badge">
			<div className="flex gap-2">
				<Badge>Draft</Badge>
				<Badge tone="accent">New</Badge>
			</div>
		</Frame>
	),
	"/ui/blocks/signup": () => (
		<BlockFrame title="Sign-up">
			<div className="flex justify-center">
				<SignupBlockExample />
			</div>
		</BlockFrame>
	),
	"/ui/blocks/command": () => (
		<BlockFrame title="Command palette">
			<CommandPaletteExample />
		</BlockFrame>
	),
	"/ui/blocks/settings": () => (
		<BlockFrame title="Settings">
			<SettingsBlockExample />
		</BlockFrame>
	),
};

export function hasStage(pathname: string) {
	return pathname in STAGES;
}

export function Stage({ pathname }: { pathname: string }) {
	const View = STAGES[pathname];
	if (!View) return null;
	return <View />;
}
