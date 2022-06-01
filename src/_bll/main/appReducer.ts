import {LoadingStatusType} from '../../utils/enums';

let initialState = {
    loadingStatus: LoadingStatusType.disabled,
    errorServer: null as NullPossibleType<string>,
}

export const appReducer = (state: AppInitialStateType = initialState, action: AppActionTypes): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-ERROR':
            return {...state, errorServer: action.errorServer}
        case 'APP/CHANGE-LOADING-STATUS':
            return {...state, loadingStatus: action.loadingStatus}
        default:
            return state
    }
}

// actions
export const setAppErrorValueAC = (errorServer: NullPossibleType<string>) => ({type: 'APP/SET-ERROR', errorServer} as const)
export const changeAppLoadingStatusAC = (loadingStatus: LoadingStatusType) => ({type: 'APP/CHANGE-LOADING-STATUS', loadingStatus} as const)

// thunks

// types
export type AppActionTypes = SetAppErrorValueType | ChangeAppLoadingStatusType
type SetAppErrorValueType = ReturnType<typeof setAppErrorValueAC>
type ChangeAppLoadingStatusType = ReturnType<typeof changeAppLoadingStatusAC>

type AppInitialStateType = typeof initialState
export type NullPossibleType<T> = null | T

