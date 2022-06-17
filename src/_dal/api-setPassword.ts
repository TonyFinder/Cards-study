import axios from "axios";

export const instance = axios.create({
  // baseURL: 'http://localhost:7542/2.0/',
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
});

export const setPasswordApi = {
  setPassword(password: string, resetPasswordToken: string) {
    return instance.post<any, SetPasswordResponseType, SetPasswordRequestType>("/auth/set-new-password",
        {password, resetPasswordToken})
  }
};

export type SetPasswordRequestType = {
  password: string
  resetPasswordToken: string
}
export type SetPasswordResponseType = {
  data: {
    info: string
    error: string
  }
}