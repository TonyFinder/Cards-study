import React from 'react';
import styles from './card.module.scss';
import {updateCardParams} from "../../../../../_bll/features/cards/cardsReducer";
import {useAppDispatch} from "../../../../../_bll/main/store";
import {SortButton} from "../../../../common/_superComponents/SortButton/SortButton";
import {COLORS} from "../../../../../utils/_values";
import {StarRating} from "../components/starRating/StarRating";
import {ModalDeleteCardContainer} from '../../../modal/cardModal/deleteCard/ModalDeleteCardContainer';
import {ModalUpdateCardContainer} from '../../../modal/cardModal/updateCard/ModalUpdateCardContainer';

type CardPropsType = {
    _id: string
    answer: string
    question: string
    cardsPack_id?: string
    grade: number | string
    user_id: string
    created?: string
    updated: string
    header: boolean

    disabled: boolean
    userIdProfile: string
    sort: string[]
}

export const Card: React.FC<CardPropsType> = (props) => {
    const {
        answer,
        question,
        grade,
        updated,
        header,
        userIdProfile,
        user_id,
        _id,
        disabled,
        sort,
    } = props

    const dispatch = useAppDispatch()

    const owner = userIdProfile === user_id

    const onClickHandler = (e: string) => {
        // определяем, на какой колонке находится фильтр
        if (disabled) return
        sort[1] === e
            // определяем как отсортирована колонка
            ? sort[0] === '0'
                ? dispatch(updateCardParams({sortCards: `1${sort[1]}`, page: 1}))
                : dispatch(updateCardParams({sortCards: '0updated', page: 1}))
            : dispatch(updateCardParams({sortCards: `0${e}`, page: 1}))
    }

    return (
        <div className={styles.row}>
            <div className={styles.question}>{
                header
                    ? <SortButton title={question}
                                  value={sort[1] === 'question' ? sort[0] : '2'}
                                  color={COLORS.SORT}
                                  onClick={() => onClickHandler('question')}/>
                    : <div className={styles.hidden}>{question}</div>
            }
            </div>
            <div className={styles.answer}>{
                header
                    ? <SortButton title={answer}
                                  value={sort[1] === 'answer' ? sort[0] : '2'}
                                  color={COLORS.SORT}
                                  onClick={() => onClickHandler('answer')}/>
                    : <div className={styles.hidden}>{answer}</div>
            }
            </div>
            <div className={styles.updated}>{
                header
                    ? <SortButton title={updated}
                                  value={sort[1] === 'updated' ? sort[0] : '2'}
                                  color={COLORS.SORT}
                                  onClick={() => onClickHandler('updated')}/>
                    : `${new Date(String(updated)).getDate()}/${new Date(String(updated)).getMonth()}/${new Date(String(updated)).getFullYear()}`
            }
            </div>
            <div className={styles.grade}>{
                header
                    ? <SortButton title={grade}
                                  value={sort[1] === 'grade' ? sort[0] : '2'}
                                  color={COLORS.SORT}
                                  onClick={() => onClickHandler('grade')}/>
                    : <StarRating grade={+grade}/>
            }
            </div>
            {
                owner
                    ? <div className={styles.actions}>
                        {header
                            ? "Actions"
                            : <>
                                <ModalDeleteCardContainer
                                    cardID={_id}
                                    cardName={question}
                                    disabled={disabled}
                                />
                                <ModalUpdateCardContainer
                                    cardId={_id}
                                    cardAnswer={answer}
                                    cardQuestion={question}
                                    disabled={disabled}
                                />
                            </>
                        }
                    </div>
                    : null
            }
        </div>
    )
}
