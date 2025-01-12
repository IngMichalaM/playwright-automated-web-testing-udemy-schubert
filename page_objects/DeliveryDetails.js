import { expect } from "@playwright/test"

export class DeliveryDetails{

    constructor(page){
        this.page = page

        this.firstNameInput = page.getByPlaceholder('First name')
        this.lastNameInput = page.getByPlaceholder('Last name')
        this.streetInput = page.getByPlaceholder('Street')
        this.cityInput = page.getByPlaceholder('City')
        this.postcodeInput = page.locator('[data-qa="delivery-postcode"]')
        this.dropDownCountry = page.getByRole('combobox') // locator('[data-qa="country-dropdown"]') 
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')
        
        this.saveAddressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.saveAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.saveAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.saveAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.saveAddressPostcode = page.locator('[data-qa="saved-address-postcode"]')
        this.saveAddressCountry = page.locator('[data-qa="saved-address-country"]')

        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' })
        
    }

    fillDetails = async (userAddress) => {
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(userAddress.firstName)
        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill(userAddress.lastName)
        await this.streetInput.waitFor()
        await this.streetInput.fill(userAddress.street)
        await this.postcodeInput.waitFor()
        await this.postcodeInput.fill(userAddress.postcode)
        await this.dropDownCountry.waitFor()
        await this.dropDownCountry.selectOption(userAddress.country)
        await this.cityInput.waitFor()
        await this.cityInput.fill(userAddress.city)
    }

    saveDetails = async () => {
        const addressCountBefore = await this.savedAddressContainer.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await expect(this.savedAddressContainer).toHaveCount(addressCountBefore + 1)
        expect(await this.saveAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())
        expect(await this.saveAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue())
        expect(await this.saveAddressStreet.first().innerText()).toBe(await this.streetInput.inputValue())
        expect(await this.saveAddressCity.first().innerText()).toBe(await this.cityInput.inputValue())
        expect(await this.saveAddressPostcode.first().innerText()).toBe(await this.postcodeInput.inputValue())
        expect(await this.saveAddressCountry.first().innerText()).toBe(await this.dropDownCountry.inputValue())
    }

    continueToPayment = async () => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, {timeout: 3000})
    }
}