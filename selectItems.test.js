const { test, expect } = require("@playwright/test");

test("select 4 Items and assert details are visible", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");

  await page.waitForSelector(".inventory_list");

  const itemIds = [
    "item_0_img_link",
    "item_1_img_link",
    "item_2_img_link",
    "item_3_img_link",
  ];

  for (let i = 0; i < itemIds.length; i++) {
    const itemId = itemIds[i];

    const item = await page.locator(`#${itemId}`);
    await expect(item).toBeVisible();

    const itemImage = await page.locator(`#${itemId} img`);
    await expect(itemImage).toBeVisible();
  }
});
