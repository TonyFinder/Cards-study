import { Dispatch } from "redux";
import { registerApi, ShippingFields } from "../../../../_dal/api-register";

let initialState = {
  error: "",
  isRegistered: false,
};



export const registerReducer = (
  state = initialState,
  action: RegisterActionTypes
): InitialStateType => {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        isRegistered: action.isRegistered,
      };
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
export const register = (isRegistered: boolean) =>
  ({ type: "REGISTER", isRegistered } as const);
export const setError = (error: string) =>
  ({ type: "SET-ERROR", error } as const);

// thunks

export const requestRegistration = (data: ShippingFields) => {
  return async (dispatch: Dispatch<RegisterActionTypes>) => {
    try {
      await registerApi.register(data);
      dispatch(register(true));
    } catch (error: any) {
      dispatch(setError(error.response.data.error));
    }
  };
};

// types
type InitialStateType = typeof initialState;

export type RegisterActionTypes =
  | ReturnType<typeof register>
  | ReturnType<typeof setError>;
