import { Dispatch } from "redux";
import {
  FieldForgotPassword,
  forgotApi,
} from "../../../../_dal/api-forgotPassword";

let initialState = {
  //   email: "",
  //   from: "",
  //   message: `<div style="background-color: lime; padding: 15px">
  //     password recovery link:
  //     <a href='http://localhost:3000/#/setPass/$token$'>
  //     link</a>
  //     </div>`,
  error: "",
};

export const forgotReducer = (
  state: InitialStateType = initialState,
  action: ForgotActionTypes
): InitialStateType => {
  switch (action.type) {
    // case "SEND-EMAIL":
    //   return {
    //     ...state,
    //     email: action.email,
    //   };
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
//export const sendEmail = (email: string) => ({ type: "SEND-EMAIL", email });
export const setError = (error: string) => ({ type: "SET-ERROR", error });

// thunks
export const requestPassword = (email: string | undefined) => {
  return async (dispatch: Dispatch<ForgotActionTypes>) => {
    try {
      await forgotApi.forgot(email);
    } catch (error: any) {}
  };
};
// types
export type ForgotActionTypes = ReturnType<typeof setError>;
type InitialStateType = typeof initialState;
