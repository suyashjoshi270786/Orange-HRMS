import { Before, After, setDefaultTimeout, AfterAll } from "@cucumber/cucumber";
import { chromium, request } from "playwright";
import { CustomWorld } from "./world";

setDefaultTimeout(60 * 1000);

Before(async function (this: CustomWorld) {
  console.log("Before hook running");

  //UI browser page
  this.browser = await chromium.launch({ headless: false, slowMo: 100 });
  const context = await this.browser.newContext();
  this.page = await context.newPage();

  await this.initObjects();
});

After(async function (this: CustomWorld) {
  await this.page.close();
  await this.browser.close();
});
