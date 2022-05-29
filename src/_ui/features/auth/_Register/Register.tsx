import axios from "axios";
import { ChangeEvent, useState } from "react";
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
import { Button } from "../../../common/_superComponents/Button/Button";
import { Input } from "../../../common/_superComponents/Input/Input";
import styles from "./Register.module.scss";

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
    <div className={styles.formContainer}>
      <div className={styles.form}>
        Sign Up
        <Input value={email} onChangeText={setEmail} />
        <Input type={'password'} value={password} onChangeText={setPassword} />
        <Button
          onClick={() => {
            dispatch(requestRegistration({ email, password }));
          }}
        >
          Register
        </Button>
        <div className={styles.error}>{error}</div>
      </div>
    </div>
  );
};
