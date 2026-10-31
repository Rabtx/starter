import defaultMdxComponents from "fumadocs-ui/mdx";
import { TypeTable } from "fumadocs-ui/components/type-table";
import type { MDXComponents } from "mdx/types";
import { ComponentPreview } from "@/components/rabtx/preview";

export function getMDXComponents(components?: MDXComponents) {
	return {
		...defaultMdxComponents,
		ComponentPreview,
		TypeTable,
		...components,
	} satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
	type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
