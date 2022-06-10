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
        return instance.get<any, { data: PacksType }, { params: PackParamsType }>('cards/pack', {
            params: {...params}
        })
    },

    createPack(data: CreatePackType) {
        return instance.post<any, any, CreatePackType>('cards/pack',
            {
                ...data
            })
    },

    deletePack(packId: string) {
        return instance.delete<any, any, { packId: string }>('cards/pack', {params: {packId}})

    },

    updatedPack(data: PackType) {
        return instance.put<any, any, { data: PackType }>('cards/pack', {data})
    },
}


export const cardsApi = {
    getCards(params: CardParamsType) {
        return instance.get<any, { data: CardsType }, { params: CardParamsType }>('cards/card',
            {
                params: {...params}
            })
    },

    createCard(data: CreateCardType) {
        return instance.post<any, any, CreateCardType>('cards/card',
            {...data})
    },

    deleteCard(cardId: string) {
        return instance.delete<any, any, { cardId: string }>('cards/card', {params: {cardId}})
    },

    updatedCard(data: CardType) {
        return instance.put<any, any, { data: CardType }>('cards/card', {data})
    },
}


// types
export type PacksType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type PackType = {
    _id: string
    user_id?: string
    user_name?: string,
    name?: string
    cardsCount?: number
    created?: string
    updated?: string
}

export type PackParamsType = {
    packName?: string,
    min?: number,
    max?: number,
    sortPacks?: string,
    page?: number,
    pageCount?: number,
    user_id?: string,
}

export type CreatePackType = {
    name?: string
    deckCover?: string
    cardPrivate?: boolean
}

export type CardsType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}


export type CardType = {
    _id: string
    answer?: string
    question?: string
    cardsPack_id?: string
    grade?: number
    shots?: number
    user_id?: string
    created?: string
    updated?: string
}

export type CardParamsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export type CreateCardType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}