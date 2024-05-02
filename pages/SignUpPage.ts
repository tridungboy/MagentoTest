import { Page, Locator, expect } from '@playwright/test';

export class SignUpPage {

    page: Page

    TTL_SignUp: Locator

    TXT_FirstName: Locator
    TXT_LastName: Locator
    TXT_Email: Locator
    TXT_Password: Locator
    TXT_ConfirmPassword: Locator
    BTN_CreateAnAccount: Locator

    constructor(page) {
        this.page = page

        this.TTL_SignUp = this.page.locator('xpath=//h1')

        this.TXT_FirstName = this.page.getByText('First Name').locator('xpath=/parent::*/following-sibling::*//input')
        this.TXT_LastName = this.page.getByText('Last Name').locator('xpath=/parent::*/following-sibling::*//input')
        this.TXT_Email = this.page.getByText('Email').locator('xpath=/parent::*/following-sibling::*//input')
        this.TXT_Password = this.page.getByText('Password', { exact: true }).locator('xpath=/parent::*/following-sibling::*//input')
        this.TXT_ConfirmPassword = this.page.getByText('Confirm Password').locator('xpath=/parent::*/following-sibling::*//input')
        this.BTN_CreateAnAccount = this.page.getByRole('button',{name: 'Create an Account', exact: false})
    }

    private async SignUpPageHaveCorrectURL() {
        await expect.soft(this.page).toHaveURL(/customer\/account\/create/)
    }

    private async SignUpTitleDisplayed() {
        expect.soft(await this.TTL_SignUp.textContent()).toContain('Create New Customer Account')
    }

    async SignUpPageDisplayed() {
        await this.SignUpPageHaveCorrectURL()
        await this.SignUpTitleDisplayed()
    }

    private async FillFirstName(lname){
        if(await this.TXT_FirstName.isVisible()){
            await this.TXT_FirstName.fill(lname)
        }
    }

    private async FillLastName(fname){
        if(await this.TXT_LastName.isVisible()){
            await this.TXT_LastName.fill(fname)
        }
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

    private async FillPasswordAgain(password){
        if(await this.TXT_ConfirmPassword.isVisible()){
            await this.TXT_ConfirmPassword.fill(password)
        }
    }

    private async ClickCreateAccountButton(){
        if(await this.BTN_CreateAnAccount.isVisible() && await this.BTN_CreateAnAccount.isEnabled()){
            await this.BTN_CreateAnAccount.click()
        }
    }

    async CreateAnAccount(fname, lname, email, password){
        await this.FillFirstName(fname)
        await this.FillLastName(lname)
        await this.FillEmail(email)
        await this.FillPassword(password)
        await this.FillPasswordAgain(password)
        await this.ClickCreateAccountButton()
    }

}