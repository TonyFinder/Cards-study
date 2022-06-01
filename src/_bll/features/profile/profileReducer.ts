import {AppThunk} from '../../main/store';
import {authAPI, AuthDataType} from '../../../_dal/api-profile';
import {AxiosError} from 'axios';
import {AppActionTypes, changeAppLoadingStatusAC, setAppErrorValueAC} from '../../main/appReducer';
import {loginApi} from '../../../_dal/api-login';
import {setError, setIsLogin} from '../auth/_login/loginReducer';
import {LoadingStatusType} from '../../../utils/enums';

let initialState: AuthDataType = {
    _id: '',
    email: '',
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
export const setProfileDataAC = (data: AuthDataType) => ({type: 'PROFILE/SET-PROFILE-DATA', data} as const)
export const changeProfileDataAC = (data: AuthDataType) => ({type: 'PROFILE/CHANGE-PROFILE-DATA', data} as const)

// thunks
export const setDataUser = (email: string, password: string, rememberMe: boolean): AppThunk => (dispatch) => {
    loginApi.login(email, password, rememberMe).then(res => {
        dispatch(setProfileDataAC(res.data))
        dispatch(setIsLogin(true))
    }).catch(err => {
        console.log("error", {...err})
        dispatch(setError(err.response.data.error))
    })
}
export const changeProfileDataTC = (name: string, avatar: string): AppThunk => dispatch => {
    dispatch(changeAppLoadingStatusAC(LoadingStatusType.active))
    authAPI.changeNameAvatar(name, avatar)
        .then(res => {
            dispatch(changeProfileDataAC(res.data.updatedUser))
        })
        .catch((err: AxiosError) => dispatch(setAppErrorValueAC(err.message)))
        .finally(() => dispatch(changeAppLoadingStatusAC(LoadingStatusType.disabled)))
}

// types
export type ProfileActionTypes =
    | AppActionTypes
    | ReturnType<typeof setProfileDataAC>
    | ReturnType<typeof changeProfileDataAC>
