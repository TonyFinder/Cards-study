import axios from "axios";

export const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  // baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
});

export type ShippingFields = {
  email: string;
  password: string;
};

export const registerApi = {
  register: (data: ShippingFields) => instance.post("auth/register", data),
};
