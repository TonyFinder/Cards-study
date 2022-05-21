import React from 'react';
import styles from './App.module.scss';
import {Header} from './Header/Header';
import {Router} from './Router/Router';

export const App = () => (
    <div className={styles.App}>
        <Header/>
        <Router/>
    </div>
);