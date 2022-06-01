import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

// api
export const authAPI = {
    changeNameAvatar(name: string, avatar: string) {
        return instance.put<any, ProfileChangeResponseType, {name: string, avatar: string}>('auth/me', {name, avatar})
    },
}


// types
export type AuthDataType = {
    _id: string;
    email: string;
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