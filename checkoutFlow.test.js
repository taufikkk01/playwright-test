const { test, expect } = require("@playwright/test");

test("Full Flow", async ({
  page,
}) => {
  await page.goto("https://www.saucedemo.com/");

  // Step 1: Login
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");

  // Step 2: Select random items (2 to 4 items) from the inventory
  const allItems = await page.locator(".inventory_item");
  const totalItems = await allItems.count();
  const numItemsToSelect = Math.floor(Math.random() * 3) + 2;

  // Randomly select items and add them to the cart
  let selectedItems = [];
  for (let i = 0; i < numItemsToSelect; i++) {
    const randomIndex = Math.floor(Math.random() * totalItems);
    const item = await allItems.nth(randomIndex);
    const addToCartButton = await item.locator(".btn_inventory");
    await addToCartButton.click();
    selectedItems.push(item);
  }

  // Step 3: Go to the cart
  await page.click(".shopping_cart_link");

  // Step 4: Remove the first item from the cart
  const firstCartItemRemoveButton = await page
    .locator("#cart_contents_container .cart_item")
    .first()
    .locator(".cart_button");
  await firstCartItemRemoveButton.click();

  // Step 6: Proceed to checkout
  await page.click(".checkout_button");

  // Step 7: Fill out the checkout form
  await page.fill("#first-name", "Taufik");
  await page.fill("#last-name", "Hidayat");
  await page.fill("#postal-code", "12345");

  // Step 8: Click the "Continue" button to proceed to the next step
  await page.click(".cart_button");

  // Step 9: Click the "Finish" button to complete the checkout
  await page.click(".cart_button");

  // Step 10: Assert the final order confirmation message is displayed
  const confirmationMessage = await page.locator(".complete-header");
  await expect(confirmationMessage).toHaveText("Thank you for your order!");
});
