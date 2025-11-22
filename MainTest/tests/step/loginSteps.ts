import { Given, When, Then } from "@cucumber/cucumber";
import { LoginPage } from "../pages/loginPage";
import { CustomWorld } from "../../support/world";
import { expect } from "playwright/test";

Given("user is on login page", async function (this: CustomWorld) {
  await this.loginPage.navigateToLoginPage();
});

When(
  "user enters valid {string} and {string}",
  async function (this: CustomWorld, username, password) {
    await this.loginPage.enterUsername(username);
    await this.loginPage.enterPassword(password);
  }
);

Then(
  "user should be redirected to dashboard",
  async function (this: CustomWorld) {
    const dashboard = await this.loginPage.clickLoginButton();
    await expect(dashboard).toHaveText("Dashboard");
  }
);
