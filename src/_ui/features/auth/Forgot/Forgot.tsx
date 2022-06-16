import React, {useState} from 'react';
import {
    ForgotInitialStateType,
    requestPasswordTC,
    setError,
} from '../../../../_bll/features/auth/forgot/forgotReducer';
import {useAppDispatch, useCustomSelector} from '../../../../_bll/main/store';
import {Button} from '../../../common/_superComponents/Button/Button';
import {Input} from '../../../common/_superComponents/Input/Input';
import styles from '../../Template.module.scss'
import {LoginInitialStateType} from '../../../../_bll/features/auth/_login/loginReducer';
import {LoadingStatusType} from '../../../../utils/enums';
import {Link, Navigate} from 'react-router-dom';
import {COLORS, ROUTE_PATHS} from '../../../../utils/_values';
import {Loader} from '../../../common/_superComponents/Loader/Loader';

export const Forgot = () => {

    let dispatch = useAppDispatch()
    const {isLoggedIn} = useCustomSelector<LoginInitialStateType>(state => state.login)
    const {error} = useCustomSelector<ForgotInitialStateType>(state => state.forgot)
    const loading = useCustomSelector<LoadingStatusType>(state => state.app.loadingStatus)

    const [emailValue, setEmailValue] = useState<string>('')

    const [isRedirect, setIsRedirect] = useState(false)

    // Validation check
    const [errorEmail, setErrorEmail] = useState<boolean>(false)
    const [errorEmailValid, setErrorEmailValid] = useState<boolean>(false)

    const saveButtonDisable = !emailValue || errorEmail || errorEmailValid || !!error

    const onClickForgotHandler = () => {
        /*/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue)*/
        if (/^[\w\.=-]+@[\w\.-]+\.[\w]{2,3}$/i.test(emailValue)) {
            dispatch(requestPasswordTC(emailValue))
            setIsRedirect(true)
        } else {
            setErrorEmailValid(true)
            setIsRedirect(false)
        }
    }
    const onChangeTextEmailHandler = (value: string) => {
        setEmailValue(value)
        setErrorEmailValid(false)
        error && dispatch(setError(''))
    }

    if (isLoggedIn) return <Navigate to={ROUTE_PATHS.PROFILE}/>

    return <div className={styles.container}>
        <div className={styles.block}>
            <div className={styles.error}>{error}</div>
            <h1 className={styles.headerMain}>Smart Cards</h1>
            <h2 className={styles.headerSecond}>Forgot your password?</h2>

            <div className={styles.inputContainer}>
                <Input
                    value={emailValue}
                    sign='Email'
                    color={COLORS.MAIN_DARK}
                    onChangeText={onChangeTextEmailHandler}
                    error={errorEmail}
                    emailError={errorEmailValid}
                    onChangeError={setErrorEmail}/>
            </div>

            <div className={styles.description}>
                <span>Enter your email address and <br/> we will send you further instructions</span>
            </div>

            <div className={styles.buttonBig}>
                {loading === LoadingStatusType.disabled
                    ? <Link
                        style={{'textDecoration': 'none'}}
                        className={styles.buttonBig}
                        to={isRedirect ? ROUTE_PATHS.CHECK_EMAIL + '/' + emailValue : ''}>
                        <Button
                            color={COLORS.MAIN_DARK}
                            disabled={saveButtonDisable}
                            onClick={onClickForgotHandler}>
                            Send instructions
                        </Button>
                    </Link>
                    : <Loader color={COLORS.MAIN_DARK}/>
                }
            </div>

            <div className={styles.bottomText}>
                <span>Did you remember your password?</span>
                <Link to={ROUTE_PATHS.LOGIN}>Try logging in</Link>
            </div>
        </div>
    </div>
}
