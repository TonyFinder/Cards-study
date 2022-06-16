import styles from '../../Template.module.scss'
import React from 'react';
import emailCheck from '../../../../rest/images/emailCheck.png'
import {useParams} from "react-router-dom";

export const CheckEmail = () => {


    let {email} = useParams<string>()

    return <div className={styles.container}>
        <div className={styles.block}>
            <h2 className={styles.headerSecond}>Check your email</h2>

            <div className={styles.image}>
                <img src={emailCheck} alt={'avatar'}/>
            </div>

            <div className={styles.description}>
                <span>We've sent an email with instructions to <br/> {email ? email : 'exmple@email.com'}</span>
            </div>
        </div>
    </div>
}