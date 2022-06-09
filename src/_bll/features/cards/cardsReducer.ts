import {CardParamsType, cardsApi, CardsType} from "../../../_dal/api-vadim";
import {AppThunk} from "../../main/store";

export type initialStateCardsType = CardsType & {
    cardParams: CardParamsType
}


const initialState: initialStateCardsType = {
    cards: [
        {
            answer: "no answer",
            question: "no question",
            cardsPack_id: "5eb6a2f72f849402d46c6ac4",
            grade: 4.987525071790364,
            shots: 1,
            user_id: "142151531535151",
            created: "2020-05-13T11:05:44.867Z",
            updated: "2020-05-13T11:05:44.867Z",
            _id: "5ebbd48876810f1ad0e7ece3",
        },
    ],
    cardsTotalCount: 3,
    maxGrade: 4.987525071790364,
    minGrade: 2.0100984354076568,
    page: 1,
    pageCount: 4,
    packUserId: "",

    cardParams: {
        cardAnswer: "",
        cardQuestion: "",
        cardsPack_id: "",
        min: 0,
        max: 0,
        sortCards: "0grade",
        page: 1,
        pageCount: 7
    }
}


export const cardsReducer = (state: initialStateCardsType = initialState, action: ActionCardsType): initialStateCardsType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS-DATA':
            return {...state, ...action.data}
        case 'CARDS/SET-CARD-QUESTION-AND-ANSWER':
            return {
                ...state,
                cardParams: {...state.cardParams, cardQuestion: action.data[0], cardAnswer: action.data[1]}
            }
        case "CARDS/SET-CURRENT-PAGE-CARDS":
            return {...state, cardParams: {...state.cardParams, page: action.data}}
        default:
            return state
    }
};

// actions
export const setCards = (data: CardsType) => ({type: 'CARDS/SET-CARDS-DATA', data} as const)
export const setCardQuestionAndAnswer = (data: string[]) => ({
    type: 'CARDS/SET-CARD-QUESTION-AND-ANSWER',
    data
} as const)
export const setCurrentPageCards = (data: number) => ({
    type: 'CARDS/SET-CURRENT-PAGE-CARDS',
    data,
} as const)

// thunks
export const setCardsTC = (params: CardParamsType): AppThunk => (dispatch, getState) => {
    const {cardParams} = getState().cards
    cardsApi.getCards({...cardParams, ...params}).then(res => {
        dispatch(setCards(res.data))
    })
}

//type
export  type ActionCardsType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof setCardQuestionAndAnswer>
    | ReturnType<typeof setCurrentPageCards>