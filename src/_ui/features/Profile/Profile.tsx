import styles from './Profile.module.scss'
import {Input} from '../../common/_superComponents/Input/Input';
import {Button} from '../../common/_superComponents/Button/Button';
import {useAppDispatch, useCustomSelector} from '../../../_bll/main/store';
import {useState} from 'react';
import {changeProfileDataTC} from '../../../_bll/features/profile/profileReducer';
import {AuthDataType} from '../../../_dal/api-profile';

export const Profile = () => {
    const {name, email, avatar} = useCustomSelector<AuthDataType>(state => state.profile)
    let dispatch = useAppDispatch()

    const [nickNameValue, setNickNameValue] = useState<string>(name)
    const [emailValue, setEmailValue] = useState<string>(email)
    const [errorNickName, setErrorNickName] = useState<boolean>(false)
    const [errorEmailValue, setErrorEmailValue] = useState<boolean>(false)

    const saveButtonDisable = !nickNameValue || !emailValue || errorNickName || errorEmailValue

    const changeProfileData = () => {
        dispatch(changeProfileDataTC(nickNameValue, 'http://amintl.com.pk/wp-content/uploads/2019/11/avatar3.png'))
    }

    return <div className={styles.container}>
        <h2>Personal Information</h2>
        <img src={avatar} alt={'avatar'}/>
        <Input
            value={nickNameValue}
            onChangeText={setNickNameValue}
            error={errorNickName}
            onChangeError={setErrorNickName}/>
        <Input
            value={emailValue}
            onChangeText={setEmailValue}
            error={errorEmailValue}
            onChangeError={setErrorEmailValue}/>
        <Button>Cancel</Button>
        <Button disabled={saveButtonDisable} onClick={changeProfileData}>Save</Button>

    </div>
}