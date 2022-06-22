import {AppThunk} from '../../main/store';
import {authAPI, AuthDataType} from '../../../_dal/api-auth';
import {AxiosError} from 'axios';
import {AppActionTypes, changeAppLoadingStatus, setAppErrorValue, addNotification} from '../../main/appReducer';
import {setError, setIsLogin} from '../auth/_login/loginReducer';
import {LoadingStatusType} from '../../../utils/enums';
import {v1} from "uuid";

let initialState: AuthDataType = {
    _id: '',
    email: 'nya-admin@nya.nya',
    password: '1qazxcvBG',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,

    created: '',
    updated: '',
    isAdmin: false,
    verified: false,
    rememberMe: false,

    error: '',
}

export const profileReducer = (state: AuthDataType = initialState, action: ProfileActionTypes): AuthDataType => {
    switch (action.type) {
        case 'PROFILE/SET-PROFILE-DATA':
            return {...state, ...action.data}
        case 'PROFILE/CHANGE-PROFILE-DATA':
            return {...state, ...action.data}
        default:
            return state
    }
}

// actions to check
export const setProfileData = (data: AuthDataType) => ({type: 'PROFILE/SET-PROFILE-DATA', data} as const)
export const changeProfileData = (data: AuthDataType) => ({type: 'PROFILE/CHANGE-PROFILE-DATA', data} as const)

// thunks
export const setDataUserTC = (email: string, password: string, rememberMe: boolean): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    authAPI.login(email, password, rememberMe)
        .then(res => {
            dispatch(setProfileData(res.data))
            dispatch(setIsLogin(true))
        })
        .catch(err => {
            dispatch(setError(err.response.data.error))
            dispatch(addNotification({
                type: "error",
                message: `${err.response.data.error}`,
                id: v1(),
            }))
        })
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}
export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    authAPI.logout()
        .then(res => res.data.info && dispatch(setIsLogin(false)))
        .catch((err: AxiosError) => {
            dispatch(setAppErrorValue(err.message))
            dispatch(addNotification({
                type: "error",
                message: `${err.message}`,
                id: v1(),
            }))
        })
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}
export const changeProfileDataTC = (name: string, avatar: string): AppThunk => dispatch => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    authAPI.changeNameAvatar(name, avatar)
        .then(res => dispatch(changeProfileData(res.data.updatedUser)))
        .catch((err: AxiosError) => dispatch(setAppErrorValue(err.message)))
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}

// types
export type ProfileActionTypes =
    | AppActionTypes
    | ReturnType<typeof setProfileData>
    | ReturnType<typeof changeProfileData>
