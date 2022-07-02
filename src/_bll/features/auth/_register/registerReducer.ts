import {changeAppLoadingStatus, addNotification} from '../../../main/appReducer';
import {LoadingStatusType} from '../../../../utils/enums';
import {AppThunk} from '../../../main/store';
import {registerApi} from '../../../../_dal/api-auth';
import {v1} from "uuid";

let initialRegisterState = {
    isRegistered: false,
}

export const registerReducer = (state: RegisterInitialStateType = initialRegisterState, action: RegisterActionTypes): RegisterInitialStateType => {
    switch (action.type) {
        case "REGISTER/REGISTER":
            return {...state, isRegistered: action.isRegistered}
        default:
            return state
    }
}

// actions
export const register = (isRegistered: boolean) => ({type: "REGISTER/REGISTER", isRegistered} as const)

// thunks
export const requestRegistrationTC = (email: string, password: string): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    registerApi.register({email, password})
        .then(() => dispatch(register(true)))
        .catch(err => {
            dispatch(addNotification({
                type: "error",
                message: `${err.response.data.error}`,
                id: v1(),
            }))
        })
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}

// types
export type RegisterInitialStateType = typeof initialRegisterState
export type RegisterActionTypes = ReturnType<typeof register>
