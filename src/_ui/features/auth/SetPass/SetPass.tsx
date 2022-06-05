import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {setNewPassword, SetPassActionTypes,} from '../../../../_bll/features/auth/setPass/setPassReducer';
import {AppStateRootType} from '../../../../_bll/main/store';
import {FieldSetPassword} from '../../../../_dal/api-setPassword';
import {Button} from '../../../common/_superComponents/Button/Button';
import {Input} from '../../../common/_superComponents/Input/Input';
import styles from './SetPass.module.scss';

export const SetPass = () => {
  const [password, setPassword] = useState<string | undefined>();
  const dispatch: ThunkDispatch<AppStateRootType, FieldSetPassword, SetPassActionTypes> =
    useDispatch();
  const token = ''
  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <h2>Create new password</h2>
        <div className={styles.inputContainer}>
          <Input onChangeText={setPassword} sign="Password" />
        </div>
        <div className={styles.text}>
          <span>Create new password and we will send you </span>
          <span>further instructions to email </span>
        </div>

        <Button
          onClick={() => {
            dispatch(setNewPassword({ password, token }));
          }}
        >
          Create new password
        </Button>
      </div>
    </div>
  );
};
