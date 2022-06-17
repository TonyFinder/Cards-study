import {forgotApi} from '../../../../_dal/api-forgotPassword';
import {AppThunk} from '../../../main/store';
import {changeAppLoadingStatus} from '../../../main/appReducer';
import {LoadingStatusType} from '../../../../utils/enums';

let initialState = {
    error: "",
    isRedirect: false,
}

export const forgotReducer = (state: ForgotInitialStateType = initialState, action: ForgotActionTypes): ForgotInitialStateType => {
    switch (action.type) {
        case "FORGOT/SET-ERROR":
            return {...state, error: action.error}
        case 'FORGOT/REDIRECT-TO-CHECK-EMAIL':
            return {...state, isRedirect: true}
        default:
            return state;
    }
};

// actions
export const setError = (error: string) => ({type: "FORGOT/SET-ERROR", error} as const)
export const redirectToCheckEmail = () => ({type: "FORGOT/REDIRECT-TO-CHECK-EMAIL"} as const)

// thunks
export const requestPasswordTC = (email: string): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    forgotApi.forgot(email)
        .then(() => dispatch(redirectToCheckEmail()))
        .catch(err => dispatch(setError(err.response.data.error)))
        .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}

// types
export type ForgotActionTypes = ReturnType<typeof setError> | ReturnType<typeof redirectToCheckEmail>
export type ForgotInitialStateType = typeof initialState
