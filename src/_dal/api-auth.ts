import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const instanceNeko = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

const message = `<div style="background-color: #fef2e4; color: #fd974f; padding: 15px">
     Please click on the following link for the password recovery:
      <a href='http://localhost:3000/cards-nya-front#/setPass/$token$' 
      style="color: black; text-decoration: none; font-weight: bold">RECOVERY PASSWORD</a>
      </div>`

// api
export const authAPI = {
    me() {
        return instance.post<any, MeResponseType, {}>('auth/me')
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<any, { data: AuthDataType }, { email: string, password: string, rememberMe: boolean }>('auth/login',
            {email, password, rememberMe})
    },
    logout() {
        return instance.delete<any, MeLogoutResponse, {}>('auth/me')
    },
    changeNameAvatar(name: string, avatar: string) {
        return instance.put<any, ProfileChangeResponseType, {name: string, avatar: string}>('auth/me', {name, avatar})
    }
}

export const registerApi = {
    register(email: string,  password: string) {
        return instance.post<any, RegisterResponseType, RegisterRequestType>("auth/register", {email, password})
    },
    forgot(email: string) {
        return instanceNeko.post<any, ForgotPasswordResponseType, ForgotPasswordRequestType>('auth/forgot',
            {email, from: '', message})
    },
    setPassword(password: string, resetPasswordToken: string) {
        return instance.post<any, SetPasswordResponseType, SetPasswordRequestType>("/auth/set-new-password",
            {password, resetPasswordToken})
    }
}


// types
export type AuthDataType = {
    _id: string;
    email: string;
    password?: string
    name: string;
    avatar?: string;
    publicCardPacksCount: number;

    created?: string;
    updated?: string;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;

    error?: string;
}
export type ProfileChangeResponseType = {
    data: {
        updatedUser: AuthDataType
        error?: string
    }
}
type MeResponseType = {
    data: AuthDataType
    error?: string
}
type MeLogoutResponse = {
    data: {
        info: string
    }
    error: string
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

export type SetPasswordRequestType = {
    password: string
    resetPasswordToken: string
}
export type SetPasswordResponseType = {
    data: {
        info: string
        error: string
    }
}