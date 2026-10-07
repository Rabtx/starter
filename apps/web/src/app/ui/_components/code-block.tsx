"use client";

import { Button } from "@rabtx/ui/button";
import { useState } from "react";
import { Icon } from "./icons";

/** Code with a copy button. The copy button is itself a Button, so it exercises the real component. */
export function CodeBlock({ code }: { code: string }) {
	const [copied, setCopied] = useState(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			setTimeout(() => setCopied(false), 1600);
		} catch {
			// Clipboard can be blocked; the code stays selectable.
		}
	}

	return (
		<div className="relative rounded-xl border border-[var(--rx-border-strong)] bg-[var(--rx-pressed)]">
			<pre className="overflow-x-auto p-4 pr-24 font-mono text-[12px] leading-5 text-[var(--rx-text)]">
				<code>{code}</code>
			</pre>
			<div className="absolute top-2 right-2">
				<Button
					variant="ghost"
					size="sm"
					onClick={copy}
					leadingIcon={<Icon name={copied ? "arrow" : "mail"} />}
				>
					{copied ? "Copied" : "Copy"}
				</Button>
			</div>
		</div>
	);
}
