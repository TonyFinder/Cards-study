import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});

const message = `<div style="background-color: #fef2e4; color: #fd974f; padding: 15px">
     Please click on the following link for the password recovery:
      <a href='http://localhost:3000/cards-nya-front#/setPass/$token$' 
      style="color: black; text-decoration: none; font-weight: bold">RECOVERY PASSWORD</a>
      </div>`

export const forgotApi = {
    forgot(email: string) {
        return instance.post<any, ForgotPasswordResponseType, ForgotPasswordRequestType>('auth/forgot', {email, from: '', message})
    }
}

export type ForgotPasswordRequestType = {
    email: string
    from: string
    message: string
}
export type ForgotPasswordResponseType = {
    data: {
        answer: boolean
        html: boolean
        info: string
        success: boolean
    }
}
