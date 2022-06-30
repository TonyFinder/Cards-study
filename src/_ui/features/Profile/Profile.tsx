import styles from '../Template.module.scss'
import {Input} from '../../common/_superComponents/Input/Input';
import {Button} from '../../common/_superComponents/Button/Button';
import {useAppDispatch, useCustomSelector} from '../../../_bll/main/store';
import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {changeProfileDataTC, logoutTC} from '../../../_bll/features/profile/profileReducer';
import {AuthDataType} from '../../../_dal/api-auth';
import {COLORS, ROUTE_PATHS} from '../../../utils/_values';
import {Navigate} from 'react-router-dom';
import {Loader} from '../../common/_superComponents/Loader/Loader';
import {LoadingStatusType} from '../../../utils/enums';
import {addNotification} from "../../../_bll/main/appReducer";
import {v1} from "uuid";

export const Profile = () => {
    const {name, email, avatar} = useCustomSelector<AuthDataType>(state => state.profile)
    const isLoggedIn = useCustomSelector<boolean>(state => state.login.isLoggedIn)
    const loading = useCustomSelector<LoadingStatusType>(state => state.app.loadingStatus)
    let dispatch = useAppDispatch()

    const inRef = useRef<HTMLInputElement>(null);
    const [fileURL, setFileURL] = useState<any>();
    const [file64, setFile64] = useState<any>();
    const [file, setFile] = useState<any>();
    const [error, setError] = useState<any>(true);

    const [nickNameValue, setNickNameValue] = useState<string>(name)
    const [errorNickName, setErrorNickName] = useState<boolean>(false)

    const saveButtonDisable = !nickNameValue || errorNickName || error

    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const newFile = e.target.files && e.target.files[0];

        if (newFile) {
            setFile(newFile);
            setFileURL(window.URL.createObjectURL(newFile));
            reader.onloadend = () => {
                setFile64(reader.result);
            };
            reader.readAsDataURL(newFile);
        }
    };

    useEffect(() => {
        if (name !== nickNameValue || file !== undefined) {
            setError(false)
        } else {
            setError(true)
        }
        if (file && +file.size >= 2097152) {
            setError(true)
        }
    }, [nickNameValue, name, file])

    useEffect(() => {
        if (file !== undefined) {
            if (+file.size <= 2097152) {
                setError(false)
            } else {
                setError(true)
                dispatch(addNotification({
                    type: "error",
                    message: `Image size should not exceed 2 megabytes`,
                    id: v1(),
                }))
            }
        }
    }, [file, dispatch])

    const changeProfileData = () => {
        dispatch(changeProfileDataTC(nickNameValue, file64))
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
                <input
                    ref={inRef}
                    type={'file'}
                    style={{display: 'none'}}
                    onChange={upload}
                    accept=".jpg, .jpeg, .png"
                />
                <span onClick={() => inRef && inRef.current && inRef.current.click()}
                      className={styles.changeAvatar}>&#128393;</span>
                <Button className={styles.logout} onClick={logoutHandler}
                        disabled={loading === LoadingStatusType.active}>Logout</Button>
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
                {loading === LoadingStatusType.disabled
                    ? <Button color={COLORS.MAIN_DARK} disabled={saveButtonDisable}
                              onClick={changeProfileData}>Save</Button>
                    : <Loader color={COLORS.MAIN_DARK}/>
                }
            </div>
        </div>
    </div>
}

