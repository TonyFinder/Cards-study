import {AppThunk} from '../../main/store';
import {changeAppLoadingStatus} from '../../main/appReducer';
import {LoadingStatusType} from '../../../utils/enums';
import {registerApi} from '../../../_dal/api-auth';
import {showError} from '../../../utils/functions';

let initialAuthState = {
    isLoggedIn: false,
    isRegistered: false,
    isRedirect: false,
    isNewPasswordSet: false,
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
            return {...state, isNewPasswordSet: action.isNewPasswordSet}
        default:
            return state
    }
}

// actions
export const setIsLogin = (value: boolean) => ({type: 'AUTH/SET_IS_LOGIN', value} as const)
export const register = (isRegistered: boolean) => ({type: "AUTH/REGISTER", isRegistered} as const)
export const redirectToCheckEmail = () => ({type: "AUTH/REDIRECT-TO-CHECK-EMAIL"} as const)
export const setPasswordSuccess = (isNewPasswordSet: boolean) => ({type: "AUTH/SET-PASSWORD-SUCCESS", isNewPasswordSet} as const)

// thunks
export const requestRegistrationTC = (email: string, password: string): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    registerApi.register({email, password})
        .then(() => dispatch(register(true)))
        .catch(err => showError(err.response.data ? err.response.data.error : err.message, dispatch))
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}
export const requestPasswordTC = (email: string): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    registerApi.forgot(email)
        .then(() => dispatch(redirectToCheckEmail()))
        .catch(err => showError(err.response.data ? err.response.data.error : err.message, dispatch))
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}
export const setNewPasswordTC = (password: string, resetPasswordToken: string): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    registerApi.setPassword({password, resetPasswordToken})
        .then(res => res.data.info && dispatch(setPasswordSuccess(true)))
        .catch(err => showError(err.response.data ? err.response.data.error : err.message, dispatch))
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}

// types
export type AuthInitialStateType = typeof initialAuthState
export type AuthActionTypes =
    | ReturnType<typeof setIsLogin>
    | ReturnType<typeof register>
    | ReturnType<typeof redirectToCheckEmail>
    | ReturnType<typeof setPasswordSuccess>
