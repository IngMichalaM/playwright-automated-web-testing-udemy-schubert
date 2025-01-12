import * as dotenv from "dotenv"

// Will run globally before all tests files.
// See globalSetup in the playwright.config
// Handle the secrets and credentials
export default () => {
    dotenv.config()
}