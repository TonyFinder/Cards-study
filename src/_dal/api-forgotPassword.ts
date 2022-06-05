import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});

export type FieldForgotPassword = {
  email: string;
  password: string;
  message: string;
};

export const forgotApi = {
  forgot: (email: string|undefined) =>
    instance.post("auth/forgot", {
      email,
      from: "",
      message: `<div style="background-color: lime; padding: 15px">
     password recovery link: 
     <a href='http://localhost:3000/cards-nya-front#/setPass/$token$'>
      link</a>
      </div>`,
    }),
};
