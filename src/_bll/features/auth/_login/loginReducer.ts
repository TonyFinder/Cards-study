let initialState: InitialStateType = {
    isLoggedIn: false
}

export const loginReducer = (state: InitialStateType = initialState, action: LoginActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_IS_LOGIN':
            return {...state, isLoggedIn: action.value}
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

// thunks


// types
export type LoginActionTypes = setIsLoginType
type InitialStateType = {
    isLoggedIn: boolean
}

export type setIsLoginType = ReturnType<typeof setIsLogin>