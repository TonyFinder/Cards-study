import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useCustomSelector} from "../../../../_bll/main/store";
import {Card} from "./card/Card";
import {
    initialStateCardsType,
    setCardsTC, updateCardParams,
} from "../../../../_bll/features/cards/cardsReducer";
import styles from './cards.module.scss';
import {InputComponentForCards} from "./components/input/InputComponentForCards";
import {Pagination} from "../packs/components/pagination/Pagination";
import {LoadingStatusType} from "../../../../utils/enums";
import {Loader} from "../../../common/_superComponents/Loader/Loader";
import {COLORS} from "../../../../utils/_values";

const headerTable = {
    _id: '_id',
    answer: 'Answer',
    question: 'Question',
    grade: 'Grade',
    updated: 'Updated',
    header: true
}

export const Cards = () => {
    let {packId, packName} = useParams()
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        cards,
        cardParams,
        page,
        pageCount,
        cardsTotalCount,
        packUserId,
    } = useCustomSelector<initialStateCardsType>(state => state.cards);
    const userId = useCustomSelector<string>(state => state.profile._id)
    const loading = useCustomSelector<LoadingStatusType>(state => state.app.loadingStatus)

    const disabled = loading === LoadingStatusType.active

    // Detect sorting column
    const sortCards = useCustomSelector<string>(state => state.cards.cardParams.sortCards ? state.cards.cardParams.sortCards : '')
    const direction = sortCards.slice(0, 1)
    const column = sortCards.slice(1)

    useEffect(() => {
        dispatch(updateCardParams({cardsPack_id: packId}))
    }, [dispatch, packId])

    useEffect(() => {
        dispatch(setCardsTC())
    }, [dispatch, cardParams.sortCards, cardParams.page, cardParams.cardAnswer, cardParams.cardQuestion]);

    const onPageChangeHandler = (page: number) => {
        dispatch(updateCardParams({page}))
    }

    return (
        <div className={styles.block}>
            <div className={styles.container}>
                <div className={styles.input}>
                    <div className={styles.name}>
                        <span onClick={() => navigate(-1)}>🠔</span>
                        <h2 className={styles.hidden}>{packName}</h2>
                    </div>
                    <InputComponentForCards disabled={disabled}
                                            packId={cardParams.cardsPack_id ? cardParams.cardsPack_id : ''}
                                            userId={userId} packUserId={packUserId}/>
                </div>
                <div className={styles.table}>
                    <Card sort={[direction, column]}
                          disabled={false}
                          user_id={cards.map(p => p.user_id)[0]}
                          userIdProfile={userId}
                          {...headerTable}/>
                    {loading === LoadingStatusType.active
                        ? <Loader color={COLORS.MAIN_DARK} className={styles.loader}/>
                        : cards.length > 0
                            ? cards.map(p => <Card header={false} key={p._id} sort={[direction, column]}
                                                   disabled={disabled}
                                                   userIdProfile={userId} {...p}/>)
                            : <span className={styles.emptyPacksText}>There is no data according to your search parameters...</span>
                    }
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