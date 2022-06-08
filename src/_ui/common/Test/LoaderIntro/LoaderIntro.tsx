import React from 'react';
import styles from '../TestBlocks.module.scss';
import {dataTestPage} from '../../../../utils/_values';
import { Loader } from '../../_superComponents/Loader/Loader';

export const LoaderIntro = () => {
    return (
        <div className={styles.innerBlock}>
            <div className={styles.description}>
                <h3>{dataTestPage.loader.header}</h3>
                {dataTestPage.loader.comments.map((comment, i) => <span key={i}>{comment}</span>)}
            </div>
            <div>
                {dataTestPage.loader.rowFirst.map(item =>
                    <Loader key={item.id} color='#fd974f'/>)}
            </div>
        </div>
    );
};