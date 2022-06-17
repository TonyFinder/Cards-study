import React, {useState} from 'react';
import styles from './Template.module.scss';
import {Button} from '../common/_superComponents/Button/Button';
import {LoadingStatusType} from '../../utils/enums';
import {Input} from '../common/_superComponents/Input/Input';
import {Loader} from '../common/_superComponents/Loader/Loader';
import {useCustomSelector} from '../../_bll/main/store';
import {AuthDataType} from '../../_dal/api-auth';
import {COLORS, ROUTE_PATHS} from '../../utils/_values';
import {Checkbox} from '../common/_superComponents/Checkbox/Checkbox';
import {Link} from 'react-router-dom';
import {Radio} from '../common/_superComponents/Radio/Radio';

export const Template = () => {

    // Вытягивание данных изначальных значений для Input, ссылка на Avatar
    const {name, email, avatar} = useCustomSelector<AuthDataType>(state => state.profile)
    // Проверка на статус запроса для крутилки
    const loading = useCustomSelector<LoadingStatusType>(state => state.app.loadingStatus)
    const error = 'Error is here'

    // Изменение value для Input
    const [nickNameValue, setNickNameValue] = useState<string>(name)
    const [emailValue, setEmailValue] = useState<string>(email)
    // Проверка на валидацию для Input
    const [errorNickName, setErrorNickName] = useState<boolean>(false)
    const [errorEmail, setErrorEmail] = useState<boolean>(false)
    // Для Input с паролем
    const [passwordValue, setPasswordValue] = useState<string>('pass')
    const [errorPassword, setErrorPassword] = useState<boolean>(false)
    const [typeInput, setTypeInput] = useState("password")
    const onClickShowPasswordHandler = () => {
        setTypeInput(typeInput === "password" ? "text" : "password")
    }
    // Данные дла Radio
    const [radioSelect, setRadioSelect] = useState<{id: number, title: string, selected: boolean}[]>([
        {id: 0, title: 'Yes', selected: false},
        {id: 1, title: 'No', selected: false},
        {id: 2, title: 'Maybe', selected: false},
        {id: 3, title: 'Confused', selected: false},
        {id: 4, title: 'Knew the answer', selected: false},
    ])
    const onClickRadio = (position: number) => {
        setRadioSelect(radioSelect.map(item =>
            item.id === position
                ? {...item, selected: true}
                : {...item, selected: false}))
    }

    // Задизейбливание кнопок. Зависит: пустое значение, ошибка в Input, изходное имя такое же, как изменённое и тд.
    // Настраивается индивидуально для каждой кнопки
    const saveButtonDisable = !nickNameValue || errorNickName || name === nickNameValue

    // Редирект на Login page если не залогинен
    /*if (!isLoggedIn) return <Navigate to={ROUTE_PATHS.LOGIN}/>*/


    return <div className={styles.container}>
        <div className={styles.block}>
            {/*Error*/}
            <div className={styles.error}>{error}</div>

            {/*Заголовок первого уровня, названия игры*/}
            <h1 className={styles.headerMain}>Smart Cards</h1>

            {/*Заголовок второго уровня, после названия игры*/}
            <h2 className={styles.headerSecond}>Personal Information</h2>

            {/*Картинка для Profile и для Check Email*/}
            <div className={styles.image}>
                <img src={avatar} alt={'avatar'}/>
                {/*Кнопка logout для Profile*/}
                <Button className={styles.logout} onClick={()=>''}
                        disabled={loading === LoadingStatusType.active}>Logout</Button>
            </div>

            {/*Блок для Input, Textarea, Radio*/}
            <div className={styles.inputContainer}>
                <Input
                    value={nickNameValue}
                    sign='Nickname'
                    color={COLORS.MAIN_DARK}
                    onChangeText={setNickNameValue}
                    error={errorNickName}
                    onChangeError={setErrorNickName}/>
                <Input
                    value={emailValue}
                    sign='Email'
                    color={COLORS.MAIN_DARK}
                    onChangeText={setEmailValue}
                    error={errorEmail}
                    onChangeError={setErrorEmail}/>
                <Input
                    value={email}
                    sign='Email'
                    disabled/>
                {/*Блок Password с глазами*/}
                <div className={styles.inputPass}>
                    <Input
                        value={passwordValue}
                        type={typeInput}
                        sign="Password"
                        color={COLORS.MAIN_DARK}
                        onChangeText={setPasswordValue}
                        error={errorPassword}
                        onChangeError={setErrorPassword}/>
                    <span className={styles.hidePass} onClick={onClickShowPasswordHandler}>👀</span>
                    <Link to={ROUTE_PATHS.FORGOT}>Forgot Password</Link>
                </div>
                <div className={styles.checkbox}>
                    <Checkbox color={COLORS.MAIN_DARK}>Remember me</Checkbox>
                </div>
            </div>

            {/*Блок для описания действия. Forgot и Create password*/}
            <div className={styles.description}>
                <span>Enter your email address and we will send you further instructions</span>
            </div>

            {/*Блок вопрос/ответ*/}
            <div className={styles.question_answer}>
                <p><b>Question: </b>I am question here</p>
                <p><b>Answer: </b>I am answer here</p>
            </div>

            {/*Блок с оценкой себя*/}
            <div className={styles.rateYourself}>
                <p><b>Rate yourself:</b></p>
                <div>
                    {radioSelect.map(item =>
                        <Radio key={item.id}
                               color={COLORS.MAIN_DARK}
                               checked={item.selected}
                               onClick={() => onClickRadio(item.id)}
                        >{item.title}</Radio>)}
                </div>
            </div>


            {/*Блок для одной Button. Дизейбл для примера только на изменение Nickname*/}
            <div className={styles.buttonBig}>
                {loading === LoadingStatusType.disabled
                    ?<Button color={COLORS.MAIN_DARK} disabled={saveButtonDisable} onClick={()=>''}>Save</Button>
                    :<Loader color={COLORS.MAIN_DARK}/>
                }
            </div>

            {/*Блок для одной большой Button.*/}
            <div className={styles.button}>
                {loading === LoadingStatusType.disabled
                    ?<Button color={COLORS.MAIN_DARK} disabled={saveButtonDisable} onClick={()=>''}>Save</Button>
                    :<Loader color={COLORS.MAIN_DARK}/>
                }
            </div>

            {/*Блок для двух Button*/}
            <div className={styles.button}>
                {loading === LoadingStatusType.disabled
                    ? <>
                        <Button color={COLORS.MAIN_DARK} disabled={saveButtonDisable}
                                onClick={()=>''}>Save</Button>
                        <Button color={COLORS.MAIN_DARK} disabled={saveButtonDisable}
                                onClick={()=>''}>Saving</Button>
                    </>
                    : <Loader color={COLORS.MAIN_DARK}/>
                }
            </div>

            {/*Текс после кнопок*/}
            <div className={styles.bottomText}>
                <span>Don’t have an account?</span>
                <Link to={ROUTE_PATHS.REGISTER}>Sign Up</Link>
            </div>
        </div>
    </div>
}