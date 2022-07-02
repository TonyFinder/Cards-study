import {AppThunk} from '../../main/store';
import {addNotification, changeAppLoadingStatus} from '../../main/appReducer';
import {LoadingStatusType} from '../../../utils/enums';
import {registerApi} from '../../../_dal/api-auth';
import {v1} from 'uuid';

let initialAuthState = {
    isLoggedIn: false,
    isRegistered: false,
    isRedirect: false,
    info: "",
}

export const authReducer = (state: AuthInitialStateType = initialAuthState, action: AuthActionTypes): AuthInitialStateType => {
    switch (action.type) {
        case 'AUTH/SET_IS_LOGIN':
            return {...state, isLoggedIn: action.value}
        case 'AUTH/REGISTER':
            return {...state, isRegistered: action.isRegistered}
        case 'AUTH/REDIRECT-TO-CHECK-EMAIL':
            return {...state, isRedirect: true}
        case 'AUTH/SET-PASSWORD-SUCCESS':
            return {...state, info: action.info}
        default:
            return state
    }
}

// actions
export const setIsLogin = (value: boolean) => ({type: 'AUTH/SET_IS_LOGIN', value} as const)
export const register = (isRegistered: boolean) => ({type: "AUTH/REGISTER", isRegistered} as const)
export const redirectToCheckEmail = () => ({type: "AUTH/REDIRECT-TO-CHECK-EMAIL"} as const)
const setPasswordSuccess = (info: string) => ({type: "AUTH/SET-PASSWORD-SUCCESS", info} as const)

// thunks
export const requestRegistrationTC = (email: string, password: string): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    registerApi.register({email, password})
        .then(() => dispatch(register(true)))
        .catch(err => {
            dispatch(addNotification({
                type: "error",
                message: `${err.response.data.error}`,
                id: v1(),
            }))
        })
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}
export const requestPasswordTC = (email: string): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    registerApi.forgot(email)
        .then(() => dispatch(redirectToCheckEmail()))
        .catch(err => {
            dispatch(addNotification({
                type: "error",
                message: `${err.response.data.error}`,
                id: v1(),
            }))
        })
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}
export const setNewPasswordTC = (password: string, resetPasswordToken: string): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    registerApi.setPassword({password, resetPasswordToken})
        .then(res => res.data.info && dispatch(setPasswordSuccess(res.data.info)))
        .catch(err => {
            dispatch(addNotification({
                type: "error",
                message: `${err.response.data.error}`,
                id: v1(),
            }))
        })
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}

// types
export type AuthInitialStateType = typeof initialAuthState
export type AuthActionTypes =
    | ReturnType<typeof setIsLogin>
    | ReturnType<typeof register>
    | ReturnType<typeof redirectToCheckEmail>
    | ReturnType<typeof setPasswordSuccess>
