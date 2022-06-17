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
                <span>We've sent an email with instructions to <br/> <b>{email ? email : 'exmple@email.com'}</b></span><br/><br/><br/>
                <span>You can close this window and click on the link from our email to continue the password recovery.</span>
            </div>
        </div>
    </div>
}