import { test, expect } from '../pages/PageObjectHelper';

let Email = 'dung@yopmail.com'
let Password = '1234@Company'

let FirstName = 'Dung'
let LastName = 'Le'

test('Check Home Page displayed', async ({ homePage }) => {

    await homePage.GoToHomePage()
    await homePage.HomePageDisplayed()

});

test('Check user can sign in normally', async ({ homePage, signInPage, customerAccountPage }) => {

    await homePage.GoToHomePage()
    await homePage.HomePageDisplayed()
    await homePage.ClickSignInLink()
    await signInPage.SignInPageDisplayed()
    await signInPage.Login(Email, Password)
    await homePage.HomePageDisplayedAfterLogin(FirstName, LastName)

});

test('Check user can sign up normally', async ({ homePage, signUpPage }) => {

    await homePage.GoToHomePage()
    await homePage.HomePageDisplayed()
    await homePage.ClickSignUpLink()
    await signUpPage.SignUpPageDisplayed()
    await signUpPage.CreateAnAccount(FirstName, LastName, Email, Password)

});
