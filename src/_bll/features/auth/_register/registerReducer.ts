import { Dispatch } from "redux";
import { instance } from "../../../../_ui/features/auth/_Register/Register";

let initialState = {
  // data: {} as ShippingFields | {},
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
      await instance.post("auth/register", data);
      dispatch(register(true));
    } catch (error: any) {
      dispatch(setError(error.response.data.error));
    }
  };
};

// types
export type RegisterActionTypes =
  | ReturnType<typeof register>
  | ReturnType<typeof setError>;
type InitialStateType = typeof initialState;
export type ShippingFields = {
  email: string;
  password: string;
};
