import {PacksType, PackParamsType, packsApi} from "../../../_dal/api-vadim";
import {AppThunk} from "../../main/store";

const initialState: PacksType = {
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
}

export const packsReducer = (state: PacksType = initialState, action: ActionPacksType): PacksType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS-DATA':
            return {...state, ...action.data}
        default:
            return state
    }
};

// actions
export const setPacks = (data: PacksType) => ({type: 'PACKS/SET-PACKS-DATA', data} as const)

// thunks
export const setPacksTC = (params: PackParamsType): AppThunk => (dispatch) => {
    packsApi.getPacks(params).then(res => {
        dispatch(setPacks(res.data))
    })
}

//type
export  type ActionPacksType =
    | ReturnType<typeof setPacks>