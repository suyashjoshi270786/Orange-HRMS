import {IWorldOptions,World,setWorldConstructor,world,} from "@cucumber/cucumber";
import {Page,Browser,APIResponse,APIRequestContext} from "@playwright/test";
import { LoginPage } from "../tests/pages/loginPage";

export class CustomWorld extends World {
  page!: Page;
  browser!: Browser;
  loginPage!: LoginPage;

  //API Fields
  request!: APIRequestContext;
  response!: APIResponse;

  //Existing page objects

    mockData: any = null;
  mockFired: boolean = false;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async initObjects() {
    this.loginPage = new LoginPage(this.page);
  }
}

setWorldConstructor(CustomWorld);
