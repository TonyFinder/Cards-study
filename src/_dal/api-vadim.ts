import axios from "axios";
import {AuthDataType} from "./api-anton";


export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})


export const loginApi = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<any, { data: AuthDataType }, { email: string, password: string, rememberMe: boolean }>('auth/login', {
            email,
            password,
            rememberMe
        })
    },
}


export const packsApi = {
    getPacks(params: PackParamsType) {
        return instance.get<any, { data: CardPacksType }, { params: PackParamsType }>('cards/pack', {
            params: {...params}
        })
    },

    createPack(name: string, deckCover: string, cardPrivate: boolean) {
        return instance.post<any, any, { name: string, deckCover: string, cardPrivate: boolean }>('cards/pack',
            {
                name,
                deckCover,
                cardPrivate,
            })
    },

    deletePack(packId: string) {
        return instance.delete<any, any, { packId: string }>('cards/pack', {params: {packId}})

    },

    updatedPack(data: PackType) {
        return instance.put<any, any, { data: PackType }>('cards/pack', {data})
    }
}

// types

export type CardPacksType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}


export type PackType = {
    _id: string
    user_id: string
    user_name: string,
    name: string
    cardsCount: number
    created: string
    updated: string
}

export type PackParamsType = {
    packName: string,
    min: number,
    max: number,
    sortPacks: string,
    page: number,
    pageCount: number,
    userId: string,
}