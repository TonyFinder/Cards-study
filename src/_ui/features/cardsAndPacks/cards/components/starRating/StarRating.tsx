import React, {useState} from 'react';
import styles from './starRating.module.scss'
import {useAppDispatch} from "../../../../../../_bll/main/store";
import {updateCardTC} from "../../../../../../_bll/features/cards/cardsReducer";

type StarRatingType = {
    grade: number
    cardID: string
}

export const StarRating: React.FC<StarRatingType> = ({grade, cardID}) => {
    const [hover, setHover] = useState(0)
    const dispatch = useAppDispatch()

    const onClickRatingHandler = (grade: number) => {
        dispatch(updateCardTC({_id: cardID, grade}))
    }


    return (
        <div>
            {[...Array(5)].map((m, i) => (
                <span
                    onMouseEnter={() => setHover(i + 1)}
                    onMouseLeave={() => setHover(grade)}
                    onClick={() => onClickRatingHandler(i + 1)}
                    className={i < (hover || grade) ? styles.rating : styles.notRating}>&#9733;</span>
            ))}
        </div>
    );
};
