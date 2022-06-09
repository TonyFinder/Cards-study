import React from 'react';
import styles from '../TestBlocks.module.scss';
import {dataTestPage} from '../../../../utils/_values';
import {SortButton} from '../../_superComponents/SortButton/SortButton';

export const SortButtonIntro = () => {
    return (
        <div className={styles.innerBlock}>
            <div className={styles.description}>
                <h3>{dataTestPage.sortButton.header}</h3>
                {dataTestPage.sortButton.comments.map((comment, i) => <span key={i}>{comment}</span>)}
            </div>
            <div>
                {dataTestPage.sortButton.rowFirst.map(item =>
                    <SortButton key={item.id} title={item.title} value={item.value} color={item.color}/>)}
            </div>
        </div>
    );
};