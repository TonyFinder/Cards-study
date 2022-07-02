import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AuthActionTypes, authReducer} from '../features/auth/authReducer';
import {ProfileActionTypes, profileReducer} from '../features/profile/profileReducer';
import {appReducer} from './appReducer';
import {ActionPacksType, packsReducer} from '../features/cards/packsReducer';
import {ActionCardsType, cardsReducer} from '../features/cards/cardsReducer';

let rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    packs: packsReducer,
    cards: cardsReducer,
})

export let store = createStore(rootReducer, applyMiddleware(thunk))

export const useCustomSelector: TypedUseSelectorHook<AppStateRootType> = useSelector
export const useAppDispatch = () => useDispatch<ThunkDispatch<AppStateRootType, unknown, RootActionTypes>>()

// types
export type AppStateRootType = ReturnType<typeof rootReducer>
export type RootActionTypes =
    | AuthActionTypes
    | ProfileActionTypes
    | ActionPacksType
    | ActionCardsType

// https://redux.js.org/usage/usage-with-typescript
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateRootType, unknown, RootActionTypes>


// @ts-ignore
window.store = store