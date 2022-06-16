let initialState: LoginInitialStateType = {
    isLoggedIn: false,
    error: "",
}

export const loginReducer = (state: LoginInitialStateType = initialState, action: LoginActionTypes): LoginInitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET_IS_LOGIN':
            return {...state, isLoggedIn: action.value}
        case "LOGIN/SET_ERROR":
            return {...state, error: action.value}
        default:
            return state
    }
}


// actions
export const setIsLogin = (value: boolean) => ({type: 'LOGIN/SET_IS_LOGIN', value} as const)
export const setError = (value: string) => ({type: 'LOGIN/SET_ERROR', value} as const)

// thunks

// types
export type LoginActionTypes = setIsLoginType | setErrorType

export type LoginInitialStateType = {
    isLoggedIn: boolean
    error: null | string,
}

export type setIsLoginType = ReturnType<typeof setIsLogin>
export type setErrorType = ReturnType<typeof setError>
