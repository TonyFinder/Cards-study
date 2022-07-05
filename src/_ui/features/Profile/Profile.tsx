import styles from '../Template.module.scss'
import {Input} from '../../common/_superComponents/Input/Input';
import {Button} from '../../common/_superComponents/Button/Button';
import {useAppDispatch, useCustomSelector} from '../../../_bll/main/store';
import React, {useState} from 'react';
import {changeProfileDataTC, logoutTC} from '../../../_bll/features/profile/profileReducer';
import {AuthDataType} from '../../../_dal/api-auth';
import {COLORS, ROUTE_PATHS} from '../../../utils/_values';
import {Navigate} from 'react-router-dom';
import {Loader} from '../../common/_superComponents/Loader/Loader';
import {LoadingStatusType} from '../../../utils/enums';
import {InputImg} from "./components/InputImg";

export const Profile = () => {
    const {name, email, avatar} = useCustomSelector<AuthDataType>(state => state.profile)
    const isLoggedIn = useCustomSelector<boolean>(state => state.auth.isLoggedIn)
    const loading = useCustomSelector<LoadingStatusType>(state => state.app.loadingStatus)
    let dispatch = useAppDispatch()

    const [fileURL, setFileURL] = useState<any>();
    const [file64, setFile64] = useState<any>();
    const [error, setError] = useState<boolean>(true);
    const [errorTypeFile, setErrorTypeFile] = useState<boolean>(false);

    const [nickNameValue, setNickNameValue] = useState<string>(name)
    const [errorNickName, setErrorNickName] = useState<boolean>(false)


    const checkChangeName = name !== nickNameValue
    const saveButtonDisable = !nickNameValue || errorNickName || error


    const changeProfileData = () => {
        if (saveButtonDisable || errorTypeFile) return
        dispatch(changeProfileDataTC(nickNameValue, file64))
        setError(true)
        setErrorTypeFile(true)
    }
    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isLoggedIn) return <Navigate to={ROUTE_PATHS.LOGIN}/>

    return <div className={styles.container}>
        <div className={styles.block}>

            <h2 className={styles.headerSecond}>Personal Information</h2>

            <div className={styles.image}>
                <img src={fileURL ? fileURL : avatar} alt={'avatar'}/>
                <InputImg
                    title="&#128393;"
                    nickNameValue={nickNameValue}
                    checkChangeName={checkChangeName}
                    setError={setError}
                    setErrorTypeFile={setErrorTypeFile}
                    setFileURL={setFileURL}
                    setFile64={setFile64}/>
                <Button className={styles.logout} onClick={logoutHandler}
                        disabled={loading === LoadingStatusType.active}>Logout</Button>
            </div>

            <div className={styles.inputContainer}>
                <Input
                    value={nickNameValue}
                    sign='Nickname'
                    error={errorNickName}
                    disabled={loading === LoadingStatusType.active}
                    onChangeText={setNickNameValue}
                    onEnter={changeProfileData}
                    onChangeError={setErrorNickName}/>
                <Input
                    value={email}
                    sign='Email'
                    disabled/>
            </div>

            <div className={styles.button}>
                {loading === LoadingStatusType.disabled
                    ? <Button color={COLORS.MAIN_DARK} disabled={saveButtonDisable}
                              onClick={changeProfileData}>Save</Button>
                    : <Loader color={COLORS.MAIN_DARK}/>
                }
            </div>
        </div>
    </div>
}

