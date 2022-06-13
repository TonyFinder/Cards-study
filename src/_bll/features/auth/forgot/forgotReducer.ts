import { Dispatch } from "redux";
import { forgotApi } from "../../../../_dal/api-forgotPassword";

let initialState = {
  error: "",
};

export const forgotReducer = (
  state: ForgotInitialStateType = initialState,
  action: ForgotActionTypes
): ForgotInitialStateType => {
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
export const setError = (error: string) => ({ type: "SET-ERROR", error } as const);

// thunks
export const requestPassword = (email: string | undefined) => {
  return async (dispatch: Dispatch<ForgotActionTypes>) => {
    try {
      await forgotApi.forgot(email);
    } catch (AxiosError: any) {
      dispatch(setError(AxiosError.response.data.error));
    }
  };
};
// types
export type ForgotActionTypes = ReturnType<typeof setError>;
export type ForgotInitialStateType = typeof initialState;
