import { GetSessionToken } from "./GetToken"

export const AuthHeader = async () => {
const token = await GetSessionToken()
const headers = token? {
    authorization : `Bearer ${token}`
} : {} 
return headers
}