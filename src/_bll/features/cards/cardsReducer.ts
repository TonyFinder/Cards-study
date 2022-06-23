import {
    CardParamsType,
    cardsApi,
    CardsType,
    CreateCardType,
    UpdateCardParamsType,
    updateCartType,
    UpdatedGradeCardType,
    UpdateGradeCardRequestType
} from '../../../_dal/api-PacksAndCards';
import {AppThunk} from '../../main/store';
import {changeAppLoadingStatus, setAppErrorValue, addNotification} from '../../main/appReducer';
import {LoadingStatusType} from '../../../utils/enums';
import {AxiosError} from 'axios';
import {v1} from 'uuid';


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
        sortCards: "0updated",
        page: 1,
        pageCount: 8

    }
}

export const cardsReducer = (state: initialStateCardsType = initialState, action: ActionCardsType): initialStateCardsType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS-DATA':
            return {...state, ...action.data}
        case "CARD/UPDATE-CARD-PARAMS":
            return {...state, cardParams: {...state.cardParams, ...action.params}}
        case 'CARD/UPDATE-GRADE-CARD-PARAMS':
            return {
                ...state,
                cards: state.cards.map(card => card._id === action.data.card_id
                    ? {...card, grade: action.data.grade, shots: action.data.shots}
                    : card)
            }
        default:
            return state
    }
}

// actions
export const setCards = (data: CardsType) => ({type: 'CARDS/SET-CARDS-DATA', data} as const)
export const updateCardParams = (params: UpdateCardParamsType) => ({type: "CARD/UPDATE-CARD-PARAMS", params} as const)
export const updateGradeCard = (data: UpdatedGradeCardType) => ({type: "CARD/UPDATE-GRADE-CARD-PARAMS", data} as const)

// thunks
export const setCardsTC = (): AppThunk => (dispatch, getState) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    const {cardParams} = getState().cards
    cardsApi.getCards(cardParams)
        .then(res => {
            res.data.cards.length === 0
                ? res.data.page === 1
                    ? dispatch(setCards(res.data))
                    : dispatch(updateCardParams({page: res.data.page - 1}))
                : dispatch(setCards(res.data))
        })
        .catch((err: AxiosError) => dispatch(setAppErrorValue(err.message)))
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}
export const createCardTC = (params: CreateCardType): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    cardsApi.createCard(params)
        .then(() => {
            dispatch(setCardsTC())
            dispatch(addNotification({
                type: "success",
                message: `Card "${params.question === "" ? "no question" : params.question}" has been created`,
                id: v1(),
            }))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorValue(err.message))
            dispatch(addNotification({
                type: "error",
                message: `Card "${params.question}" has not been created`,
                id: v1(),
            }))
        })
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}
export const deleteCardTC = (cardId: string, question: string): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    cardsApi.deleteCard(cardId)
        .then(() => {
            dispatch(setCardsTC())
            dispatch(addNotification({
                type: "success",
                message: `Card "${question}" has been removed`,
                id: v1(),
            }))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorValue(err.message))
            dispatch(addNotification({
                type: "success",
                message: `Card "${question}" has not been removed`,
                id: v1(),
            }))
        })
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}
export const updateCardTC = (data: updateCartType, question: string): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    cardsApi.updatedCard(data)
        .then(() => {
            dispatch(setCardsTC())
            data.question === "" ?
                dispatch(addNotification({
                    type: "error",
                    message: `Card "${question}" has not been changed`,
                    id: v1(),
                }))
                : dispatch(addNotification({
                    type: "success",
                    message: `Card "${data.question}" has been changed`,
                    id: v1(),
                }))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorValue(err.message))
            dispatch(addNotification({
                type: "error",
                message: `Card "${question}" has not been changed`,
                id: v1(),

            }))
        })
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}
export const updateGradeCardTC = (data: UpdateGradeCardRequestType): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    cardsApi.updateGradeCard(data)
        .then((res) => {
            dispatch(updateGradeCard(res.data.updatedGrade))
        })
        .catch((err: AxiosError) => dispatch(setAppErrorValue(err.message)))
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}

//type
export  type ActionCardsType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof updateCardParams>
    | ReturnType<typeof updateGradeCard>

export type initialStateCardsType = CardsType & {
    cardParams: CardParamsType
}


