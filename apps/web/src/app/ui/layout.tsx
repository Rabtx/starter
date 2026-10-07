import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PlaygroundShell } from "./_components/playground-shell";

export const metadata: Metadata = {
	title: "UI playground",
	description: "Rabtx UI components in every mode.",
};

export default function UiLayout({ children }: { children: ReactNode }) {
	return <PlaygroundShell>{children}</PlaygroundShell>;
}
