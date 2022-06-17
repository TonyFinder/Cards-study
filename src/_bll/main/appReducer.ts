import {LoadingStatusType} from '../../utils/enums';
import {AppThunk} from './store';
import {authAPI} from '../../_dal/api-auth';
import {setIsLogin} from '../features/auth/_login/loginReducer';
import {AxiosError} from 'axios';
import {setProfileData} from '../features/profile/profileReducer';

let initialState = {
    loadingStatus: LoadingStatusType.disabled,
    errorServer: null as NullPossibleType<string>,
    isInitialized: false
}

export const appReducer = (state: AppInitialStateType = initialState, action: AppActionTypes): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-ERROR':
            return {...state, errorServer: action.errorServer}
        case 'APP/CHANGE-LOADING-STATUS':
            return {...state, loadingStatus: action.loadingStatus}
        case 'APP/INITIALIZE-APP':
            return {...state, isInitialized: true}
        default:
            return state
    }
}

// actions
export const setAppErrorValue = (errorServer: NullPossibleType<string>) => ({type: 'APP/SET-ERROR', errorServer} as const)
export const changeAppLoadingStatus = (loadingStatus: LoadingStatusType) => ({type: 'APP/CHANGE-LOADING-STATUS', loadingStatus} as const)
export const initializeApp = () => ({type: 'APP/INITIALIZE-APP'} as const)


// thunks
export const initializeAppTC = (): AppThunk => dispatch => {
    authAPI.me()
        .then(res => {
            if (res.error) {
                dispatch(setIsLogin(false))
            } else {
                dispatch(setIsLogin(true))
                dispatch(setProfileData(res.data))
            }
        })
        .catch((err: AxiosError) => dispatch(setAppErrorValue(err.message)))
        .finally(() => dispatch(initializeApp()))
}

// types
export type AppActionTypes = SetAppErrorValueType | ChangeAppLoadingStatusType | ReturnType<typeof initializeApp>
type SetAppErrorValueType = ReturnType<typeof setAppErrorValue>
type ChangeAppLoadingStatusType = ReturnType<typeof changeAppLoadingStatus>

export type AppInitialStateType = typeof initialState
export type NullPossibleType<T> = null | T

