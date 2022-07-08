import styles from '../../Template.module.scss'
import {Input} from '../../../common/_superComponents/Input/Input';
import {Button} from '../../../common/_superComponents/Button/Button';
import {Checkbox} from '../../../common/_superComponents/Checkbox/Checkbox';
import React, {useEffect, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {useAppDispatch, useCustomSelector} from '../../../../_bll/main/store';
import {setDataUserTC} from '../../../../_bll/features/profile/profileReducer';
import {AuthInitialStateType, register, setPasswordSuccess} from '../../../../_bll/features/auth/authReducer';
import {COLORS, ROUTE_PATHS} from '../../../../utils/_values';
import {LoadingStatusType} from '../../../../utils/enums';
import {Loader} from '../../../common/_superComponents/Loader/Loader';
import {AuthDataType} from '../../../../_dal/api-auth';


export const Login = () => {

    let dispatch = useAppDispatch()
    const {email, password} = useCustomSelector<AuthDataType>(state => state.profile)
    const {isLoggedIn, isRegistered} = useCustomSelector<AuthInitialStateType>(state => state.auth)
    const loading = useCustomSelector<LoadingStatusType>(state => state.app.loadingStatus)

    const [emailValue, setEmailValue] = useState<string>(email)
    const [passwordValue, setPasswordValue] = useState<string>(password ? password : '')
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const [typeInput, setTypeInput] = useState<string>("password")
    const [serverRequest, setServerRequest] = useState<boolean>(false)

    // Validation check
    const [errorEmail, setErrorEmail] = useState<boolean>(false)
    const [errorEmailValid, setErrorEmailValid] = useState<boolean>(false)
    const [errorPassword, setErrorPassword] = useState<boolean>(false)
    const [errorPasswordValid, setErrorPasswordValid] = useState<boolean>(false)

    const saveButtonDisable = !emailValue || !passwordValue || errorEmail || errorPassword || errorEmailValid || errorPasswordValid || serverRequest

    useEffect(() => {
        dispatch(setPasswordSuccess(false))
    }, [dispatch])

    const onClickShowPasswordHandler = () => setTypeInput(typeInput === "password" ? "text" : "password")
    const onClickLoginHandler = () => {
        if (saveButtonDisable) return
        setServerRequest(true);
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue) && passwordValue.length > 7 && dispatch(setDataUserTC(emailValue, passwordValue, rememberMe))
        !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue)) && setErrorEmailValid(true)
        passwordValue.length < 8 && setErrorPasswordValid(true)
    }
    const onChangeTextEmailHandler = (value: string) => {
        setEmailValue(value)
        setErrorEmailValid(false)
        setServerRequest(false)
    }
    const onChangeTextPasswordHandler = (value: string) => {
        setPasswordValue(value)
        setErrorPasswordValid(false)
        setServerRequest(false)
    }
    const onClickRememberHandler = () => setRememberMe(!rememberMe)
    const onClickRegisterLinkHandler = () => {
        isRegistered && dispatch(register(false))
    }

    if (isLoggedIn) return <Navigate to={ROUTE_PATHS.PROFILE}/>

    return <div className={styles.container}>
        <div className={styles.block}>
            <h1 className={styles.headerMain}>Smart Cards</h1>
            <h2 className={styles.headerSecond}>Sign In</h2>

            <div className={styles.inputContainer}>
                <Input
                    value={emailValue}
                    sign='Email'
                    error={errorEmail}
                    emailError={errorEmailValid}
                    disabled={loading === LoadingStatusType.active}
                    onChangeText={onChangeTextEmailHandler}
                    onEnter={onClickLoginHandler}
                    onChangeError={setErrorEmail}/>
                <div className={styles.inputPass}>
                    <Input
                        value={passwordValue}
                        type={typeInput}
                        sign="Password"
                        error={errorPassword}
                        passwordError={errorPasswordValid}
                        disabled={loading === LoadingStatusType.active}
                        onChangeText={onChangeTextPasswordHandler}
                        onEnter={onClickLoginHandler}
                        onChangeError={setErrorPassword}/>
                    <span className={styles.hidePass} onClick={onClickShowPasswordHandler}>👀</span>
                    <Link to={ROUTE_PATHS.FORGOT}>Forgot Password</Link>
                </div>
                <div className={styles.checkbox}>
                    <Checkbox color={COLORS.MAIN_DARK}
                              checked={rememberMe}
                              onClick={onClickRememberHandler}>Remember me</Checkbox>
                </div>
            </div>

            <div className={styles.button}>
                {loading === LoadingStatusType.disabled
                    ?<Button color={COLORS.MAIN_DARK}
                              disabled={saveButtonDisable}
                              onClick={onClickLoginHandler}>Login</Button>
                    :<Loader color={COLORS.MAIN_DARK}/>
                }
            </div>

            <div className={styles.bottomText}>
                <span>Don’t have an account?</span>
                <Link to={ROUTE_PATHS.REGISTER} onClick={onClickRegisterLinkHandler}>Sign Up</Link>
            </div>
        </div>
    </div>
}