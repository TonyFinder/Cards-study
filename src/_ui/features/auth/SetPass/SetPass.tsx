import React, {useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {
  setError,
  setNewPasswordTC,
  SetPasswordInitialStateType
} from '../../../../_bll/features/auth/setPass/setPassReducer';
import {useAppDispatch, useCustomSelector} from '../../../../_bll/main/store';
import {Button} from '../../../common/_superComponents/Button/Button';
import {Input} from '../../../common/_superComponents/Input/Input';
import styles from '../../Template.module.scss'
import {LoadingStatusType} from '../../../../utils/enums';
import {COLORS, ROUTE_PATHS} from '../../../../utils/_values';
import {Loader} from '../../../common/_superComponents/Loader/Loader';

export const SetPass = () => {
  const dispatch = useAppDispatch()
  const {token} = useParams();
  const {error, info} = useCustomSelector<SetPasswordInitialStateType>(state => state.setPass)
  const loading = useCustomSelector<LoadingStatusType>(state => state.app.loadingStatus)

  const [passwordValue, setPasswordValue] = useState<string>('')
  const [typeInput, setTypeInput] = useState("password")

  // Validation check
  const [errorPassword, setErrorPassword] = useState<boolean>(false)
  const [errorPasswordValid, setErrorPasswordValid] = useState<boolean>(false)

  const saveButtonDisable = !passwordValue || errorPassword || errorPasswordValid || !!error

  const onClickCreateHandler = () => {
    passwordValue.length > 7
        ? dispatch(setNewPasswordTC(passwordValue, token ? token : ''))
        : setErrorPasswordValid(true)
  }
  const onChangeTextPasswordHandler = (value: string) => {
    setPasswordValue(value)
    setErrorPassword(false)
    setErrorPasswordValid(false)
    error && dispatch(setError(''))
  }
  const onClickShowPasswordHandler = () => setTypeInput(typeInput === "password" ? "text" : "password")

  if (info) return <Navigate to={ROUTE_PATHS.LOGIN}/>

  return <div className={styles.container}>
    <div className={styles.block}>
      <div className={styles.error}>{error}</div>
      <h1 className={styles.headerMain}>Smart Cards</h1>
      <h2 className={styles.headerSecond}>Create a new password</h2>

      <div className={styles.inputContainer}>
        <div className={styles.inputPass}>
          <Input
              value={passwordValue}
              type={typeInput}
              color={COLORS.MAIN_DARK}
              sign="Password"
              onChangeText={onChangeTextPasswordHandler}
              error={errorPassword}
              passwordError={errorPasswordValid}
              onChangeError={setErrorPassword}/>
          <span className={styles.hidePass} onClick={onClickShowPasswordHandler}>👀</span>
        </div>
      </div>

      <div className={styles.description}>
        <span>Create a new password and we will send you <br/> further instructions by email</span>
      </div>

      <div className={styles.buttonBig}>
        {loading === LoadingStatusType.disabled
            ?<Button color={COLORS.MAIN_DARK}
                     disabled={saveButtonDisable}
                     onClick={onClickCreateHandler}>Create a new password</Button>
            :<Loader color={COLORS.MAIN_DARK}/>
        }
      </div>
    </div>
  </div>
}
