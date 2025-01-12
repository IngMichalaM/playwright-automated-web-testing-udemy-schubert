import * as nodeFetch from "node-fetch"
import { adminDetails } from "../data/userDetails.js"

export const getLoginToken = async () => {
    const response = await nodeFetch("http://localhost:2221/api/login", {
        method: "POST",
        body: JSON.stringify({"username":adminDetails.username,"password":adminDetails.password}),
    })
    if (response.status !== 200){
        throw new Error("An error occured trying to retrieve the login token.")
    }
    const body = await response.json()
    return body.token
}