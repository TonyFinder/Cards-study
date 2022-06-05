import { Dispatch } from "redux";
import {
  FieldSetPassword,
  setPasswordApi,
} from "../../../../_dal/api-setPassword";

let initialState = {
  info: "",
  error: "",
};

export const setPassReducer = (
  state: InitialStateType = initialState,
  action: SetPassActionTypes
): InitialStateType => {
  switch (action.type) {
    case "SET-PASSWORD-SUCCESS":
      return {
        ...state,
        info: action.info,
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

const setError = (error: string) => ({ type: "SET-ERROR", error } as const);
const setPasswordSuccsess = (info: string) =>
  ({ type: "SET-PASSWORD-SUCCESS", info } as const);

// thunks
export const setNewPassword = (data: FieldSetPassword) => {
  return async (dispatch: Dispatch<SetPassActionTypes>) => {
    try {
      const response = await setPasswordApi.setPassword(data);
      dispatch(setPasswordSuccsess(response.data.info))
    } catch (AxiosError: any) {
      dispatch(setError(AxiosError.response.data.error));
    }
  };
};

// types
export type SetPassActionTypes =
  | ReturnType<typeof setError>
  | ReturnType<typeof setPasswordSuccsess>;
type InitialStateType = typeof initialState;
