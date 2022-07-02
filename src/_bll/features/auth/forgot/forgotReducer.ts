import {AppThunk} from '../../../main/store';
import {changeAppLoadingStatus, addNotification} from '../../../main/appReducer';
import {LoadingStatusType} from '../../../../utils/enums';
import {registerApi} from '../../../../_dal/api-auth';
import {v1} from "uuid";

let initialForgotState = {
    isRedirect: false,
}

export const forgotReducer = (state: ForgotInitialStateType = initialForgotState, action: ForgotActionTypes): ForgotInitialStateType => {
    switch (action.type) {
        case 'FORGOT/REDIRECT-TO-CHECK-EMAIL':
            return {...state, isRedirect: true}
        default:
            return state;
    }
};

// actions
export const redirectToCheckEmail = () => ({type: "FORGOT/REDIRECT-TO-CHECK-EMAIL"} as const)

// thunks
export const requestPasswordTC = (email: string): AppThunk => (dispatch) => {
    dispatch(changeAppLoadingStatus(LoadingStatusType.active))
    registerApi.forgot(email)
        .then(() => dispatch(redirectToCheckEmail()))
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
export type ForgotActionTypes = ReturnType<typeof redirectToCheckEmail>
export type ForgotInitialStateType = typeof initialForgotState
