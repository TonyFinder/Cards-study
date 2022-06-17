import React, {useState} from 'react';
import {RegisterInitialStateType, requestRegistrationTC, setError} from '../../../../_bll/features/auth/_register/registerReducer';
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
  const {error, isRegistered} = useCustomSelector<RegisterInitialStateType>(state => state.register)
  const loading = useCustomSelector<LoadingStatusType>(state => state.app.loadingStatus)

  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [repeatPasswordValue, setRepeatPasswordValue] = useState<string>("")
  const [typeInput, setTypeInput] = useState<string[]>(["password", "password"])

  // Validation check
  const [errorEmail, setErrorEmail] = useState<boolean>(false)
  const [errorEmailValid, setErrorEmailValid] = useState<boolean>(false)
  const [errorPassword, setErrorPassword] = useState<boolean>(false)
  const [errorPasswordValid, setErrorPasswordValid] = useState<boolean>(false)
  const [errorRepeatPassword, setErrorRepeatPassword] = useState<boolean>(false)
  const [errorRepeatPasswordValid, setErrorRepeatPasswordValid] = useState<boolean>(false)
  const [errorComparePasswords, setErrorComparePasswords] = useState<boolean>(false)

  const saveButtonDisable = !emailValue || !passwordValue || !repeatPasswordValue || errorEmail || errorPassword || errorRepeatPassword || !!error

  const onClickShowPasswordHandler = (value: number) => {
    setTypeInput(typeInput.map((m, i) => i === value
        ? m === 'password'
            ? 'text'
            : 'password'
        : m))
  }
  const onClickRegisterHandler = () => {
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue) && passwordValue.length > 7 && repeatPasswordValue.length > 7 && passwordValue === repeatPasswordValue && dispatch(requestRegistrationTC(emailValue, passwordValue))
    !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue)) && setErrorEmailValid(true)
    passwordValue.length < 8 && setErrorPasswordValid(true)
    repeatPasswordValue.length < 8 && setErrorRepeatPasswordValid(true)
    passwordValue !== repeatPasswordValue && setErrorComparePasswords(true)
  }
  const onChangeTextEmailHandler = (value: string) => {
    setEmailValue(value)
    setErrorEmailValid(false)
    error && dispatch(setError(''))
  }
  const onChangeTextPasswordHandler = (value: string) => {
    setPasswordValue(value)
    setErrorPasswordValid(false)
    setErrorComparePasswords(false)
    error && dispatch(setError(''))
  }
  const onChangeTextRepeatPasswordHandler = (value: string) => {
    setRepeatPasswordValue(value)
    setErrorRepeatPasswordValid(false)
    setErrorComparePasswords(false)
    error && dispatch(setError(''))
  }

  if (isRegistered && repeatPasswordValue === passwordValue) return <Navigate to={ROUTE_PATHS.LOGIN}/>

  return <div className={styles.container}>
    <div className={styles.block}>
      <div className={styles.error}>{error}</div>
      <h1 className={styles.headerMain}>Smart Cards</h1>
      <h2 className={styles.headerSecond}>Sign Up</h2>

      <div className={styles.inputContainer}>
        <Input
            value={emailValue}
            color={COLORS.MAIN_DARK}
            sign='Email'
            onChangeText={onChangeTextEmailHandler}
            error={errorEmail}
            emailError={errorEmailValid}
            onChangeError={setErrorEmail}/>
        <div className={styles.inputPass}>
          <Input
              value={passwordValue}
              color={COLORS.MAIN_DARK}
              type={typeInput[0]}
              sign="Password"
              onChangeText={onChangeTextPasswordHandler}
              error={errorPassword}
              passwordError={errorPasswordValid}
              comparePassword={errorComparePasswords}
              onChangeError={setErrorPassword}/>
          <span className={styles.hidePass} onClick={()=>onClickShowPasswordHandler(0)}>👀</span>
        </div>
        <div className={styles.inputPass}>
          <Input
              value={repeatPasswordValue}
              color={COLORS.MAIN_DARK}
              type={typeInput[1]}
              sign="Confirm password"
              onChangeText={onChangeTextRepeatPasswordHandler}
              error={errorRepeatPassword}
              passwordError={errorRepeatPasswordValid}
              comparePassword={errorComparePasswords}
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
