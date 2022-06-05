import styles from './authVadim.module.scss'
import {Input} from "../../../common/_superComponents/Input/Input";
import {Button} from "../../../common/_superComponents/Button/Button";
import {Checkbox} from "../../../common/_superComponents/Checkbox/Checkbox";
import {useState} from "react";
import {Link, Navigate} from 'react-router-dom';
import {useAppDispatch, useCustomSelector} from "../../../../_bll/main/store";
import {setDataUserTC} from "../../../../_bll/features/profile/profileReducer";
import {loginInitialStateType} from "../../../../_bll/features/auth/_login/loginReducer";
import {useFormik} from "formik";
import {ROUTE_PATHS} from "../../../../utils/_values";


export const Login = () => {

    const {isLoggedIn, error} = useCustomSelector<loginInitialStateType>(state => state.login)
    const dispatch = useAppDispatch()

    const [typeInput, setTypeInput] = useState("password");

    const onClickShowPasswordHandler = () => {
        setTypeInput(typeInput === "password" ? "text" : "password")
    }

    const formik = useFormik({
        initialValues: {
            email: 'nya-admin@nya.nya',
            password: '1qazxcvBG',
            rememberMe: true,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required'
            } else if (values.password.length < 2) {
                errors.password = 'Invalid password';
            }
            return errors;
        },

        onSubmit: values => {
            dispatch(setDataUserTC(values.email, values.password, values.rememberMe))
            formik.resetForm()
        },
    })


    if (isLoggedIn) {
        return <Navigate to={ROUTE_PATHS.PROFILE}/>
    }

    return (
        <div className={styles.block}>
            <div className={styles.container}>
                <h1>It-incubator</h1>
                <h3>Sign in</h3>
                <div className={styles.error}>{error && error}</div>
                <form onSubmit={formik.handleSubmit}>

                    <Input
                        id='Email'
                        sign="Email"
                        type='text'
                        placeholder='Email'
                        error={!!formik.errors.email}
                        {...formik.getFieldProps('email')}
                    />
                    <div>
                        {formik.touched.email && formik.errors.email ? formik.errors.email : null}
                    </div>

                    <Input
                        id='Password'
                        sign="Password"
                        type={typeInput}
                        placeholder='Password'
                        error={!!formik.errors.password}
                        {...formik.getFieldProps('password')}
                    />
                    <div>
                        {formik.touched.password && formik.errors.password ? formik.errors.password : null}
                    </div>

                    <span onClick={onClickShowPasswordHandler}>👀</span>
                    <Link to={ROUTE_PATHS.FORGOT}>Forgot Password</Link>

                    <Checkbox
                        {...formik.getFieldProps('rememberMe')}
                        checked={formik.getFieldProps('rememberMe').checked}
                    >Remember me
                    </Checkbox>

                    <Button type={'submit'}>Login</Button>
                </form>

                <span>Don’t have an account?</span>
                <Link to={ROUTE_PATHS.REGISTER}>Sign Up</Link>
            </div>
        </div>
    )
}

//types
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
