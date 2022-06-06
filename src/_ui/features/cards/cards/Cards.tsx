import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useCustomSelector} from "../../../../_bll/main/store";
import {Input} from "../../../common/_superComponents/Input/Input";
import {Card} from "./card/Card";
import {setCardsTC} from "../../../../_bll/features/cards/cardsReducer";
import styles from './cards.module.scss';
import {CardsType} from "../../../../_dal/api-vadim";

const headerTable = {
    _id: '_id',
    answer: 'answer',
    question: 'question',
    grade: 'grade',
    updated: 'updated',
    header: true
}


export const Cards = () => {

    const {cards} = useCustomSelector<CardsType>(state => state.cards);

    let {packId, packName} = useParams()
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setCardsTC({cardsPack_id: packId, pageCount: 7, sortCards: '0updated', page: 1}))
    }, []);


    return (
        <div className={styles.block}>
            <div className={styles.container}>
                <div className={styles.input}>
                    <h2>{packName} </h2>
                    <div>
                        <Input type='text'/>
                        <Input type='text'/>
                    </div>
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