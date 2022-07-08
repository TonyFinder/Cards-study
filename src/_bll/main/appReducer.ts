import {LoadingStatusType} from '../../utils/enums';
import {AppThunk} from './store';
import {authAPI} from '../../_dal/api-auth';
import {setIsLogin} from '../features/auth/authReducer';
import {NotificationType} from '../../_ui/features/modal/notification/Notification';
import {ErrorType, setProfileDataFunc} from '../../utils/functions';

let initialState: AppInitialStateType = {
    loadingStatus: LoadingStatusType.disabled,
    isInitialized: false,
    notifications: []
}

export const appReducer = (state: AppInitialStateType = initialState, action: AppActionTypes): AppInitialStateType => {
    switch (action.type) {
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
export const changeAppLoadingStatus = (loadingStatus: LoadingStatusType) => ({type: 'APP/CHANGE-LOADING-STATUS', loadingStatus} as const)
export const initializeApp = () => ({type: 'APP/INITIALIZE-APP'} as const)
export const addNotification = (payload: NotificationType) => ({type: 'APP/ADD-NOTIFICATION', payload} as const)
export const removeNotification = (id: string) => ({type: 'APP/REMOVE-NOTIFICATION', id} as const)

// thunks
export const initializeAppTC = (): AppThunk => dispatch => {
    authAPI.me()
        .then(res => setProfileDataFunc(res.data, dispatch))
        .catch((err: ErrorType) => err.response.status === 401 && dispatch(setIsLogin(false)))
        .finally(() => dispatch(initializeApp()))
}

// types
export type AppActionTypes =
    | ChangeAppLoadingStatusType
    | ReturnType<typeof initializeApp>
    | addNotificationType
    | removeNotificationType

type ChangeAppLoadingStatusType = ReturnType<typeof changeAppLoadingStatus>
type addNotificationType = ReturnType<typeof addNotification>
type removeNotificationType = ReturnType<typeof removeNotification>

export type AppInitialStateType = {
    loadingStatus: LoadingStatusType,
    isInitialized: boolean,
    notifications: NotificationType[] | []
}
