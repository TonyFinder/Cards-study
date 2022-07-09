import React, {useEffect} from 'react';
import styles from './App.module.scss';
import {Header} from './Header/Header';
import {Router} from './Router/Router';
import {useAppDispatch, useCustomSelector} from '../../../_bll/main/store';
import {initializeAppTC} from '../../../_bll/main/appReducer';
import { Loader } from '../../common/_superComponents/Loader/Loader';
import {COLORS} from '../../../utils/_values';

export const App = React.memo( () => {
    const dispatch = useAppDispatch()
    const isInitialized = useCustomSelector<boolean>(state => state.app.isInitialized)
    const isLoggedIn = useCustomSelector<boolean>(state => state.auth.isLoggedIn)

    useEffect(()=> {
        dispatch(initializeAppTC())
    }, [dispatch])

    return <div className={styles.App}>
        {isInitialized
            ? isLoggedIn
                ? <>
                    <Header/>
                    <Router/>
                </>
                : <Router/>
            : <div className={styles.loader}>
                <div>
                    <Loader color={COLORS.MAIN_DARK}/>
                </div>
            </div>
        }
    </div>
})