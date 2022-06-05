import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import {
  setNewPassword,
  SetPassActionTypes,
} from "../../../../_bll/features/auth/setPass/setPassReducer";
import { AppStateRootType, useCustomSelector } from "../../../../_bll/main/store";
import { FieldSetPassword } from "../../../../_dal/api-setPassword";
import { Button } from "../../../common/_superComponents/Button/Button";
import { Input } from "../../../common/_superComponents/Input/Input";
import styles from "./SetPass.module.scss";

export const SetPass = () => {
  const [password, setPassword] = useState<string>("");
  const dispatch: ThunkDispatch<
    AppStateRootType,
    FieldSetPassword,
    SetPassActionTypes
  > = useDispatch();
  const token = useParams<"token">();
  const resetPasswordToken = token.token;
  const error = useCustomSelector<string>((state) => state.setPass.error);
  const info = useCustomSelector<string>((state) => state.setPass.info);
  const navigate = useNavigate()
  
  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <h2>Create new password</h2>
        <div className={styles.inputContainer}>
          <Input onChangeText={setPassword} sign="Password" />
        </div>
        <div className={styles.text}>
          <span>Create new password and we will send you </span>
          <span>further instructions to email </span>
        </div>

        <Button
          onClick={() => {
            dispatch(setNewPassword({ password, resetPasswordToken }));
            if(info !== '') return navigate('/login')
          }}
        >
          Create new password
        </Button>
        <div className={styles.error}>{error}</div>
      </div>
    </div>
  );
};
