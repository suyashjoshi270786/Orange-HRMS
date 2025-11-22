import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, firefox, webkit, Browser, BrowserType, request } from "playwright";
import { CustomWorld } from "./world";

setDefaultTimeout(60 * 1000);

function getBrowserType(): BrowserType<Browser> {
  const name = (process.env.BROWSER || "chromium").toLowerCase();

  switch (name) {
    case "firefox":
      return firefox;
    case "webkit":
      return webkit;
    case "chromium":
    default:
      return chromium;
  }
}

Before(async function (this: CustomWorld) {
  console.log("Before hook running");

  const browserType = getBrowserType();
  this.browser = await browserType.launch({ headless: false, slowMo: 100 });

  const context = await this.browser.newContext();
  this.page = await context.newPage();

  await this.initObjects();
});

After(async function (this: CustomWorld) {
  await this.page.close();
  await this.browser.close();
});
