import {AppThunk} from '../../main/store';
import {authAPI, AuthDataType} from '../../../_dal/api-auth';
import {AppActionTypes, changeAppLoadingStatus} from '../../main/appReducer';
import {setIsLogin} from '../auth/authReducer';
import {LoadingStatusType} from '../../../utils/enums';
import {
    checkErrorInCatch,
    ErrorType,
    chooseError,
    setProfileDataFunc,
    showError
} from '../../../utils/functions';

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
    authAPI.login({email, password, rememberMe})
        .then(res => setProfileDataFunc(res.data, dispatch))
        .catch((err: ErrorType) => showError(chooseError(err), dispatch))
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}
export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    authAPI.logout()
        .then(res => res.data.info && dispatch(setIsLogin(false)))
        .catch((err: ErrorType) => checkErrorInCatch(err.response.status, chooseError(err), dispatch))
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}
export const changeProfileDataTC = (name: string, avatar: string): AppThunk => dispatch => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    authAPI.changeNameAvatar({name, avatar})
        .then(res => dispatch(changeProfileData(res.data.updatedUser)))
        .catch((err: ErrorType) => checkErrorInCatch(err.response.status, chooseError(err), dispatch))
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}

// types
export type ProfileActionTypes =
    | AppActionTypes
    | ReturnType<typeof setProfileData>
    | ReturnType<typeof changeProfileData>
