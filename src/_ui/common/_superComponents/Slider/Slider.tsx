import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import styles from './Slider.module.scss'

type SliderPropsType = {
    min: number
    max: number
    minDefault: number
    maxDefault: number
    disabled?: boolean
    onMouseUp: ({min, max}: maxMinValueType) => void
    changeSlider?: boolean
}
export type maxMinValueType = {
    min: number
    max: number
}

export const Slider = ({minDefault, maxDefault, disabled, onMouseUp, changeSlider}: SliderPropsType) => {

    const [minVal, setMinVal] = useState(0);
    const [maxVal, setMaxVal] = useState(0);
    const range = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMinVal(minDefault)
        setMaxVal(maxDefault)
    }, [minDefault, maxDefault, changeSlider])

    return (
        <div className={styles.container}>
            <input
                type="range"
                min={minDefault}
                max={maxDefault}
                value={minVal}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.min(Number(event.target.value), maxVal);
                    setMinVal(value);
                }}
                className={`${styles.thumb} ${styles.thumbLeft}`}
                onMouseUp={() => onMouseUp({min: minVal, max: maxVal})}
                disabled={disabled}
            />
            <input
                type="range"
                min={minDefault}
                max={maxDefault}
                value={maxVal}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.max(Number(event.target.value), minVal);
                    setMaxVal(value);
                }}
                className={`${styles.thumb} ${styles.thumbRight}`}
                onMouseUp={() => onMouseUp({min: minVal, max: maxVal})}
                disabled={disabled}
            />

            <div className={styles.slider}>
                <div className={styles.slider__track}></div>
                <div ref={range} className={styles.slider__range}></div>
                <div className={styles.slider__leftValue}>{minVal}</div>
                <div className={styles.slider__rightValue}>{maxVal}</div>
            </div>
        </div>
    );
}