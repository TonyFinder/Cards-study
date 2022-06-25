import {AppThunk} from '../../../main/store';
import {changeAppLoadingStatus} from '../../../main/appReducer';
import {LoadingStatusType} from '../../../../utils/enums';
import {registerApi} from '../../../../_dal/api-auth';

let initialState = {
    info: "",
    error: "",
};

export const setPassReducer = (state: SetPasswordInitialStateType = initialState, action: SetPassActionTypes): SetPasswordInitialStateType => {
    switch (action.type) {
        case 'SET-PASSWORD/SET-PASSWORD-SUCCESS':
            return {...state, info: action.info}
        case 'SET-PASSWORD/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

// actions
export const setError = (error: string) => ({type: "SET-PASSWORD/SET-ERROR", error} as const);
const setPasswordSuccess = (info: string) => ({type: "SET-PASSWORD/SET-PASSWORD-SUCCESS", info} as const);

// thunks
export const setNewPasswordTC = (password: string, resetPasswordToken: string): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    registerApi.setPassword({password, resetPasswordToken})
        .then(res => res.data.info && dispatch(setPasswordSuccess(res.data.info)))
        .catch(err => dispatch(setError(err.response.data.error)))
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}

// types
export type SetPassActionTypes = ReturnType<typeof setError> | ReturnType<typeof setPasswordSuccess>
export type SetPasswordInitialStateType = typeof initialState;
