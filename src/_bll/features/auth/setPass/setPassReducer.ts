import { Dispatch } from "redux";
import { FieldSetPassword, setPasswordApi } from "../../../../_dal/api-setPassword";

let initialState = {
  error: "",
};

export const setPassReducer = (
  state: InitialStateType = initialState,
  action: SetPassActionTypes
): InitialStateType => {
  switch (action.type) {
    case "SET-ERROR":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

// actions

const setError = (error: string) => ({ type: "SET-ERROR", error });

// thunks
export const setNewPassword = (data: FieldSetPassword) => {
  return async (dispatch: Dispatch<SetPassActionTypes>) => {
    try {
      await setPasswordApi.setPassword(data);
    } catch (AxiosError: any) {
      dispatch(setError(AxiosError.response.data.error));
    }
  };
};

// types
export type SetPassActionTypes = ReturnType<typeof setError>;
type InitialStateType = typeof initialState;
