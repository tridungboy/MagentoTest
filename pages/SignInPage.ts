import { Page, Locator, expect } from '@playwright/test';

export  class   SignInPage{
    
    page: Page

    TTL_SignIn: Locator

    TXT_Email: Locator
    TXT_Password: Locator
    BTN_SignIn: Locator

    constructor(page){
        this.page = page

        this.TTL_SignIn = this.page.locator('xpath=//h1')

        this.TXT_Email = this.page.getByText('Email').locator('xpath=/parent::*/following-sibling::*//input')
        this.TXT_Password = this.page.getByText('Password').locator('xpath=/parent::*/following-sibling::*//input')
        this.BTN_SignIn = this.page.getByRole('button',{name: 'Sign In', exact: false})
    }

    private async SignInPageHaveCorrectURL(){
        await expect.soft(this.page).toHaveURL(/customer\/account\/login/)
    }

    private async SignInTitleDisplayed(){
        expect.soft(await this.TTL_SignIn.textContent()).toContain('Customer Login')
    }

    async SignInPageDisplayed(){
        await this.SignInPageHaveCorrectURL()
        await this.SignInTitleDisplayed()
    }

    private async FillEmail(email){
        if(await this.TXT_Email.isVisible()){
            await this.TXT_Email.fill(email)
        }
    }

    private async FillPassword(password){
        if(await this.TXT_Password.isVisible()){
            await this.TXT_Password.fill(password)
        }
    }

    private async ClickSignInButton(){
        if(await this.BTN_SignIn.isVisible() && await this.BTN_SignIn.isEnabled()){
            await this.BTN_SignIn.click()
        }
    }

    async Login(email, password){
        await this.FillEmail(email)
        await this.FillPassword(password)
        await this.ClickSignInButton()
    }
}