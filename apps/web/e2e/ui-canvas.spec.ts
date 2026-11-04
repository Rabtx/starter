import { expect, type Page, test } from "@playwright/test";

const label = (page: Page, name: string) =>
	page.locator("label", { hasText: new RegExp(`^${name}$`, "i") });

test.describe("rabtx ui canvas", () => {
	test("docs keeps the written layout and the mode toggles", async ({ page }) => {
		await page.goto("/ui/slider");
		await expect(page.getByRole("heading", { name: "Slider", level: 1 })).toBeVisible();
		await expect(page.getByRole("heading", { name: "Value bubble" })).toBeVisible();
		await expect(page.getByRole("heading", { name: "Sizes" })).toHaveCount(0);
		await expect(page.locator("header label", { hasText: /^floating$/i })).toBeVisible();
		await expect(page.locator(".rabtx")).not.toHaveAttribute("data-size", /.+/);
	});

	test("the switch opens a floating canvas and the controls restyle it", async ({ page }) => {
		await page.goto("/ui");
		await page.getByRole("button", { name: "UI", exact: true }).click();
		await expect(page).toHaveURL(/view=ui/);
		await expect(page.getByRole("heading", { name: "UI", level: 1 })).toBeVisible();
		await expect(page.getByRole("heading", { name: "Installation" })).toHaveCount(0);

		const root = page.locator(".rabtx");
		await expect(root).toHaveAttribute("data-depth", "floating");
		await expect(root).toHaveAttribute("data-size", "md");
		await expect(root).toHaveAttribute("style", /--motion-ms:\s*280/);

		await label(page, "Round").click();
		await expect(root).toHaveAttribute("data-radius", "round");
		await label(page, "Large").click();
		await expect(root).toHaveAttribute("data-size", "lg");
		await expect(page.getByRole("button", { name: "Save" })).toHaveCSS("height", "48px");

		await label(page, "Blue").click();
		await expect(root).toHaveCSS("--primary", "#2563eb");

		const motion = page.getByRole("slider", { name: "Animation" });
		await motion.fill("600");
		await expect(root).toHaveAttribute("style", /--motion-ms:\s*600/);
		await expect(motion).toHaveAttribute("aria-valuetext", "600 ms");

		await page.getByRole("button", { name: "Docs", exact: true }).click();
		await expect(page).not.toHaveURL(/view=ui/);
		await expect(page.getByRole("heading", { name: "Introduction", level: 1 })).toBeVisible();
	});

	test("a component page in UI keeps the floating example, not the whole article", async ({
		page,
	}) => {
		await page.goto("/ui/tooltip?view=ui");
		await expect(page.getByRole("heading", { name: "Tooltip", level: 1 })).toBeVisible();
		await expect(page.getByRole("heading", { name: "Sides" })).toHaveCount(0);
		await expect(page.getByRole("button", { name: "Publish" })).toBeVisible();
		await expect(page.locator(".rabtx")).toHaveAttribute("data-depth", "floating");
	});
});
