import { expect, test } from "@playwright/test";

test.describe("rabtx button playground", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/ui/button");
		await expect(page.getByRole("heading", { name: "Button", level: 1 })).toBeVisible();
	});

	test("the Design controls switch modes on the wrapper", async ({ page }) => {
		const wrapper = page.locator("[data-theme][data-depth][data-radius][data-motion]").first();

		await page.getByRole("radio", { name: "Dark", exact: true }).click();
		await page.getByRole("radio", { name: "Flat", exact: true }).click();
		await page.getByRole("radio", { name: "Round", exact: true }).click();
		await page.getByRole("radio", { name: "Off", exact: true }).click();

		await expect(wrapper).toHaveAttribute("data-theme", "dark");
		await expect(wrapper).toHaveAttribute("data-depth", "flat");
		await expect(wrapper).toHaveAttribute("data-radius", "round");
		await expect(wrapper).toHaveAttribute("data-motion", "off");
	});

	test("Flat gives a single border color and Floating keeps the gradient edge", async ({
		page,
	}) => {
		const button = page.getByRole("button", { name: "Save changes" }).first();
		const edge = () =>
			button.evaluate((el) => {
				const style = getComputedStyle(el);
				return [style.getPropertyValue("--rx-edge-a"), style.getPropertyValue("--rx-edge-b")];
			});

		const [floatingA, floatingB] = await edge();
		expect(floatingA).not.toBe(floatingB);

		await page.getByRole("radio", { name: "Flat", exact: true }).click();
		const [flatA, flatB] = await edge();
		expect(flatA).toBe(flatB);
	});

	test("geometry does not move when depth changes", async ({ page }) => {
		const button = page.getByRole("button", { name: "Save changes" }).first();
		const before = await button.boundingBox();
		await page.getByRole("radio", { name: "Flat", exact: true }).click();
		const after = await button.boundingBox();
		expect(after?.width).toBe(before?.width);
		expect(after?.height).toBe(before?.height);
	});

	test("keyboard focus shows a 2px ring", async ({ page }) => {
		const button = page.getByRole("button", { name: "Save changes" }).first();
		await button.focus();
		await page.keyboard.press("Tab");
		await page.keyboard.press("Shift+Tab");
		await expect(button).toBeFocused();
		await expect(button).toHaveCSS("outline-style", "solid");
		await expect(button).toHaveCSS("outline-width", "2px");
	});

	test("loading stays focusable and busy, disabled is removed from the tab order", async ({
		page,
	}) => {
		await page.getByRole("checkbox", { name: "Loading" }).check();
		const button = page.getByRole("button", { name: "Save changes" }).first();
		await expect(button).toHaveAttribute("aria-busy", "true");
		await button.focus();
		await expect(button).toBeFocused();

		await page.getByRole("checkbox", { name: "Loading" }).uncheck();
		await page.getByRole("checkbox", { name: "Disabled" }).check();
		await expect(button).toBeDisabled();
	});

	test("the page does not scroll sideways on a phone", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 812 });
		const { scrollWidth, clientWidth } = await page.evaluate(() => ({
			scrollWidth: document.documentElement.scrollWidth,
			clientWidth: document.documentElement.clientWidth,
		}));
		expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
	});
});
