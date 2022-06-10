import {PackParamsType, packsApi, PacksType} from '../../../_dal/api-vadim';
import {AppThunk} from '../../main/store';
import {changeAppLoadingStatus, setAppErrorValue} from '../../main/appReducer';
import {LoadingStatusType} from '../../../utils/enums';
import {AxiosError} from 'axios';

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
    cardPacksTotalCount: 100,
    maxCardsCount: 100,
    minCardsCount: 0,
    page: 1,
    pageCount: 1,

    packParams: {
        packName: "",
        min: 0,
        max: 120,
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
        default:
            return state
    }
};

// actions
export const setPacks = (data: PacksType) => ({type: 'PACKS/SET-PACKS-DATA', data} as const)
export const updateParams = (params: UpdateParamsActionType) => ({type: "PACKS/UPDATE-PARAMS", params} as const)

// thunks
export const setPacksTC = (): AppThunk => (dispatch, getState) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    const {packParams} = getState().packs
    packsApi.getPacks(packParams)
        .then(res => dispatch(setPacks(res.data)))
        .catch((err: AxiosError) => dispatch(setAppErrorValue(err.message)))
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}

//types
export  type ActionPacksType =
    | ReturnType<typeof setPacks>
    | ReturnType<typeof updateParams>
export type initialStatePacksType = PacksType & {
    packParams: PackParamsType
}
type UpdateParamsActionType = {
    packName?: string,
    min?: number,
    max?: number,
    sortPacks?: string,
    page?: number,
    user_id?: string
}