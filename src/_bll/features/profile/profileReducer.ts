import {Dispatch} from "redux";
import {loginApi} from "../../../api";
import {setIsLogin} from "../auth/_login/loginReducer";

let initialState: InitialStateTypeProfile = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
// количество колод

    created: '',
    updated: '',
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: false,

    error: '',
}

export const profileReducer = (state: InitialStateTypeProfile = initialState, action: ProfileActionTypes): InitialStateTypeProfile => {
    switch (action.type) {
        case 'SET_DATA_USER':
            return {...state, ...action.data}
        default:
            return state
    }
}


// actions
const setDataUsers = (data: InitialStateTypeProfile) => {
    return {
        type: 'SET_DATA_USER',
        data,
    } as const
}

// thunks
export const setDataUser = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    loginApi.login(email, password, rememberMe).then(res => {
        dispatch(setDataUsers(res.data))
        dispatch(setIsLogin(true))
    })
}

// types

export type ProfileActionTypes = setDataUsersType
export type InitialStateTypeProfile = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
// количество колод

    created: string
    updated: string
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean

    error?: string
}

export type setDataUsersType = ReturnType<typeof setDataUsers>