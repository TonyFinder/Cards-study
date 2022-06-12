import React, {useState} from 'react';
import styles from './Template.module.scss';
import {Button} from '../common/_superComponents/Button/Button';
import {LoadingStatusType} from '../../utils/enums';
import {Input} from '../common/_superComponents/Input/Input';
import {Loader} from '../common/_superComponents/Loader/Loader';
import {useAppDispatch, useCustomSelector} from '../../_bll/main/store';
import {AuthDataType} from '../../_dal/api-anton';
import {changeProfileDataTC, logoutTC} from '../../_bll/features/profile/profileReducer';
import {Navigate} from 'react-router-dom';
import {COLORS, ROUTE_PATHS} from '../../utils/_values';

export const Template = () => {

    // Вытягивание данных изначальных значений для Input, ссылка на Avatar
    const {name, email, avatar} = useCustomSelector<AuthDataType>(state => state.profile)
    // Проверка на залогирование
    const isLoggedIn = useCustomSelector<boolean>(state => state.login.isLoggedIn)
    // Проверка на статус запроса для крутилки
    const loading = useCustomSelector<LoadingStatusType>(state => state.app.loadingStatus)

    let dispatch = useAppDispatch()
    // Изменение value для Input
    const [nickNameValue, setNickNameValue] = useState<string>(name)
    const [emailValue, setEmailValue] = useState<string>(email)
    // Проверка на валидацию для Input
    const [errorNickName, setErrorNickName] = useState<boolean>(false)
    const [errorEmail, setErrorEmail] = useState<boolean>(false)
    // Задизейбливание кнопок. Зависит: пустое значение, ошибка в Input, изходное имя такое же, как изменённое и тд.
    // Настраивается индивидуально для каждой кнопки
    const saveButtonDisable = !nickNameValue || errorNickName || name === nickNameValue

    // Запрос на сервер по нажатию Button
    const changeProfileData = () => {
        dispatch(changeProfileDataTC(nickNameValue, 'http://amintl.com.pk/wp-content/uploads/2019/11/avatar3.png'))
    }
    // Запрос на вылогирование для кнопки Logout
    const logoutHandler = () => {
        dispatch(logoutTC())
    }
    // Редирект на Login page если не залогинен
    if (!isLoggedIn) return <Navigate to={ROUTE_PATHS.LOGIN}/>


    return <div className={styles.container}>
        <div className={styles.block}>

            {/*Кнопка logout для Profile*/}
            <Button className={styles.logout} onClick={logoutHandler}
                    disabled={loading === LoadingStatusType.active}>Logout</Button>

            {/*Заголовок первого уровня, названия игры*/}
            <h2 className={styles.headerMain}>Smart Cards</h2>

            {/*Заголовок второго уровня, после названия игры*/}
            <h2 className={styles.headerSecond}>Personal Information</h2>

            {/*Картинка для Profile и для Check Email*/}
            <div className={styles.image}>
                <img src={avatar} alt={'avatar'}/>
            </div>

            {/*Блок для Input, Textarea, Radio*/}
            <div className={styles.inputContainer}>
                <Input
                    value={nickNameValue}
                    sign='Nickname'
                    onChangeText={setNickNameValue}
                    error={errorNickName}
                    onChangeError={setErrorNickName}/>
                <Input
                    value={emailValue}
                    sign='Email'
                    onChangeText={setEmailValue}
                    error={errorEmail}
                    onChangeError={setErrorEmail}/>
                <Input
                    value={email}
                    sign='Email'
                    disabled/>
            </div>

            {/*Блок для одной Button. Дизейбл для примера только на изменение Nickname*/}
            <div className={styles.button}>
                {loading === LoadingStatusType.disabled
                    ?<Button color={COLORS.MAIN_DARK} disabled={saveButtonDisable} onClick={changeProfileData}>Save</Button>
                    :<Loader color={COLORS.MAIN_DARK}/>
                }
            </div>

            {/*Блок для двух Button*/}
            <div className={styles.button}>
                {loading === LoadingStatusType.disabled
                    ? <>
                        <Button color={COLORS.MAIN_DARK} disabled={saveButtonDisable}
                                onClick={changeProfileData}>Save</Button>
                        <Button color={COLORS.MAIN_DARK} disabled={saveButtonDisable}
                                onClick={changeProfileData}>Saving</Button>
                    </>
                    : <Loader color={COLORS.MAIN_DARK}/>
                }
            </div>


        </div>
    </div>
}