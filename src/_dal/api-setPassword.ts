import axios from "axios";
import { Params } from "react-router-dom";

export const instance = axios.create({
  //baseURL: 'http://localhost:7542/2.0/',
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
});

export type FieldSetPassword = {
  password: string;
  resetPasswordToken: string|undefined
};

export const setPasswordApi = {
  setPassword: (data: FieldSetPassword) =>
    instance.post("/auth/set-new-password", data),
};
