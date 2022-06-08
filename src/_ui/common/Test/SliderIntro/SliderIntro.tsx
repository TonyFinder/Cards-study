import React from 'react';
import styles from '../TestBlocks.module.scss';
import {dataTestPage} from '../../../../utils/_values';
import {Slider} from '../../_superComponents/Slider/Slider';

export const SliderIntro = () => {
    return (
        <div className={styles.innerBlock}>
            <div className={styles.description}>
                <h3>{dataTestPage.slider.header}</h3>
                {dataTestPage.slider.comments.map((comment, i) => <span key={i}>{comment}</span>)}
            </div>
            <div>
                {dataTestPage.slider.rowFirst.map(item =>
                    <Slider key={item.id} min={item.min} max={item.max}/>)}
            </div>
        </div>
    );
};