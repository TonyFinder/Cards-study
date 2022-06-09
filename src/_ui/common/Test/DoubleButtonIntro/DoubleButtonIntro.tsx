import React from 'react';
import styles from '../TestBlocks.module.scss';
import {dataTestPage} from '../../../../utils/_values';
import {DoubleButton} from '../../_superComponents/DoubleButton/DoubleButton';

export const DoubleButtonIntro = () => {
    return (
        <div className={styles.innerBlock}>
            <div className={styles.description}>
                <h3>{dataTestPage.doubleButton.header}</h3>
                {dataTestPage.doubleButton.comments.map((comment, i) => <span key={i}>{comment}</span>)}
            </div>
            <div>
                {dataTestPage.doubleButton.rowFirst.map(item =>
                    <DoubleButton key={item.id} activeColor={item.activeColor} disableColor={item.disableColor} active={item.active}/>)}
            </div>
        </div>
    );
};