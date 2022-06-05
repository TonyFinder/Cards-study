import React, {useEffect} from 'react';
import styles from './App.module.scss';
import {Header} from './Header/Header';
import {Router} from './Router/Router';
import {useAppDispatch, useCustomSelector} from '../../../_bll/main/store';
import {initializeAppTC} from '../../../_bll/main/appReducer';
import { Loader } from '../../common/_superComponents/Loader/Loader';

export const App = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useCustomSelector<boolean>(state => state.app.isInitialized)

    useEffect(()=> {
        dispatch(initializeAppTC())
        // eslint-disable-next-line 
    }, [])

    if (!isInitialized) {
        return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 500}}>
            <Loader color='#fd974f'/>
        </div>
    }

    return <div className={styles.App}>
        <Header/>
        <Router/>
    </div>
}