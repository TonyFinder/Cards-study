import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useCustomSelector} from "../../../../_bll/main/store";
import {Card} from "./card/Card";
import {initialStateCardsType, setCardsTC, setCurrentPageCards} from "../../../../_bll/features/cards/cardsReducer";
import styles from './cards.module.scss';
import {InputComponentForCards} from "../../../../_bll/features/cards/components/InputComponentForCards";
import {Pagination} from "../packs/components/pagination/Pagination";

const headerTable = {
    _id: '_id',
    answer: 'answer',
    question: 'question',
    grade: 'grade',
    updated: 'updated',
    header: true
}


export const Cards = () => {

    const {
        cards,
        cardParams,
        page,
        pageCount,
        cardsTotalCount
    } = useCustomSelector<initialStateCardsType>(state => state.cards);


    let {packId, packName} = useParams()
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setCardsTC({cardsPack_id: packId,}))
    }, [packId, dispatch, cardParams]);


    const onPageChangeHandler = (page: number | string) => {
        dispatch(setCurrentPageCards(+page))
    }

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
                    <Pagination
                        siblingCount={1}
                        pageSize={pageCount}
                        className=""
                        totalCount={cardsTotalCount}
                        currentPage={page}
                        onPageChange={onPageChangeHandler}
                    />
                </div>
            </div>

        </div>
    );
};