import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunk from 'redux-thunk';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {LoginActionTypes, loginReducer} from '../features/auth/_login/loginReducer';
import {RegisterActionTypes, registerReducer} from '../features/auth/_register/registerReducer';
import {ForgotActionTypes, forgotReducer} from '../features/auth/forgot/forgotReducer';
import {SetPassActionTypes, setPassReducer} from '../features/auth/setPass/setPassReducer';
import {ProfileActionTypes, profileReducer} from '../features/profile/profileReducer';

let rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    forgot: forgotReducer,
    setPass: setPassReducer,
    profile: profileReducer
})

export let store = createStore(rootReducer, applyMiddleware(thunk))

export const useCustomSelector: TypedUseSelectorHook<AppStateRootType> = useSelector

// types
export type AppStateRootType = ReturnType<typeof rootReducer>
export type RootActionTypes =
    | LoginActionTypes
    | RegisterActionTypes
    | ForgotActionTypes
    | SetPassActionTypes
    | ProfileActionTypes

// https://redux.js.org/usage/usage-with-typescript
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateRootType, unknown, RootActionTypes>


// @ts-ignore
window.store = store