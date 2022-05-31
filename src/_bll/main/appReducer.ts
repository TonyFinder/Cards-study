
let initialState = {
    errorServer: null as NullPossibleType<string>
}

export const appReducer = (state: AppInitialStateType = initialState, action: AppActionTypes): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-ERROR':
            return {...state, errorServer: action.errorServer}
        default:
            return state
    }
}

// actions
export const setAppErrorValueAC = (errorServer: NullPossibleType<string>) => ({type: 'APP/SET-ERROR', errorServer} as const)

// thunks

// types
export type AppActionTypes = SetAppErrorValueType
type SetAppErrorValueType = ReturnType<typeof setAppErrorValueAC>

type AppInitialStateType = typeof initialState
export type NullPossibleType<T> = null | T

