import {LoadingStatusType} from '../../utils/enums';
import {
    addNotification,
    AppInitialStateType,
    appReducer,
    changeAppLoadingStatus,
    initializeApp,
    removeNotification
} from './appReducer';
import {NotificationType} from '../../_ui/features/modal/notification/Notification';

const initialState: AppInitialStateType = {
    loadingStatus: LoadingStatusType.disabled,
    isInitialized: false,
    notifications: []
}

test('CHANGE-LOADING-STATUS. Loading status have to be changed', () => {
    const endState = appReducer(initialState, changeAppLoadingStatus(LoadingStatusType.active))

    expect(initialState.loadingStatus).toBe(LoadingStatusType.disabled)
    expect(initialState.isInitialized).toBeFalsy()
    expect(initialState.notifications).toEqual([])
    expect(endState.loadingStatus).toBe(LoadingStatusType.active)
    expect(endState.isInitialized).toBeFalsy()
    expect(endState.notifications).toEqual([])
})
test('INITIALIZE-APP. APP should be initialized', () => {
    const endState = appReducer(initialState, initializeApp())

    expect(initialState.loadingStatus).toBe(LoadingStatusType.disabled)
    expect(initialState.isInitialized).toBeFalsy()
    expect(initialState.notifications).toEqual([])
    expect(endState.loadingStatus).toBe(LoadingStatusType.disabled)
    expect(endState.isInitialized).toBeTruthy()
    expect(endState.notifications).toEqual([])
})
test('ADD-NOTIFICATION. Notification have to be added', () => {
    const notification: NotificationType = {
        id: '1',
        type: 'error',
        message: 'I am notification'
    }
    const endState = appReducer(initialState, addNotification(notification))

    expect(initialState.loadingStatus).toBe(LoadingStatusType.disabled)
    expect(initialState.isInitialized).toBeFalsy()
    expect(initialState.notifications).toEqual([])
    expect(endState.loadingStatus).toBe(LoadingStatusType.disabled)
    expect(endState.isInitialized).toBeFalsy()
    expect(endState.notifications).toEqual([{
        id: '1',
        type: 'error',
        message: 'I am notification'
    }])
})
test('REMOVE-NOTIFICATION. Notification have to be removed', () => {
    const initialState: AppInitialStateType = {
        loadingStatus: LoadingStatusType.disabled,
        isInitialized: false,
        notifications: [{
            id: '1',
            type: 'error',
            message: 'I am notification'
        }]
    }
    const endState = appReducer(initialState, removeNotification('1'))

    expect(initialState.loadingStatus).toBe(LoadingStatusType.disabled)
    expect(initialState.isInitialized).toBeFalsy()
    expect(initialState.notifications).toEqual([{
        id: '1',
        type: 'error',
        message: 'I am notification'
    }])
    expect(endState.loadingStatus).toBe(LoadingStatusType.disabled)
    expect(endState.isInitialized).toBeFalsy()
    expect(endState.notifications).toEqual([])
})