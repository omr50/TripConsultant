import { apiClient } from "./ApiClient"

// export const executeBasicAuthenticationService = (token)=> apiClient.get(`/login`, {
//     headers: {
//         Authorization: token
//     }
// })

export const executeJwtAuthenticationService = async (username: String, password: String)=> {
  console.log('sending request with:', {username, password})
  return await apiClient.post(`/login`, {username, password})
}

export const signUpService = (username: String, password: String, email: String, alias: String)=> apiClient.post(`/signup`, {email, username, password, alias})