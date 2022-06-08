import {
  CardPacksType,
  PackParamsType,
  packsApi,
} from "../../../_dal/api-vadim";
import { AppThunk } from "../../main/store";

const initialState: CardPacksType = {
  cardPacks: [
    {
      _id: "",
      user_id: "",
      user_name: "",
      name: "",
      cardsCount: 0,
      created: "",
      updated: "",
    },
  ],
  cardPacksTotalCount: 100,
  maxCardsCount: 100,
  minCardsCount: 0,
  page: 1,
  pageCount: 1,
};

export const packsReducer = (
  state: CardPacksType = initialState,
  action: ActionPacksType
): CardPacksType => {
  switch (action.type) {
    case "PACKS/SET-PACKS-DATA":
      return { ...state, ...action.data };
    default:
      return state;
  }
};

// actions
export const setPacks = (data: CardPacksType) =>
  ({ type: "PACKS/SET-PACKS-DATA", data } as const);
const setPacksFromInput = (data: string) =>
  ({
    type: "SET-PACKS-FROM-INPUT",
    data,
  } as const);

// thunks
export const setPacksTC =
  (params: PackParamsType): AppThunk =>
  (dispatch, getState) => {
    let packame = getState().pack.cardPacks[0].name;
    packsApi.getPacks(params).then((res) => {
      dispatch(setPacks(res.data));
    });
  };

//type
export type ActionPacksType =
  | ReturnType<typeof setPacks>
  | ReturnType<typeof setPacksFromInput>;
