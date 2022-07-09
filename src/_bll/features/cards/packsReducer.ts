import {CreatePackType, PackParamsType, packsApi, PacksType, UpdatePackType} from '../../../_dal/api-PacksAndCards';
import {AppThunk} from '../../main/store';
import {changeAppLoadingStatus} from '../../main/appReducer';
import {LoadingStatusType} from '../../../utils/enums';
import {
    checkErrorInCatch,
    ErrorType,
    chooseError,
    showError,
    showSuccess, toShortMessage
} from '../../../utils/functions';

const initialState: initialStatePacksType = {
    cardPacks: [
        {
            _id: "",
            user_id: "",
            user_name: "",
            name: "",
            cardsCount: 0,
            created: "",
            updated: "",
        },
    ],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 1,

    changeSlider: false,
    showFilters: false,

    packParams: {
        packName: "",
        min: 0,
        max: 0,
        sortPacks: "0updated",
        page: 1,
        pageCount: 8,
        user_id: '',
    },
}

export const packsReducer = (state: initialStatePacksType = initialState, action: ActionPacksType): initialStatePacksType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS-DATA':
            return {...state, ...action.data}
        case 'PACKS/UPDATE-PARAMS':
            return {...state, packParams: {...state.packParams, ...action.params}}
        case 'PACKS/SHOW-FILTERS':
            return {...state, showFilters: action.filter}
        default:
            return state
    }
};

// actions
export const setPacks = (data: PacksType) => ({type: 'PACKS/SET-PACKS-DATA', data} as const)
export const updatePacksParams = (params: UpdateParamsActionType) => ({type: "PACKS/UPDATE-PARAMS", params} as const)
export const setShowFilters = (filter: boolean) => ({type: "PACKS/SHOW-FILTERS", filter} as const)

// thunks
export const setPacksTC = (): AppThunk => (dispatch, getState) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    const {packParams} = getState().packs
    packsApi.getPacks(packParams)
        .then(res => {
            res.data.cardPacks.length === 0
                ? res.data.page === 1
                    ? dispatch(setPacks(res.data))
                    : dispatch(updatePacksParams({page: res.data.page - 1}))
                : dispatch(setPacks(res.data))
        })
        .catch((err: ErrorType) => checkErrorInCatch(err.response.status, chooseError(err), dispatch))
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}
export const deletePackTC = (packId: string, packName: string): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    packsApi.deletePack(packId)
        .then(() => {
            dispatch(setPacksTC())
            showSuccess(`Pack "${toShortMessage(packName, 30)}" has been removed`, dispatch)
        })
        .catch((err: ErrorType) => {
            checkErrorInCatch(err.response.status, `${chooseError(err)}. Pack "${toShortMessage(packName, 30)}" has not been removed`, dispatch)
            dispatch(changeAppLoadingStatus(LoadingStatusType.disabled))
        })
}
export const createPackTC = (data: CreatePackType): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    packsApi.createPack(data)
        .then(() => {
            dispatch(setPacksTC())
            showSuccess(`Pack "${toShortMessage(data.name, 30)}" has been created`, dispatch)
        })
        .catch((err: ErrorType) => {
            checkErrorInCatch(err.response.status, `${chooseError(err)}. Pack "${toShortMessage(data.name, 30)}" has not been created`, dispatch)
            dispatch(changeAppLoadingStatus(LoadingStatusType.disabled))
        })
}
export const updatePackTC = (data: UpdatePackType, packName: string): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    packsApi.updatePack(data)
        .then(() => {
            dispatch(setPacksTC())
            data.name === ""
                ? showError(`Pack "${toShortMessage(packName, 30)}" has not been changed`, dispatch)
                : showSuccess(`Pack "${toShortMessage(packName, 30)}" has been changed`, dispatch)
        })
        .catch((err: ErrorType) => {
            checkErrorInCatch(err.response.status, `${chooseError(err)}. Pack "${toShortMessage(packName, 30)}" has not been changed`, dispatch)
            dispatch(changeAppLoadingStatus(LoadingStatusType.disabled))
        })
}

//types
export  type ActionPacksType =
    | ReturnType<typeof setPacks>
    | ReturnType<typeof updatePacksParams>
    | ReturnType<typeof setShowFilters>

export type initialStatePacksType = PacksType & {
    packParams: PackParamsType
}
export type UpdateParamsActionType = {
    packName?: string,
    min?: number,
    max?: number,
    sortPacks?: string,
    page?: number,
    user_id?: string,
}