import React, {useCallback} from 'react';
import styles from '../../../Template.module.scss';
import {Button} from '../../../../common/_superComponents/Button/Button';
import {LoadingStatusType} from '../../../../../utils/enums';
import {COLORS, ROUTE_PATHS} from '../../../../../utils/_values';
import {Loader} from '../../../../common/_superComponents/Loader/Loader';
import {useCustomSelector} from '../../../../../_bll/main/store';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {PackType} from '../../../../../_dal/api-PacksAndCards';
import {initialStateCardsType} from '../../../../../_bll/features/cards/cardsReducer';
import {getCard} from '../../../../../utils/functions';

export const Question = React.memo( () => {
    const navigate = useNavigate()
    let {packId} = useParams()
    const {cards} = useCustomSelector<initialStateCardsType>(state => state.cards);
    const loading = useCustomSelector<LoadingStatusType>(state => state.app.loadingStatus)
    const pack = useCustomSelector<PackType>(state => state.packs.cardPacks.filter(i => i._id === packId)[0])

    let chosenCard = getCard(cards)

    const onClickLeaveHandler = useCallback( () => navigate(ROUTE_PATHS.PACKS), [navigate])
    const onCLickAnswerHandle = useCallback( () => {
        navigate(`${ROUTE_PATHS.ANSWER}/${chosenCard.cardsPack_id}/${chosenCard._id}`)
    }, [navigate, chosenCard.cardsPack_id, chosenCard._id])

    if (!pack) return <Navigate to={ROUTE_PATHS.PACKS}/>

    return <div className={styles.container}>
        {loading === LoadingStatusType.active
            ? <Loader color={COLORS.MAIN_DARK}/>
            : <div className={styles.block}>
                <h2 className={styles.headerSecond}>Learning pack: <br/><br/> "{pack.name}"</h2>

                <div className={styles.question_answer}>
                    <p><b>Question: </b>"{chosenCard.question}"</p>
                </div>

                <div className={styles.button}>
                    <Button color={COLORS.MAIN_DARK} onClick={onClickLeaveHandler}>Leave</Button>
                    <Button color={COLORS.MAIN_DARK} onClick={onCLickAnswerHandle}>Answer</Button>
                </div>
            </div>
        }
    </div>
})