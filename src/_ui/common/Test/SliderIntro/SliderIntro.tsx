import React, {useState} from 'react';
import styles from '../TestBlocks.module.scss';
import {dataTestPage} from '../../../../utils/_values';
import {Slider} from '../../_superComponents/Slider/Slider';

type maxMinValueType = {
    min: number
    max: number
}

export const SliderIntro = () => {
    const [value, setValue] = useState<maxMinValueType>({min: 0, max: 40})
    const item = dataTestPage.slider
    const onMouseUpSliderHandler = ({min, max}: maxMinValueType) => {
        setValue({min, max})
    }

    return (
        <div className={styles.innerBlock}>
            <div className={styles.description}>
                <h3>{item.header}</h3>
                <span>{item.comments[0]}</span>
            </div>
            <div>
                <Slider min={Number(value.min)}
                        max={Number(value.max)}
                        minDefault={0}
                        maxDefault={40}
                        onMouseUp={onMouseUpSliderHandler}/>
            </div>
        </div>
    );
};