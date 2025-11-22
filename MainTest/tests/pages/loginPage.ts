import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    UserName: Locator;
    Password: Locator;
    Loginbutton: Locator;
    Dashboard: Locator;

    constructor(page: Page){
        this.page = page;
        this.UserName =  this.page.getByPlaceholder('Username');
        this.Password = this.page.getByPlaceholder('Password');
        this.Loginbutton = this.page.getByRole('button', {name: 'Login'});
        this.Dashboard = this.page.locator('h6');

    }

    async navigateToLoginPage() {
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    }

    async enterUsername(username: string){
        await this.UserName.fill("Admin");
    }

    async enterPassword(password: string){
        await this.Password.fill("admin123");
    }

    async clickLoginButton(){
        await this.Loginbutton.click();
        let header = this.Dashboard;
        return header;
     
   
   
       
    }
}