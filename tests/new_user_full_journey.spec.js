import { test } from "@playwright/test"
import { v4 as uuidv4 } from "uuid"

import { ProductsPage } from "../page_objects/ProductsPage.js"
import { Navigation } from "../page_objects/Navigation.js"                          
import { Checkout } from "../page_objects/Checkout.js"  
import { LoginPage } from "../page_objects/LoginPage.js"       
import { RegisterPage } from "../page_objects/RegisterPage.js"
import { DeliveryDetails} from "../page_objects/DeliveryDetails.js"
import { deliveryDetails as userAddress} from "../data/deliveryDetails.js"
import { PaymentPage } from "../page_objects/PaymentPage.js"
import { paymentDetails } from "../data/paymentDetails.js"



// The tested page is displayed only localy using a exe file, run on localhost
// It is a regular kind of e-shop with product page, checkout page, login page, etc.

// E2E test, for the learning purposes, contains the following: 
//  - add items to basket 
//  - go to checkout 
//  - locate the cheapest one and delete it 
//  - login/register + fill user details and check that they are properly displayed
//  - delivery details
//  - payment 

// the test suit run only "only" test. Or "skip"
test("New user full end-to-end test journey", async ({ page }) => {

    const productsPage = new ProductsPage(page) // instance of the class, the baseURL is in the playwright.config.js
    await productsPage.visit()
    // sort items 
    await productsPage.sortByChepeast()

    // at the productPage add some products to the basket
    await productsPage.addProductToBasket(0)
    await productsPage.addProductToBasket(1)
    await productsPage.addProductToBasket(2)

    // go to checkout
    const navigation = new Navigation(page)
    await navigation.goToCheckout()

    // remove the cheapest item from the basket 
    const checkout = new Checkout(page)
    await checkout.removeChepeastProduct()

    // continue to checkout
    await checkout.continueToCheckout()

    // login page
    const login = new LoginPage(page)
    await login.goToRegister()

    // create new account 
    const registerPage = new RegisterPage(page)
    await registerPage.signUpAsExistingUser()
    const email = uuidv4() + "seznam.cz"
    const password = uuidv4()
    await registerPage.signUpAsNewUser(email, password)

    // fill in the personal data
    const deliveryDetails = new DeliveryDetails(page)
    await deliveryDetails.fillDetails(userAddress)
    await deliveryDetails.saveDetails()

    // continue to payment 
    await deliveryDetails.continueToPayment()
    const paymentPage = new PaymentPage(page)
    await paymentPage.activateDiscount()
    await paymentPage.fillPaymentDetails(paymentDetails)
    await paymentPage.completedPayment()
})