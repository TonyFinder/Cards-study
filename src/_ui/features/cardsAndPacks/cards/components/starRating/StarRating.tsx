import React, {useEffect, useRef} from 'react';
import styles from './starRating.module.scss'


type StarRatingType = {
    grade: number
}

export const StarRating: React.FC<StarRatingType> = ({grade}) => {
    const ref = useRef<HTMLDivElement>(null);

    const setRatingWidth = (grade: number) => {
        return grade / 0.5 * 10
    }

    useEffect(() => {
        const width = setRatingWidth(grade)
        if (ref.current)
            ref.current.style.width = `${width}%`
    }, [grade])

    return (
        <div className={styles.rating}>
            <div className={styles.ratingBody}>
                <div ref={ref} className={styles.ratingActive}>
                    <div className={styles.ratingItems}>
                        <input type="radio" className={styles.ratingItem} value='1'
                               name='rating'/>
                        <input type="radio" className={styles.ratingItem} value='2' name='rating'/>
                        <input type="radio" className={styles.ratingItem} value='3' name='rating'/>
                        <input type="radio" className={styles.ratingItem} value='4' name='rating'/>
                        <input type="radio" className={styles.ratingItem} value='5' name='rating'/>

                    </div>
                </div>
            </div>
            {/*<div className={styles.ratingValue}>
                {grade}
            </div>*/}
        </div>
    );
};
