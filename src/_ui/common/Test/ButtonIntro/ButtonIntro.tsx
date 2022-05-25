import React from 'react';
import styles from '../TestBlocks.module.scss';
import {Button} from '../../_superComponents/Button/Button';
import {dataTestPage} from '../../../../utils/_values';

export const ButtonIntro = () => {
    return (
        <div className={styles.innerBlock}>
            <div className={styles.description}>
                <h3>{dataTestPage.button.header}</h3>
                {dataTestPage.button.comments.map((comment, i) => <span key={i}>{comment}</span>)}
            </div>
            <div>
                {dataTestPage.button.rowFirst.map(item =>
                    <Button key={item.id} color={item.color} disabled={item.disable}>{item.title}</Button>)}
            </div>
        </div>
    );
};