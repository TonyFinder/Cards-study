import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:7542/2.0/",
  withCredentials: true,
});

export type ShippingFields = {
  email: string;
  password: string;
};

export const registerApi = {
  register: (data: ShippingFields) => instance.post("auth/register", data),
};
