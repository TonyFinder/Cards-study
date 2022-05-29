import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import {
  RegisterActionTypes,
  requestRegistration,
  ShippingFields,
} from "../../../../_bll/features/auth/_register/registerReducer";
import {
  AppStateRootType,
  useCustomSelector,
} from "../../../../_bll/main/store";
import styles from "../auth.module.scss";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:7542/2.0/",
  withCredentials: true,
});

export const Register = () => {
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<
    AppStateRootType,
    ShippingFields,
    RegisterActionTypes
  > = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const error = useCustomSelector<string>((state) => state.register.error);
  const isRegistered = useCustomSelector<boolean>(
    (state) => state.register.isRegistered
  );
  if (isRegistered) {
    navigate("/login");
  }
  return (
    <div className={styles.container}>
      Register
      <div>
        <input
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <div>{error}</div>
        <input
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <button
          onClick={() => {
            dispatch(requestRegistration({ email, password }));
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};
