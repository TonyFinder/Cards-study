import styles from '../auth.module.scss'
import {Input} from "../../../common/_superComponents/Input/Input";
import {Button} from "../../../common/_superComponents/Button/Button";
import {Checkbox} from "../../../common/_superComponents/Checkbox/Checkbox";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from 'react-router-dom';
import {AppStateRootType} from "../../../../_bll/main/store";
import {setDataUser} from "../../../../_bll/features/profile/profileReducer";

export const Login = () => {

    const isLoggedIn = useSelector<AppStateRootType>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('nya-admin@nya.nya');
    const [password, setPassword] = useState('1qazxcvBG');


    const onChangeEmailHandler = (value: string) => {
        setEmail(value)
    }
    const onChangePasswordHandler = (value: string) => {
        setPassword(value)
    }

    const onClickLogin = () => {
        // @ts-ignore
        dispatch(setDataUser(email, password, false))
    }


    if (isLoggedIn) {
        return <Navigate to='/profile'/>
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>It-incubator</h1>
                <h3>Sign in</h3>
            </div>
            <div className={styles.body}>
                <label>Email</label>
                <Input onChangeText={onChangeEmailHandler} value={email} placeholder="Email"/>
                <label>Password</label>
                <Input onChangeText={onChangePasswordHandler} value={password} placeholder="Password"/>
                <span>Forgot password</span>
                <Checkbox>Remember me </Checkbox>
            </div>
            <div className={styles.footer}>
                <Button onClick={onClickLogin}>Login</Button>
                <span>Don’t have an account?</span>
                <a>Sign Up</a>
            </div>
        </div>
    )
}