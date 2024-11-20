const { test, expect } = require("@playwright/test");

test("[Positive]login test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");

  await page.click("#login-button");

  await page.waitForSelector(".inventory_list");

  expect(page.url()).toContain("/inventory.html");
});

test("[Negative]login with invalid credentials", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.fill("#user-name", "wrong_user");
  await page.fill("#password", "wrong_password");

  await page.click("#login-button");

  const errorMessage = await page.locator(".error-message-container");

  await expect(errorMessage).toBeVisible();

  const errorText = await errorMessage.textContent();
  expect(errorText).toContain(
    "Username and password do not match any user in this service",
  );
});
