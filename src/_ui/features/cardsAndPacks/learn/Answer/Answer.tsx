import React, {useState} from 'react';
import styles from '../../../Template.module.scss'
import {Button} from '../../../../common/_superComponents/Button/Button';
import {LoadingStatusType} from '../../../../../utils/enums';
import {COLORS, ROUTE_PATHS} from '../../../../../utils/_values';
import {Loader} from '../../../../common/_superComponents/Loader/Loader';
import {useAppDispatch, useCustomSelector} from '../../../../../_bll/main/store';
import {Radio} from '../../../../common/_superComponents/Radio/Radio';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {CardType, PackType} from '../../../../../_dal/api-auth';
import {updateGradeCardTC} from '../../../../../_bll/features/cards/cardsReducer';

export const Answer = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    let {packId, cardId} = useParams()
    const loading = useCustomSelector<LoadingStatusType>(state => state.app.loadingStatus)
    const pack = useCustomSelector<PackType>(state => state.packs.cardPacks.filter(i => i._id === packId)[0])
    const card = useCustomSelector<CardType>(state => state.cards.cards.filter(i => i.cardsPack_id === packId).filter(i => i._id === cardId)[0])

    const [radioSelect, setRadioSelect] = useState<{id: number, title: string, selected: boolean}[]>([
        {id: 0, title: 'Poor', selected: false},
        {id: 1, title: 'Fair', selected: false},
        {id: 2, title: 'Good', selected: false},
        {id: 3, title: 'Very good', selected: false},
        {id: 4, title: 'Excellent', selected: false},
    ])
    let gradeToUpdate = radioSelect.reduce((acc, el, i) => el.selected ? i : acc, 0) + 1
    const onClickRadio = (position: number) => {
        setRadioSelect(radioSelect.map(item =>
            item.id === position
                ? {...item, selected: true}
                : {...item, selected: false}))
    }
    const onClickLeaveHandler = () => navigate(ROUTE_PATHS.PACKS)
    const onClickAnswerHandler = () => {
        dispatch(updateGradeCardTC({grade: gradeToUpdate, card_id: cardId ? cardId : ''}))
        navigate(`${ROUTE_PATHS.QUESTION}/${packId}`)
    }

    if (!pack) return <Navigate to={ROUTE_PATHS.PACKS}/>

    return <div className={styles.container}>
        <div className={styles.block}>
            <h2 className={styles.headerSecond}>Learning pack: "{pack.name.toUpperCase()}"</h2>

            <div className={styles.question_answer}>
                <p><b>Question: </b>"{card.question}"</p>
                <p><b>Answer: </b>"{card.answer}"</p>
            </div>

            <div className={styles.rateYourself}>
                <p><b>Rate yourself:</b></p>
                <div>
                    {radioSelect.map(item =>
                        <Radio key={item.id}
                               color={COLORS.MAIN_DARK}
                               checked={item.selected}
                               onClick={() => onClickRadio(item.id)}
                        >{item.title}</Radio>)}
                </div>
            </div>

            <div className={styles.button}>
                {loading === LoadingStatusType.disabled
                    ? <>
                        <Button color={COLORS.MAIN_DARK} onClick={onClickLeaveHandler}>Leave</Button>
                        <Button color={COLORS.MAIN_DARK} onClick={onClickAnswerHandler}>Next</Button>
                    </>
                    : <Loader color={COLORS.MAIN_DARK}/>
                }
            </div>
        </div>
    </div>
}
