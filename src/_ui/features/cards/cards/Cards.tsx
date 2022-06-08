import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useCustomSelector} from "../../../../_bll/main/store";
import {Card} from "./card/Card";
import {initialStateCardsType, setCardsTC} from "../../../../_bll/features/cards/cardsReducer";
import styles from './cards.module.scss';
import {InputComponentForCards} from "../../../../_bll/features/cards/components/InputComponentForCards";

const headerTable = {
    _id: '_id',
    answer: 'answer',
    question: 'question',
    grade: 'grade',
    updated: 'updated',
    header: true
}


export const Cards = () => {

    const {cards, cardParams} = useCustomSelector<initialStateCardsType>(state => state.cards);

    let {cardAnswer, cardQuestion} = cardParams

    let {packId, packName} = useParams()
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setCardsTC({
            page: 1,
            pageCount: 7, cardsPack_id: packId, cardAnswer, cardQuestion,

        }))
    }, [packId, dispatch, cardParams]);


    return (
        <div className={styles.block}>
            <div className={styles.container}>
                <div className={styles.input}>
                    <h2>{packName} </h2>
                    <InputComponentForCards/>
                </div>
                <div className={styles.table}>
                    <Card {...headerTable}/>
                    {cards.map(p => <Card {...p}/>)}
                </div>
                <div className={styles.page}>
                    Pagination <br/>
                </div>
            </div>

        </div>
    );
};