import { Input } from "@rabtx/ui/input";

export default function InputDefault() {
	return (
		<div className="grid w-64 gap-1.5">
			<label htmlFor="email" className="text-xs font-medium">
				Email
			</label>
			<Input id="email" type="email" placeholder="you@example.com" aria-describedby="email-hint" />
			<span id="email-hint" className="text-xs text-(--rx-text-secondary)">
				We only use it to sign you in.
			</span>
		</div>
	);
}
