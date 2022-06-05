import { Dispatch } from "redux";
import { forgotApi } from "../../../../_dal/api-forgotPassword";

let initialState = {
  error: "",
};

export const forgotReducer = (
  state: InitialStateType = initialState,
  action: ForgotActionTypes
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
type InitialStateType = typeof initialState;
