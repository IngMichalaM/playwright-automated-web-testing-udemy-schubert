import { expect } from "@playwright/test"

export class Checkout{

    constructor(page){
        this.page = page

        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.checkoutButton = page.locator('[data-qa="continue-to-checkout"]')
    }

    removeChepeastProduct = async () => {
        await this.basketCards.first().waitFor()
        const itemsBeforeRemoval = await this.basketCards.count() // for the assertion
        await this.basketItemPrice.first().waitFor()
        const allPriceTexts = await this.basketItemPrice.allInnerTexts()
        const justNumbers = allPriceTexts.map((element) => {
            const withoutDollarSign = element.replace("$", "")
            return parseInt(withoutDollarSign, 10) // [ 499, 599, 320 ]  
        })
        
        const smallestPrice = Math.min(...justNumbers)
        const smallestPriceIndex = justNumbers.indexOf(smallestPrice)
        const specificRemoveButton = this.basketItemRemoveButton.nth(smallestPriceIndex)
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()

        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval-1)
    }

    continueToCheckout = async () => {
        await this.checkoutButton.waitFor()
        await this.checkoutButton.click()
        await this.page.waitForURL(/login/, {timeout: 3000}) // check the target url, fail quick
    }
}