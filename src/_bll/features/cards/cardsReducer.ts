import {CardParamsType, cardsApi, CardsType} from "../../../_dal/api-vadim";
import {AppThunk} from "../../main/store";

const initialState: CardsType = {
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
    packUserId: "5eecf82a3ed8f700042f1186",
}

export const cardsReducer = (state: CardsType = initialState, action: ActionCardsType): CardsType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS-DATA':
            return {...state, ...action.data}
        default:
            return state
    }
};

// actions
export const setCards = (data: CardsType) => ({type: 'PACKS/SET-PACKS-DATA', data} as const)

// thunks
export const setCardsTC = (params: CardParamsType): AppThunk => (dispatch) => {
    cardsApi.getCards(params).then(res => {
        console.log('res', res)
        dispatch(setCards(res.data))
    })
}

//type
export  type ActionCardsType =
    | ReturnType<typeof setCards>