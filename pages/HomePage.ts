import { Page, Locator, expect } from '@playwright/test';

export class HomePage {

    page: Page

    LNK_SignIn: Locator
    LNK_SignUp: Locator

    MSG_Migration: Locator
    LST_AccountOptions: Locator

    constructor(page) {
        this.page = page

        this.LNK_SignIn = this.page.getByRole('link', { name: 'Sign In', exact: false })
        this.LNK_SignUp = this.page.getByRole('link', { name: 'Create an Account', exact: false })

        this.MSG_Migration = this.page.getByRole('banner').getByText('Website under migration. Testing should function normally, but expect SQL data delays post-migration')
        this.LST_AccountOptions = this.page.locator('xpath=//*[@class="greet welcome"]')
    }

    async GoToHomePage() {
        await this.page.goto('');
    }

    private async HomePageHaveCorrectURL() {
        await expect.soft(this.page).toHaveURL('https://magento.softwaretestingboard.com/')
    }

    private async HomePageHaveCorrectTitle() {
        await expect.soft(this.page).toHaveTitle('Home Page')
    }

    async HomePageDisplayed() {
        await this.HomePageHaveCorrectURL()
        await this.HomePageHaveCorrectTitle()

    }

    async ClickSignInLink() {
        if (await this.LNK_SignIn.isVisible()) {
            await this.LNK_SignIn.click()
        }
    }

    async ClickSignUpLink() {
        if (await this.LNK_SignUp.isVisible()) {
            await this.LNK_SignUp.click()
        }
    }

    private async AccountOptionContainNames(fname, lname) {
        await expect.soft(this.LST_AccountOptions.first()).toContainText(fname + ' ' + lname,{timeout: 30000})
    }

    //Home Page assert after login section
    async HomePageDisplayedAfterLogin(fname, lname) {
        await this.HomePageHaveCorrectURL()
        await this.HomePageHaveCorrectTitle()
        await this.MSG_Migration.waitFor({state: 'hidden'})
        await this.AccountOptionContainNames(fname, lname)
    }
}