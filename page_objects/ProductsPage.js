import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.js"
import { isDesktopViewport } from "../utils/isDesktopViewport.js"


export class ProductsPage{
    // method 
    // "this" means the ProductPage class 
    constructor(page){
        this.page = page
        
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.checkoutButton = page.locator('[data-qa="desktop-nav-link"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }

    // function 
    visit = async () => {
        await this.page.goto("/")
    }


    addProductToBasket = async (index) => {
        const specificAddButton = this.addButtons.nth(index);
        await specificAddButton.waitFor();
        expect(specificAddButton).toHaveText("Add to Basket");
        const navigation = new Navigation(this.page)
        // should only run on desktop viepoet
        let basketCountBeforeAdding
        if (isDesktopViewport(this.page)){
            basketCountBeforeAdding = await navigation.getBasketCount()
        }

        await specificAddButton.click()
        expect(specificAddButton).toHaveText("Remove from Basket")
        // should only run on desktop viewport
        if (isDesktopViewport(this.page)) {
            const basketCountAfterAdding = await navigation.getBasketCount()
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
        }        
    }

    sortByChepeast = async () => {
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        const productTitlesBeforeSorting = await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption("price-asc")
        const productTitlesAfterSorting = await this.productTitle.allInnerTexts()
        expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting)
    }
}
