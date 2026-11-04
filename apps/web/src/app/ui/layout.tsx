import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { Shell } from "./_components/shell";

export const metadata: Metadata = { title: "Rabtx UI", description: "Rabtx UI components." };

export default function UiLayout({ children }: { children: ReactNode }) {
	return (
		<Suspense fallback={null}>
			<Shell>{children}</Shell>
		</Suspense>
	);
}
