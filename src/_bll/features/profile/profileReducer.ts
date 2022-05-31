import {AppThunk} from '../../main/store';
import {authAPI, AuthDataType, ProfileChangeResponseType} from '../../../_dal/api-profile';
import {AxiosError} from 'axios';
import {AppActionTypes, setAppErrorValueAC} from '../../main/appReducer';

/*let initialState: AuthDataType = {
    _id: '1ab',
    email: 'anton@gmail.com',
    name: 'Anton',
    avatar: 'http://amintl.com.pk/wp-content/uploads/2019/11/avatar3.png',
    publicCardPacksCount: 5,

    isAdmin: false,
    verified: true,
    rememberMe: true,

    error: '',
}*/
let initialState: AuthDataType = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,

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
            return {...state, ...action.data.updatedUser, error: action.data.error}
        default:
            return state
    }
}

// actions
export const setProfileDataAC = (data: AuthDataType) => ({type: 'PROFILE/SET-PROFILE-DATA', data} as const)
export const changeProfileDataAC = (data: ProfileChangeResponseType) => ({type: 'PROFILE/CHANGE-PROFILE-DATA', data} as const)

// thunks
export const setProfileDataTC = (): AppThunk => dispatch => {
    authAPI.checkCookie()
        .then(res => dispatch(setProfileDataAC(res.data)))
        .catch((err: AxiosError) => dispatch(setAppErrorValueAC(err.message)))
}
export const changeProfileDataTC = (name: string, avatar: string): AppThunk => dispatch => {
    authAPI.changeNameAvatar(name, avatar)
        .then(res => dispatch(changeProfileDataAC(res)))
        .catch((err: AxiosError) => dispatch(setAppErrorValueAC(err.message)))
}

// types
export type ProfileActionTypes =
    | AppActionTypes
    | ReturnType<typeof setProfileDataAC>
    | ReturnType<typeof changeProfileDataAC>
