import React, {ChangeEvent, useRef, useState} from 'react';
import styles from './Slider.module.scss'

type SliderPropsType = {
    min: number
    max: number
    minDefault: number
    maхDefault: number
    disabled?: boolean
    onMouseUp: ({min, max}: maxMinValueType) => void
}
export type maxMinValueType = {
    min: number
    max: number
}

export const Slider = ({ min, max, minDefault, maхDefault, disabled, onMouseUp }: SliderPropsType) => {

    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef<HTMLDivElement>(null);

    // Need to change some logic or just delete it
    // Convert to percentage
    /*const getPercent = useCallback((value: number) =>
        Math.round(((value - min) / (max - min)) * 100), [min, max])
*/
    // Set width of the range to decrease from the left side
    /*useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);*/

    // Set width of the range to decrease from the right side
    /*useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);*/

    return (
        <div className={styles.container}>
            <input
                type="range"
                min={minDefault}
                max={maхDefault}
                value={minVal}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.min(Number(event.target.value), maxVal);
                    setMinVal(value);
                    minValRef.current = value;
                }}
                className={`${styles.thumb} ${styles.thumbLeft}`}
                style={{zIndex: `${minVal > max - 100 && 5}`}}
                onMouseUp={() => onMouseUp({min: minVal, max: maxVal})}
                disabled={disabled}
            />
            <input
                type="range"
                min={minDefault}
                max={maхDefault}
                value={maxVal}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.max(Number(event.target.value), minVal);
                    setMaxVal(value);
                    maxValRef.current = value;
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