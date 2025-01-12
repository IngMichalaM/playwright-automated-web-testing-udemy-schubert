import { expect } from "@playwright/test"

export class PaymentPage{

    constructor(page){
        this.page = page

        this.discoutnCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]')
        this.discoutnCodeInput = page.locator('[data-qa="discount-code-input"]')
        this.submitDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.discountedValue = page.locator('[data-qa="total-with-discount-value"]')
        this.discountMessage = page.locator('[data-qa="discount-active-message"]')
        
        this.creditCardOwner = page.locator('[data-qa="credit-card-owner"]')
        this.creditCardNumber = page.locator('[data-qa="credit-card-number"]')
        this.validUntil = page.locator('[data-qa="valid-until"]')
        this.cvc = page.locator('[data-qa="credit-card-cvc"]')
        this.payButton = page.locator('[data-qa="pay-button"]')
    }

    activateDiscount = async () => {
        await this.discoutnCode.waitFor()
        const code = await this.discoutnCode.innerText()
        await this.discoutnCodeInput.waitFor()
        await this.discoutnCodeInput.fill(code)
        await expect(this.discoutnCodeInput).toHaveValue(code)

        // discount amd discount message is not visible before clicking the button
        expect(await this.discountedValue.isVisible()).toBe(false)
        expect(await this.discountMessage.isVisible()).toBe(false)

        // activate the discount
        await this.submitDiscountButton.waitFor()
        await this.submitDiscountButton.click()
        await expect(this.discountMessage).toContainText("Discount activated!")

        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText()
        const totalValueNumber = parseInt(totalValueText.replace("$", ""), 10)
        await this.discountedValue.waitFor()
        const discountedValueText = await this.discountedValue.innerText()
        const discountedValueNumber = parseInt(discountedValueText.replace("$", ""), 10)
        await expect(discountedValueNumber).toBeLessThan(totalValueNumber)
        
    }

    fillPaymentDetails = async (paymentDetails) => {
        await this.creditCardOwner.waitFor()
        await this.creditCardOwner.fill(paymentDetails.creditCardOwner)

        await this.creditCardNumber.waitFor()
        await this.creditCardNumber.fill(paymentDetails.creditCardNumber)

        await this.validUntil.waitFor()
        await this.validUntil.fill(paymentDetails.validUntil)

        await this.cvc.waitFor()
        await this.cvc.fill(paymentDetails.cvc)

        }

    completedPayment = async () => {
        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/, {timeout: 3000})
    }
}