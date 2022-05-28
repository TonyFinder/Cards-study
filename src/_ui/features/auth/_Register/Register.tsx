import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "../auth.module.scss";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:7542/2.0/",
  withCredentials: true,
});

export const Register = () => {
  // useEffect(() => {
  //   instance.post("auth/register", { email, password });
  // }, []);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
        <input
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <button onClick={()=>{instance.post("auth/register", { email, password })}}>Register</button>
      </div>
    </div>
  );
};
