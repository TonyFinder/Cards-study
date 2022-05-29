import styles from './Profile.module.scss'
import {Input} from '../../common/_superComponents/Input/Input';
import {Button} from '../../common/_superComponents/Button/Button';
import {useCustomSelector} from '../../../_bll/main/store';
import {useState} from 'react';

export const Profile = () => {
    const nickName = useCustomSelector<string>(state => state.profile.name)
    const email = useCustomSelector<string>(state => state.profile.email)
    const image = useCustomSelector<string>(state => state.profile.avatar ? state.profile.avatar : '')

    const [nickNameValue, setNickNameValue] = useState<string>(nickName)
    const [emailValue, setEmailValue] = useState<string>(email)
    const [errorNickName, setErrorNickName] = useState<boolean>(false)
    const [errorEmailValue, setErrorEmailValue] = useState<boolean>(false)

    const saveButtonDisable = !nickNameValue || !emailValue || errorNickName || errorEmailValue

    return <div className={styles.container}>
        <h2>Personal Information</h2>
        <img src={image} alt={'avatar'}/>
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
        <Button disabled={saveButtonDisable}>Save</Button>

    </div>
}