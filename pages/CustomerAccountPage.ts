import { Page, Locator, expect } from '@playwright/test';

export  class   CustomerAccountPage{
    
    page: Page

    MSG_ThankYouRegister: Locator

    TTL_MyAccount: Locator

    SEC_AccountInfo: Locator

    constructor(page){
        this.page = page

        this.MSG_ThankYouRegister = this.page.getByText('Thank you for registering with Main Website Store.')

        this.TTL_MyAccount = this.page.locator('xpath=//h1')

        this.SEC_AccountInfo = this.page.getByText('Account Information').locator('xpath=/ancestor::div[@class="block block-dashboard-info"]')

    }

    //Customer Account page assert section
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

    //Register assert section
    private async CustomerAccountInfoDisplayed(fullName, email){
        await expect.soft(this.SEC_AccountInfo).toContainText(fullName)
        await expect.soft(this.SEC_AccountInfo).toContainText(email)
    }

    private async RegisterSuccessMsgDisplayed(){
        await expect.soft(this.MSG_ThankYouRegister).toBeVisible()
    }

    async RegisterSuccessfully(fullName, email){

        await this.CustomerAccountPageDisplayed()
        await this.RegisterSuccessMsgDisplayed()
        await this.CustomerAccountInfoDisplayed(fullName, email)

    }

}