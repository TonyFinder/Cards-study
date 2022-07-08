import React, {useState} from 'react';
import styles from '../TestBlocks.module.scss';
import {StarRating} from '../../_superComponents/StarRating/StarRating';

export const StarRatingIntro = () => {
    const [grade, setGrade] = useState<string>('2.5')

    return (
        <div className={styles.innerBlock}>
            <div className={styles.innerBlock}>
                <div className={styles.description}>
                    <h3>Star Rating</h3>
                </div>
                <div>
                    <StarRating grade={+grade}/>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <p style={{padding: '10px'}}>Enter a grade you want to display</p>
                    <input type={'number'}
                           style={{textAlign: 'center'}}
                           value={grade}
                           min={0}
                           max={5}
                           onChange={(e)=>setGrade(e.currentTarget.value)}/>
                </div>
            </div>
        </div>
    )
}