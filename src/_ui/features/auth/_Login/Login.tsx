import styles from './authVadim.module.scss'
import {Input} from "../../../common/_superComponents/Input/Input";
import {Button} from "../../../common/_superComponents/Button/Button";
import {Checkbox} from "../../../common/_superComponents/Checkbox/Checkbox";
import {useState} from "react";
import {Link, Navigate} from 'react-router-dom';
import {useAppDispatch, useCustomSelector} from "../../../../_bll/main/store";
import {setDataUser} from "../../../../_bll/features/profile/profileReducer";
import {loginInitialStateType} from "../../../../_bll/features/auth/_login/loginReducer";

export const Login = () => {

    const {isLoggedIn, error} = useCustomSelector<loginInitialStateType>(state => state.login)
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState('nya-admin@nya.nya');
    const [password, setPassword] = useState('1qazxcvBG');
    const [checkbox, setCheckbox] = useState(false);


    const onChangeEmailHandler = (value: string) => {
        setEmail(value)
    }

    const onChangePasswordHandler = (value: string) => {
        setPassword(value)
    }

    const onChangeCheckboxHandler = () => {
        setCheckbox(!checkbox)
    }

    const onClickLogin = () => {
        dispatch(setDataUser(email, password, checkbox))
    }

    if (isLoggedIn) {
        return <Navigate to='/profile'/>
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>It-incubator</h1>
                <h3>Sign in</h3>
                <div className={styles.error}>{error && error}</div>
                <div>
                    <label>Email</label>
                    <Input onChangeText={onChangeEmailHandler} value={email} placeholder='Email'/>
                </div>
                <div>
                    <label>Password</label>
                    <Input onChangeText={onChangePasswordHandler} value={password} type='password'
                           placeholder='Password'/>
                </div>
                <span>Forgot password</span>
                <Checkbox onClick={onChangeCheckboxHandler} checked={checkbox}>Remember me </Checkbox>
            </div>
            <div className={styles.footer}>
                <Button onClick={onClickLogin}>Login</Button>
                <span>Don’t have an account?</span>
                <Link to='/register'>Sign Up</Link>
            </div>
        </div>
    )
}