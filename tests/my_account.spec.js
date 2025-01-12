import { test } from "@playwright/test"
import { MyAccountPage } from "../page_objects/MyAccountPage"
import { getLoginToken } from "../api-calls/getLoginToken"

test("My account using cooke injection", async ({page}) => {
    // Make a request to get login token
    const loginToken = await getLoginToken()
    // Inject the login token into the browser 
    const myAccount = new MyAccountPage(page)   
    await myAccount.visit()

    // evaluate js on the webpage (injection the login token to cookie)
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        // when passing outside variable into the function using evaluate
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])
    await myAccount.visit()
    await myAccount.waitForPageHeading()
})