import axios from "axios";

export const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  // baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const registerApi = {
  register(email: string,  password: string) {
    return instance.post<any, RegisterResponseType, RegisterRequestType>("auth/register", {email, password})
  }
}

export type RegisterRequestType = {
  email: string
  password: string
}
export type RegisterResponseType = {
  data: {
    addedUser: {
      created: string
      email: string
      isAdmin: boolean
      name: string
      publicCardPacksCount: number
      rememberMe: boolean
      updated: string
      verified: boolean
      __v: number
      _id: string
    }
    error?: string
  }
}