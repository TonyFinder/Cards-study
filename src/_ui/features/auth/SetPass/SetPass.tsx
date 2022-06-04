import { Button } from "../../../common/_superComponents/Button/Button";
import { Input } from "../../../common/_superComponents/Input/Input";
import styles from "./SetPass.module.scss";

export const SetPass = () => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <h2>Create new password</h2>
        <div className={styles.inputContainer}>
          <Input sign="Password" />
        </div>
        <div className={styles.text}>
          <span>Create new password and we will send you </span>
          <span>further instructions to email </span>
        </div>

        <Button>Create new password</Button>
      </div>
    </div>
  );
};
