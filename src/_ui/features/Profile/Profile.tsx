import styles from './Profile.module.scss'
import {Input} from '../../common/_superComponents/Input/Input';
import {Button} from '../../common/_superComponents/Button/Button';
import {useAppDispatch, useCustomSelector} from '../../../_bll/main/store';
import {useState} from 'react';
import {changeProfileDataTC} from '../../../_bll/features/profile/profileReducer';
import {AuthDataType} from '../../../_dal/api-profile';
import {ROUTE_PATHS} from '../../../utils/_values';
import {Navigate} from 'react-router-dom';
import { Loader } from '../../common/_superComponents/Loader/Loader';

export const Profile = () => {
    const {name, email, avatar} = useCustomSelector<AuthDataType>(state => state.profile)
    const isLoggedIn = useCustomSelector<boolean>(state => state.login.isLoggedIn)
    let dispatch = useAppDispatch()

    const [nickNameValue, setNickNameValue] = useState<string>(name)
    const [errorNickName, setErrorNickName] = useState<boolean>(false)

    const saveButtonDisable = !nickNameValue || errorNickName || name === nickNameValue

    const changeProfileData = () => {
        dispatch(changeProfileDataTC(nickNameValue, 'http://amintl.com.pk/wp-content/uploads/2019/11/avatar3.png'))
    }

    if (!isLoggedIn) return <Navigate to={ROUTE_PATHS.LOGIN}/>

    return <div className={styles.container}>
        <div className={styles.block}>
            <h2>Personal Information</h2>
            <div className={styles.image}>
                <img src={avatar} alt={'avatar'}/>
            </div>
            <div className={styles.inputContainer}>
                <Input
                    value={nickNameValue}
                    sign='Nickname'
                    onChangeText={setNickNameValue}
                    error={errorNickName}
                    onChangeError={setErrorNickName}/>
                <Input
                    value={email}
                    sign='Email'
                    disabled/>
            </div>
            <div className={styles.button}>
                <Button color='#fd974f' disabled={saveButtonDisable} onClick={changeProfileData}>Save</Button>
                <Loader color='#fd974f'/>
            </div>
        </div>
    </div>
}
