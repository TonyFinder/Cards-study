import {changeAppLoadingStatus, addNotification} from '../../../main/appReducer';
import {LoadingStatusType} from '../../../../utils/enums';
import {AppThunk} from '../../../main/store';
import {registerApi} from '../../../../_dal/api-auth';
import {v1} from "uuid";

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
export const requestRegistrationTC = (email: string, password: string): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    registerApi.register(email, password)
        .then(res => {
            res.data.error
                ? dispatch(setError(res.data.error))
                : dispatch(register(true))
        })
        .catch(err => {
            dispatch(setError(err.response.data.error))
            dispatch(addNotification({
                type: "error",
                message: `${err.response.data.error}`,
                id: v1(),
            }))
        })
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}

// types
export type RegisterInitialStateType = typeof initialState;
export type RegisterActionTypes = ReturnType<typeof register> | ReturnType<typeof setError>
