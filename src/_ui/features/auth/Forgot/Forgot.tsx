import React, {useCallback, useState} from 'react';
import {useAppDispatch, useCustomSelector} from '../../../../_bll/main/store';
import {Button} from '../../../common/_superComponents/Button/Button';
import {Input} from '../../../common/_superComponents/Input/Input';
import styles from '../../Template.module.scss'
import {AuthInitialStateType, requestPasswordTC} from '../../../../_bll/features/auth/authReducer';
import {LoadingStatusType} from '../../../../utils/enums';
import {Link, Navigate} from 'react-router-dom';
import {COLORS, ROUTE_PATHS} from '../../../../utils/_values';
import {Loader} from '../../../common/_superComponents/Loader/Loader';

export const Forgot = React.memo( () => {
    const dispatch = useAppDispatch()
    const {isLoggedIn, isRedirect} = useCustomSelector<AuthInitialStateType>(state => state.auth)
    const loading = useCustomSelector<LoadingStatusType>(state => state.app.loadingStatus)

    const [emailValue, setEmailValue] = useState<string>('')
    const [serverRequest, setServerRequest] = useState<boolean>(false)

    // Validation check
    const [errorEmail, setErrorEmail] = useState<boolean>(false)
    const [errorEmailValid, setErrorEmailValid] = useState<boolean>(false)

    const saveButtonDisable = !emailValue || errorEmail || errorEmailValid || serverRequest

    const onClickForgotHandler = useCallback( () => {
        if (saveButtonDisable) return
        setServerRequest(true);
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue)
            ? dispatch(requestPasswordTC(emailValue))
            : setErrorEmailValid(true)
    }, [dispatch, emailValue, saveButtonDisable])
    const onChangeTextEmailHandler = useCallback( (value: string) => {
        setEmailValue(value)
        setErrorEmailValid(false)
        setServerRequest(false)
    }, [])

    if (isLoggedIn) return <Navigate to={ROUTE_PATHS.PROFILE}/>
    if (isRedirect) return <Navigate to={`${ROUTE_PATHS.CHECK_EMAIL}/${emailValue}`}/>

    return <div className={styles.container}>
        <div className={styles.block}>
            <h1 className={styles.headerMain}>Smart Cards</h1>
            <h2 className={styles.headerSecond}>Forgot your password?</h2>

            <div className={styles.inputContainer}>
                <Input
                    value={emailValue}
                    sign='Email'
                    color={COLORS.MAIN_DARK}
                    error={errorEmail}
                    emailError={errorEmailValid}
                    disabled={loading === LoadingStatusType.active}
                    onChangeText={onChangeTextEmailHandler}
                    onEnter={onClickForgotHandler}
                    onChangeError={setErrorEmail}/>
            </div>

            <div className={styles.description}>
                <span>Enter your email address and <br/> we will send you further instructions</span>
            </div>

            <div className={styles.buttonBig}>
                {loading === LoadingStatusType.disabled
                    ? <Button color={COLORS.MAIN_DARK}
                              disabled={saveButtonDisable}
                              onClick={onClickForgotHandler}>
                        Send instructions
                    </Button>
                    : <Loader color={COLORS.MAIN_DARK}/>
                }
            </div>

            <div className={styles.bottomText}>
                <span>Did you remember your password?</span>
                <Link to={ROUTE_PATHS.LOGIN}>Try logging in</Link>
            </div>
        </div>
    </div>
})