import { test, expect } from '../pages/PageObjectHelper';

let Email = 'dung@yopmail.com'
let Password = '1234@Company'

let FirstName = 'Dung'
let LastName = 'Le'


test.beforeEach(async ({ homePage }) => {

    await homePage.GoToHomePage()
})

test('Check Home Page displayed', async ({ homePage }) => {

    await homePage.HomePageDisplayed()

});

test('Check user can sign in normally', async ({ homePage, signInPage }) => {

    await homePage.ClickSignInLink()
    await signInPage.SignInPageDisplayed()
    await signInPage.Login(Email, Password)
    await homePage.HomePageDisplayedAfterLogin(FirstName, LastName)

});

test('Check user can sign up normally', async ({ homePage, signUpPage, customerAccountPage }) => {

    await homePage.ClickSignUpLink()
    await signUpPage.SignUpPageDisplayed()
    let [fullName, email] = await signUpPage.CreateAnAccount(FirstName, LastName, Email, Password)
    await customerAccountPage.RegisterSuccessfully(fullName, email)

});
