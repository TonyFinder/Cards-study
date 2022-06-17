import {registerApi} from '../../../../_dal/api-register';
import {changeAppLoadingStatus} from '../../../main/appReducer';
import {LoadingStatusType} from '../../../../utils/enums';
import {AppThunk} from '../../../main/store';

let initialState = {
    error: "",
    isRegistered: false,
};


export const registerReducer = (state = initialState, action: RegisterActionTypes): RegisterInitialStateType => {
    switch (action.type) {
        case "REGISTER/REGISTER":
            return {...state, isRegistered: action.isRegistered}
        case "REGISTER/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

// actions
export const register = (isRegistered: boolean) => ({type: "REGISTER/REGISTER", isRegistered} as const)
export const setError = (error: string) => ({type: "REGISTER/SET-ERROR", error} as const)

// thunks
export const requestRegistrationTC = (email: string,  password: string): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    registerApi.register(email,  password)
        .then(res => {
            res.data.error
                ? dispatch(setError(res.data.error))
                : dispatch(register(true))
        })
        .catch(err => dispatch(setError(err.response.data.error)))
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}

// types
export type RegisterInitialStateType = typeof initialState;
export type RegisterActionTypes = ReturnType<typeof register> | ReturnType<typeof setError>
