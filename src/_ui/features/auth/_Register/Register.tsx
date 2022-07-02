import React, {useState} from 'react';
import {RegisterInitialStateType, requestRegistrationTC} from '../../../../_bll/features/auth/_register/registerReducer';
import {useAppDispatch, useCustomSelector,} from '../../../../_bll/main/store';
import {Button} from '../../../common/_superComponents/Button/Button';
import {Input} from '../../../common/_superComponents/Input/Input';
import styles from '../../Template.module.scss'
import {COLORS, ROUTE_PATHS} from '../../../../utils/_values';
import {Link, Navigate} from 'react-router-dom';
import {LoadingStatusType} from '../../../../utils/enums';
import {Loader} from '../../../common/_superComponents/Loader/Loader';

export const Register = () => {

  const dispatch = useAppDispatch()
  const {isRegistered} = useCustomSelector<RegisterInitialStateType>(state => state.register)
  const loading = useCustomSelector<LoadingStatusType>(state => state.app.loadingStatus)

  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [repeatPasswordValue, setRepeatPasswordValue] = useState<string>("")
  const [typeInput, setTypeInput] = useState<string[]>(["password", "password"])
  const [serverRequest, setServerRequest] = useState<boolean>(false)

  // Validation check
  const [errorEmail, setErrorEmail] = useState<boolean>(false)
  const [errorEmailValid, setErrorEmailValid] = useState<boolean>(false)
  const [errorPassword, setErrorPassword] = useState<boolean>(false)
  const [errorPasswordValid, setErrorPasswordValid] = useState<boolean>(false)
  const [errorRepeatPassword, setErrorRepeatPassword] = useState<boolean>(false)
  const [errorRepeatPasswordValid, setErrorRepeatPasswordValid] = useState<boolean>(false)
  const [errorComparePasswords, setErrorComparePasswords] = useState<boolean>(false)

  const saveButtonDisable = !emailValue || !passwordValue || !repeatPasswordValue || errorEmail || errorPassword || errorRepeatPassword || serverRequest

  const onClickShowPasswordHandler = (value: number) => {
    setTypeInput(typeInput.map((m, i) => i === value
        ? m === 'password'
            ? 'text'
            : 'password'
        : m))
  }
  const onClickRegisterHandler = () => {
    if (saveButtonDisable) return
    setServerRequest(true);
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue) && passwordValue.length > 7 && repeatPasswordValue.length > 7 && passwordValue === repeatPasswordValue && dispatch(requestRegistrationTC(emailValue, passwordValue))
    !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue)) && setErrorEmailValid(true)
    passwordValue.length < 8 && setErrorPasswordValid(true)
    repeatPasswordValue.length < 8 && setErrorRepeatPasswordValid(true)
    passwordValue !== repeatPasswordValue && setErrorComparePasswords(true)
  }
  const onChangeTextEmailHandler = (value: string) => {
    setEmailValue(value)
    setErrorEmailValid(false)
    setServerRequest(false)
  }
  const onChangeTextPasswordHandler = (value: string) => {
    setPasswordValue(value)
    setErrorPasswordValid(false)
    setErrorComparePasswords(false)
    setServerRequest(false)
  }
  const onChangeTextRepeatPasswordHandler = (value: string) => {
    setRepeatPasswordValue(value)
    setErrorRepeatPasswordValid(false)
    setErrorComparePasswords(false)
    setServerRequest(false)
  }

  if (isRegistered && repeatPasswordValue === passwordValue) return <Navigate to={ROUTE_PATHS.LOGIN}/>

  return <div className={styles.container}>
    <div className={styles.block}>
      <h1 className={styles.headerMain}>Smart Cards</h1>
      <h2 className={styles.headerSecond}>Sign Up</h2>

      <div className={styles.inputContainer}>
        <Input
            value={emailValue}
            color={COLORS.MAIN_DARK}
            sign='Email'
            error={errorEmail}
            emailError={errorEmailValid}
            disabled={loading === LoadingStatusType.active}
            onChangeText={onChangeTextEmailHandler}
            onEnter={onClickRegisterHandler}
            onChangeError={setErrorEmail}/>
        <div className={styles.inputPass}>
          <Input
              value={passwordValue}
              color={COLORS.MAIN_DARK}
              type={typeInput[0]}
              sign="Password"
              error={errorPassword}
              passwordError={errorPasswordValid}
              comparePassword={errorComparePasswords}
              disabled={loading === LoadingStatusType.active}
              onChangeText={onChangeTextPasswordHandler}
              onEnter={onClickRegisterHandler}
              onChangeError={setErrorPassword}/>
          <span className={styles.hidePass} onClick={()=>onClickShowPasswordHandler(0)}>👀</span>
        </div>
        <div className={styles.inputPass}>
          <Input
              value={repeatPasswordValue}
              color={COLORS.MAIN_DARK}
              type={typeInput[1]}
              sign="Confirm password"
              error={errorRepeatPassword}
              passwordError={errorRepeatPasswordValid}
              comparePassword={errorComparePasswords}
              disabled={loading === LoadingStatusType.active}
              onChangeText={onChangeTextRepeatPasswordHandler}
              onEnter={onClickRegisterHandler}
              onChangeError={setErrorRepeatPassword}/>
          <span className={styles.hidePass} onClick={()=>onClickShowPasswordHandler(1)}>👀</span>
        </div>
      </div>

      <div className={styles.button}>
        {loading === LoadingStatusType.disabled
            ?<Button color={COLORS.MAIN_DARK}
                     disabled={saveButtonDisable}
                     onClick={onClickRegisterHandler}>Register</Button>
            :<Loader color={COLORS.MAIN_DARK}/>
        }
      </div>

      <div className={styles.bottomText}>
        <span>Do you already have an account?</span>
        <Link to={ROUTE_PATHS.LOGIN}>Sign In</Link>
      </div>
    </div>
  </div>
};
