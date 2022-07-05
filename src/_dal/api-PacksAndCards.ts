import axios from "axios";


export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const packsApi = {
    getPacks(params: PackParamsType) {
        return instance.get<any, { data: PacksType }, PackParamsType>('cards/pack',
            {params: params})
    },
    createPack(data: CreatePackType) {
        return instance.post<any, PackAndCardResponseType<newPackResponseType>, { cardsPack: CreatePackType }>('cards/pack', {cardsPack: data})
    },
    deletePack(id: string) {
        return instance.delete<any, PackAndCardResponseType<deletedPackResponseType>, string>('cards/pack', {params: {id}},)
    },
    updatePack(data: UpdatePackType) {
        return instance.put<any, PackAndCardResponseType<updatedPackResponseType>, { cardsPack: UpdatePackType }>('cards/pack', {cardsPack: data})
    },
}


export const cardsApi = {
    getCards(params: CardParamsType) {
        return instance.get<any, { data: CardsType }, CardParamsType>('cards/card',
            {params: params})
    },
    createCard(data: CreateCardType) {
        return instance.post<any, PackAndCardResponseType<CardResponseType>, { card: CreateCardType }>('cards/card', {card: data})
    },
    deleteCard(id: string) {
        return instance.delete<any, PackAndCardResponseType<CardResponseType>, string>('cards/card', {params: {id}})
    },
    updatedCard(data: updateCartType) {
        return instance.put<any, PackAndCardResponseType<UpdateCardResponseType>, { card: updateCartType }>('cards/card', {card: data})
    },
    updateGradeCard(data: UpdateGradeCardRequestType) {
        return instance.put<any, UpdateGradeResponseType, UpdateGradeCardRequestType>('cards/grade', data)
    }
}


// types
export type PacksType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    error?: string

    changeSlider: boolean
    showFilters: boolean
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

export type PackAndCardResponseType<T> = {
    data: T
    token: string
    tokenDeathTime: number
}

type newPackResponseType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    deckCover: string
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}


type deletedPackResponseType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    deckCover: string
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}

export type UpdatePackType = {
    deckCover?: string
    name?: string
    _id: string
    cardPrivate?: boolean
}

export type updatedPackResponseType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    deckCover: string
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
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
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    answerImg: string
    questionImg: string
    questionVideo: string
    answerVideo: string
}

export type CardParamsType = {
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string
    min: number
    max: number
    sortCards: string
    page: number
    pageCount: number
}

export type UpdateCardParamsType = {
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

export type updateCartType = {
    _id: string
    question?: string
    answer?: string
    grade?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}
export type UpdateGradeCardRequestType = {
    grade: number
    card_id: string
}
export type UpdatedGradeCardType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
    created: string
    more_id: string
    updated: string
    __v: number
}
export type UpdateGradeResponseType = {
    data: {
        updatedGrade: UpdatedGradeCardType
    }
}

export type CardResponseType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    grade: number
    shots: number
    comments: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
    __v: number
}

export type UpdateCardResponseType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    grade: number
    shots: number
    comments: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
    __v: number
    answerImg: string
    answerVideo: string
    questionImg: string
    questionVideo: string
}