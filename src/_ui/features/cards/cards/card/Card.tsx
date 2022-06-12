import React from 'react';
import styles from './card.module.scss';

type CardPropsType = {
    _id: string
    answer?: string
    question?: string
    cardsPack_id?: string
    grade?: number | string
    shots?: number
    user_id?: string
    created?: string
    updated?: string
    header?: boolean
}


export const Card: React.FC<CardPropsType> = (props) => {

    const {
        answer,
        question,
        grade,
        updated,
        header
    } = props

    return (
        <div className={styles.row}>
            <span>{question}</span>
            <span>{answer}</span>
            <span>{header
                ? updated
                : new Date(String(updated)).toLocaleString()}</span>
            <span className={styles.grade}>{grade}</span>
        </div>
    );
};
