import { Page, Locator, expect } from '@playwright/test';

export  class   CustomerAccountPage{
    
    page: Page

    TTL_MyAccount: Locator

    constructor(page){
        this.page = page

        this.TTL_MyAccount = this.page.locator('xpath=//h1')

    }

    private async CustomerAccountPageHaveCorrectURL(){
        await expect.soft(this.page).toHaveURL(/customer\/account/)
    }

    private async CustomerAccountTitleDisplayed(){
        expect.soft(await this.TTL_MyAccount.textContent()).toContain('My Account')
    }

    async CustomerAccountPageDisplayed(){
        await this.CustomerAccountPageHaveCorrectURL()
        await this.CustomerAccountTitleDisplayed()
    }

}