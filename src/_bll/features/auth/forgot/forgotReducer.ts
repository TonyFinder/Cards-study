import {forgotApi} from '../../../../_dal/api-forgotPassword';
import {AppThunk} from '../../../main/store';
import {changeAppLoadingStatus} from '../../../main/appReducer';
import {LoadingStatusType} from '../../../../utils/enums';

let initialState = {
  error: "",
}

export const forgotReducer = ( state: ForgotInitialStateType = initialState, action: ForgotActionTypes): ForgotInitialStateType => {
  switch (action.type) {
    case "SET-ERROR":
      return {...state, error: action.error }
    default:
      return state;
  }
};

// actions
export const setError = (error: string) => ({ type: "SET-ERROR", error } as const);

// thunks
export const requestPasswordTC = (email: string | undefined): AppThunk => (dispatch) => {
  dispatch(changeAppLoadingStatus(LoadingStatusType.active))
  forgotApi.forgot(email)
      .catch(err => dispatch(setError(err.response.data.error)))
      .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}

// types
export type ForgotActionTypes = ReturnType<typeof setError>
export type ForgotInitialStateType = typeof initialState
