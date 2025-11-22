import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world";

const ACTION_SUMMARY_API =
  "**/api/v2/dashboard/employees/action-summary";

Given("I mock the user API", async function (this: CustomWorld) {
  // reset flag for each scenario
  this.mockFired = false;

  await this.page.route(ACTION_SUMMARY_API, async route => {
    // mark that our mock was actually used
    this.mockFired = true;

    const mockBody = {
      data: {
        actionSummary: [
          {
            type: "MOCKED_ACTION",
            count: 999
          }
        ]
      }
    };

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockBody)
    });
  });
});

When("I open the login page", async function (this: CustomWorld) {
  // Go to login & perform login so dashboard loads
  await this.loginPage.navigateToLoginPage();
  await this.loginPage.enterUsername("Admin");
  await this.loginPage.enterPassword("admin123");
  await this.loginPage.clickLoginButton();

  // Wait for network to settle so the API call has a chance to fire
  await this.page.waitForLoadState("networkidle");
});

Then(
  "API should be mocked successfully",
  async function (this: CustomWorld) {
    // Wait up to a few seconds for mockFired to become true
    await expect.poll(() => this.mockFired).toBeTruthy();
  }
);
