import axios from "axios";

export const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
});



export const searchCardsApi = {
  searchCards: (data: string) => instance.post("cards/pack"),
};
