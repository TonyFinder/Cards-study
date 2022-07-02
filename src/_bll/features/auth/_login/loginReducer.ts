let initialLoginState = {
    isLoggedIn: false,
}

export const loginReducer = (state: LoginInitialStateType = initialLoginState, action: LoginActionTypes): LoginInitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET_IS_LOGIN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

// actions
export const setIsLogin = (value: boolean) => ({type: 'LOGIN/SET_IS_LOGIN', value} as const)

// thunks

// types
export type LoginActionTypes = setIsLoginType

export type LoginInitialStateType = typeof initialLoginState

export type setIsLoginType = ReturnType<typeof setIsLogin>