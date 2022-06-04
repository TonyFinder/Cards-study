import { useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  ForgotActionTypes,
  requestPassword,
} from "../../../../_bll/features/auth/forgot/forgotReducer";
import { AppStateRootType } from "../../../../_bll/main/store";
import { Button } from "../../../common/_superComponents/Button/Button";
import { Input } from "../../../common/_superComponents/Input/Input";
import styles from "./Forgot.module.scss";

export const Forgot = () => {
  const [email, setEmail] = useState<string | undefined>();
  const dispatch: ThunkDispatch<AppStateRootType, string, ForgotActionTypes> =
    useDispatch();
  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <h2>Forgot your password?</h2>
        <div className={styles.inputContainer}>
          <Input value={email} sign="Email" onChangeText={setEmail} />
        </div>
        <div className={styles.text}>
          <span>Enter your email address and we will send you </span>
          <span>further instructions</span>
        </div>

        <Button onClick={() => dispatch(requestPassword(email))}>
          Send instructions
        </Button>
      </div>
    </div>
  );
};
