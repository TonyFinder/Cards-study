import {PacksType, PackParamsType, packsApi} from "../../../_dal/api-vadim";
import {AppThunk} from "../../main/store";

export type initialStatePacksType = PacksType & {
    packParams: PackParamsType
}


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
        userId: "",
    },
}

export const packsReducer = (state: initialStatePacksType = initialState, action: ActionPacksType): initialStatePacksType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS-DATA':
            return {...state, ...action.data}
        case 'PACKS/SET-MIN-MAX-CARDS-COUNT-DATA':
            return {...state, packParams: {...state.packParams, min: action.data[0], max: action.data[1]}}
        case 'PACKS/SET-PACK-NAME':
            return {...state, packParams: {...state.packParams, packName: action.name}}
        case 'PACKS/SET-CURRENT-PAGE':
            return {...state, packParams: {...state.packParams, page: action.data}}
        default:
            return state
    }
};

// actions
export const setPacks = (data: PacksType) => ({type: 'PACKS/SET-PACKS-DATA', data} as const)
export const setPackName = (name: string) => ({type: "PACKS/SET-PACK-NAME", name} as const)

export const setMinMaxCardsCount = (data: number[]) => ({
    type: 'PACKS/SET-MIN-MAX-CARDS-COUNT-DATA',
    data
} as const)

export const setCurrentPage = (data: number) => ({
    type: 'PACKS/SET-CURRENT-PAGE',
    data,
} as const)


/*const setPacksFromInput = (data: string) => ({type: "SET-PACKS-FROM-INPUT", data} as const)*/

// thunks
export const setPacksTC = (): AppThunk => (dispatch, getState) => {
    const {packParams} = getState().packs
    packsApi.getPacks(packParams).then(res => {
        dispatch(setPacks(res.data))
    })
}
//Олега
/*export const setPacksTC =
    (params: PackParamsType): AppThunk =>
        (dispatch, getState) => {
            let packame = getState().pack.cardPacks[0].name;
            packsApi.getPacks(params).then((res) => {
                dispatch(setPacks(res.data));
            });
        };*/

//type
export  type ActionPacksType =
    | ReturnType<typeof setPacks>
    | ReturnType<typeof setPackName>
    | ReturnType<typeof setMinMaxCardsCount>
    | ReturnType<typeof setCurrentPage>
