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

export const Slider = ({min, max, minDefault, maxDefault, disabled, onMouseUp, changeSlider}: SliderPropsType) => {

    const [minVal, setMinVal] = useState(0);
    const [maxVal, setMaxVal] = useState(0);
    const minValRef = useRef(0);
    const maxValRef = useRef(0);
    const range = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMinVal(minDefault)
        setMaxVal(maxDefault)
    }, [minDefault, maxDefault, changeSlider])


    // Need to change some logic or just delete it
    // Convert to percentage
    /* const getPercent = useCallback((value: number) =>
         Math.ceil(((value - minDefault) / (maxDefault - minDefault)) * 100), [minDefault, maxDefault, changeSlider])
 */

    /*   const getPercent = (value: number) => {
           return (
               Math.round(((value - minDefault)/ (maxDefault - minDefault)) * 100))
       }
   */

    /* // Set width of the range to decrease from the left side
     useEffect(() => {

         const minPercent = getPercent(minVal);
         const maxPercent = getPercent(maxValRef.current);
         if (range.current) {
             range.current.style.left = `${minPercent}%`;
             range.current.style.width = `${maxPercent >= 200 ? 100 - minPercent : maxPercent - minPercent}%`;
             range.current.style.backgroundColor = '#fd974f'
         }
     }, [minVal, getPercent, maxDefault , changeSlider]);

     // Set width of the range to decrease from the right side
     useEffect(() => {
         const minPercent = getPercent(minValRef.current);
         const maxPercent = getPercent(maxVal);
         if (range.current) {
             range.current.style.right = `${maxPercent}%`;
             /!* range.current.style.width = `${  maxPercent - (minPercent > 0 ? minPercent - 24  : minPercent)}%`;*!/
             range.current.style.width = `${maxPercent >= 200 ? 100 - minPercent : maxPercent - minPercent}%`;
         }
     }, [maxVal, getPercent, minDefault , changeSlider ]);*/

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
                  /*  minValRef.current = value;*/
                }}
                className={`${styles.thumb} ${styles.thumbLeft}`}
               /* style={{zIndex: `${minVal > max - 100 && 5}`}}*/
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
                   /* maxValRef.current = value;*/
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