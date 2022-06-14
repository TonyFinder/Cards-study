import {FieldSetPassword, setPasswordApi} from '../../../../_dal/api-setPassword';
import {AppThunk} from '../../../main/store';
import {changeAppLoadingStatus} from '../../../main/appReducer';
import {LoadingStatusType} from '../../../../utils/enums';

let initialState = {
  info: "",
  error: "",
};

export const setPassReducer = (state: SetPasswordInitialStateType = initialState, action: SetPassActionTypes): SetPasswordInitialStateType => {
  switch (action.type) {
    case 'SET-PASSWORD-SUCCESS':
      return {...state, info: action.info}
    case 'SET-ERROR':
      return {...state, error: action.error}
    default:
      return state
  }
}

// actions
const setError = (error: string) => ({ type: "SET-ERROR", error } as const);
const setPasswordSuccess = (info: string) => ({ type: "SET-PASSWORD-SUCCESS", info } as const);

// thunks
export const setNewPasswordTC = (data: FieldSetPassword): AppThunk => (dispatch) => {
  dispatch(changeAppLoadingStatus(LoadingStatusType.active))
  setPasswordApi.setPassword(data)
      .then(res => dispatch(setPasswordSuccess(res.data.info)))
      .catch(err => dispatch(setError(err.response.data.error)))
      .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}

// types
export type SetPassActionTypes = ReturnType<typeof setError> | ReturnType<typeof setPasswordSuccess>
export type SetPasswordInitialStateType = typeof initialState;
