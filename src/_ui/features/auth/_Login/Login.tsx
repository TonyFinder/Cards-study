import styles from '../../Template.module.scss'
import {Input} from '../../../common/_superComponents/Input/Input';
import {Button} from '../../../common/_superComponents/Button/Button';
import {Checkbox} from '../../../common/_superComponents/Checkbox/Checkbox';
import React, {useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {useAppDispatch, useCustomSelector} from '../../../../_bll/main/store';
import {setDataUserTC} from '../../../../_bll/features/profile/profileReducer';
import {LoginInitialStateType, setError} from '../../../../_bll/features/auth/_login/loginReducer';
import {COLORS, ROUTE_PATHS} from '../../../../utils/_values';
import {LoadingStatusType} from '../../../../utils/enums';
import {Loader} from '../../../common/_superComponents/Loader/Loader';
import {AuthDataType} from '../../../../_dal/api-auth';
import {register} from '../../../../_bll/features/auth/_register/registerReducer';


export const Login = () => {

    let dispatch = useAppDispatch()
    const {email, password} = useCustomSelector<AuthDataType>(state => state.profile)
    const {isLoggedIn, error} = useCustomSelector<LoginInitialStateType>(state => state.login)
    const isRegistered = useCustomSelector<boolean>(state => state.register.isRegistered)
    const loading = useCustomSelector<LoadingStatusType>(state => state.app.loadingStatus)

    const [emailValue, setEmailValue] = useState<string>(email)
    const [passwordValue, setPasswordValue] = useState<string>(password ? password : '')
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const [typeInput, setTypeInput] = useState("password")

    // Validation check
    const [errorEmail, setErrorEmail] = useState<boolean>(false)
    const [errorEmailValid, setErrorEmailValid] = useState<boolean>(false)
    const [errorPassword, setErrorPassword] = useState<boolean>(false)
    const [errorPasswordValid, setErrorPasswordValid] = useState<boolean>(false)

    const saveButtonDisable = !emailValue || !passwordValue || errorEmail || errorPassword || errorEmailValid || errorPasswordValid || !!error

    const onClickShowPasswordHandler = () => setTypeInput(typeInput === "password" ? "text" : "password")
    const onClickLoginHandler = () => {
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue) && passwordValue.length > 7 && dispatch(setDataUserTC(emailValue, passwordValue, rememberMe))
        !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue)) && setErrorEmailValid(true)
        passwordValue.length < 8 && setErrorPasswordValid(true)
    }
    const onChangeTextEmailHandler = (value: string) => {
        setEmailValue(value)
        setErrorEmailValid(false)
        error && dispatch(setError(''))
    }
    const onChangeTextPasswordHandler = (value: string) => {
        setPasswordValue(value)
        setErrorPasswordValid(false)
        error && dispatch(setError(''))
    }
    const onClickRememberHandler = () => setRememberMe(!rememberMe)
    const onClickRegisterLinkHandler = () => {
        isRegistered && dispatch(register(false))
    }

    if (isLoggedIn) return <Navigate to={ROUTE_PATHS.PROFILE}/>

    return <div className={styles.container}>
        <div className={styles.block}>
            <div className={styles.error}>{error}</div>
            <h1 className={styles.headerMain}>Smart Cards</h1>
            <h2 className={styles.headerSecond}>Sign In</h2>

            <div className={styles.inputContainer}>
                <Input
                    value={emailValue}
                    sign='Email'
                    onChangeText={onChangeTextEmailHandler}
                    error={errorEmail}
                    emailError={errorEmailValid}
                    onChangeError={setErrorEmail}/>
                <div className={styles.inputPass}>
                    <Input
                        value={passwordValue}
                        type={typeInput}
                        sign="Password"
                        onChangeText={onChangeTextPasswordHandler}
                        error={errorPassword}
                        passwordError={errorPasswordValid}
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