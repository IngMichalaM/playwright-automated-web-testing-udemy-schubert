import { expect } from "@playwright/test"
import { isDesktopViewport } from "../utils/isDesktopViewport"

export class Navigation{

    constructor(page){
        this.page = page
        
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkoutButton = page.locator('[data-qa="desktop-nav-link"]') // same for all three
        this.checkoutLink = page.getByRole('link', { name: 'Checkout' })
        this.mobileBurgerButton = page.locator('[data-qa="burger-button"]')
    }
    
    getBasketCount = async () => {
        await this.basketCounter.waitFor()
        const text = await this.basketCounter.innerText()
        return parseInt(text, 10)
        //return parseInt(this.basketCounter.innerText(), 10);
    }

    goToCheckout = async () => {
        // if mobile viewporort, click first on the burger menu
        if(!isDesktopViewport(this.page)) {
            await this.mobileBurgerButton.waitFor()
            await this.mobileBurgerButton.click()
        }
        await this.checkoutLink.waitFor()
        await this.checkoutLink.click()
        await this.page.waitForURL("/basket")
    }
}