let initialState: loginInitialStateType = {
    isLoggedIn: false,
    error: "",
    userId: ''
}

export const loginReducer = (state: loginInitialStateType = initialState, action: LoginActionTypes): loginInitialStateType => {
    switch (action.type) {
        case 'SET_IS_LOGIN':
            return {...state, isLoggedIn: action.value}
        case "SET_ERROR":
            return {...state, error: action.value}
        case 'LOGIN/SET-USER-ID':
            return {...state, userId: action.userID}
        default:
            return state
    }
}


// actions
export const setIsLogin = (value: boolean) => {
    return {
        type: 'SET_IS_LOGIN',
        value,
    } as const
}
export const setError = (value: string) => {
    return {
        type: 'SET_ERROR',
        value,
    } as const
}
export const setUserId = (userID: string) => ({type: 'LOGIN/SET-USER-ID', userID} as const)
// thunks


// types
export type LoginActionTypes = setIsLoginType | setErrorType | SetUserIdType

export type loginInitialStateType = {
    isLoggedIn: boolean
    error: null | string,
    userId: string
}

export type setIsLoginType = ReturnType<typeof setIsLogin>
export type setErrorType = ReturnType<typeof setError>
export type SetUserIdType = ReturnType<typeof setUserId>