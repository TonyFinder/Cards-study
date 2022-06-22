import {LoadingStatusType} from '../../utils/enums';
import {AppThunk} from './store';
import {authAPI} from '../../_dal/api-auth';
import {setIsLogin} from '../features/auth/_login/loginReducer';
import {AxiosError} from 'axios';
import {setProfileData} from '../features/profile/profileReducer';
import {NotificationType} from "../../_ui/features/modal/notification/Notification";

let initialState: AppInitialStateType = {
    loadingStatus: LoadingStatusType.disabled,
    errorServer: null,
    isInitialized: false,
    notifications: []
}

export const appReducer = (state: AppInitialStateType = initialState, action: AppActionTypes): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-ERROR':
            return {...state, errorServer: action.errorServer}
        case 'APP/CHANGE-LOADING-STATUS':
            return {...state, loadingStatus: action.loadingStatus}
        case 'APP/INITIALIZE-APP':
            return {...state, isInitialized: true}
        case "APP/ADD-NOTIFICATION":
            return {...state, notifications: [{...action.payload}, ...state.notifications]}
        case "APP/REMOVE-NOTIFICATION":
            return {...state, notifications: state.notifications.filter(f => f.id !== action.id)}
        default:
            return state
    }
}

// actions
export const setAppErrorValue = (errorServer: NullPossibleType<string>) => ({
    type: 'APP/SET-ERROR',
    errorServer
} as const)
export const changeAppLoadingStatus = (loadingStatus: LoadingStatusType) => ({
    type: 'APP/CHANGE-LOADING-STATUS',
    loadingStatus
} as const)
export const initializeApp = () => ({type: 'APP/INITIALIZE-APP'} as const)
export const addNotification = (payload: NotificationType) => ({type: 'APP/ADD-NOTIFICATION', payload} as const)
export const removeNotification = (id: string) => ({type: 'APP/REMOVE-NOTIFICATION', id} as const)


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
export type AppActionTypes =
    | SetAppErrorValueType
    | ChangeAppLoadingStatusType
    | ReturnType<typeof initializeApp>
    | addNotificationType
    | removeNotificationType

type SetAppErrorValueType = ReturnType<typeof setAppErrorValue>
type ChangeAppLoadingStatusType = ReturnType<typeof changeAppLoadingStatus>
type addNotificationType = ReturnType<typeof addNotification>
type removeNotificationType = ReturnType<typeof removeNotification>

export type AppInitialStateType = {
    loadingStatus: LoadingStatusType,
    errorServer: NullPossibleType<string>,
    isInitialized: boolean,
    notifications: NotificationType[] | []
}

export type NullPossibleType<T> = null | T

