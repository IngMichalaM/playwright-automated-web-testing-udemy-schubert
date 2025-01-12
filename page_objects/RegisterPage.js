import { expect } from "@playwright/test"

export class RegisterPage{

    constructor(page){
        this.page = page

        this.emailInput = page.getByPlaceholder('E-Mail')
        this.passwordInput = page.getByPlaceholder('Password')
        this.registerButton = page.getByRole('button', { name: 'Register' })
        this.existingUserError = page.locator('[data-qa="error-message"]')
    }
    
    signUpAsExistingUser = async () => {
        // type into email input
        await this.emailInput.waitFor()
        await this.emailInput.fill("testing_testemail@seznam.cz")
        // type into password input 
        await this.passwordInput.waitFor()
        await this.passwordInput.fill("secretpassword")
        // click register button
        await this.registerButton.waitFor()
        await this.registerButton.click()

        // check error message
        await this.existingUserError.waitFor()
        expect(this.existingUserError).toHaveText('A user with the e-mail address "testing_testemail@seznam.cz" already exists.')
    }

    signUpAsNewUser = async (email, password) => {
        await this.emailInput.waitFor()
        await this.emailInput.fill(email)
        await this.passwordInput.waitFor()
        await this.passwordInput.fill(password)
        await this.registerButton.waitFor()
        await this.registerButton.click()
        await this.page.waitForURL(/\/delivery-details/, {timeout: 3000})
    }
}