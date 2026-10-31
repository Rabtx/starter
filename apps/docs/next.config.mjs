import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	// @rabtx/ui ships TypeScript source, like it does for apps/web.
	transpilePackages: ["@rabtx/ui"],
};

export default withMDX(config);
