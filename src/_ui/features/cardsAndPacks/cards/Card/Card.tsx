import React from 'react';
import styles from './Card.module.scss';
import {updateCardParams} from "../../../../../_bll/features/cards/cardsReducer";
import {useAppDispatch} from "../../../../../_bll/main/store";
import {SortButton} from "../../../../common/_superComponents/SortButton/SortButton";
import {COLORS} from "../../../../../utils/_values";
import {StarRating} from "../../../../common/_superComponents/StarRating/StarRating";
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
    showHiddenText?: (value: string) => void
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
        showHiddenText
    } = props

    const dispatch = useAppDispatch()

    const owner = userIdProfile === user_id

    const onClickHandler = (e: string) => {
        // determining on which column the filter is located
        if (disabled) return
        sort[1] === e
            // determining how the column is sorted
            ? sort[0] === '0'
                ? dispatch(updateCardParams({sortCards: `1${sort[1]}`, page: 1}))
                : dispatch(updateCardParams({sortCards: '0updated', page: 1}))
            : dispatch(updateCardParams({sortCards: `0${e}`, page: 1}))
    }
    const onMouseEnterHandler = (value: string) => {
        if (value.length < 10) return
        showHiddenText && showHiddenText(value)
    }
    const onMouseLeaveHandler = (value: string) => {
        if (value.length > 350) return
        showHiddenText && showHiddenText('')
    }

    return (
        <div className={styles.row}>
            <div className={styles.question}>{
                header
                    ? <SortButton title={question}
                                  value={sort[1] === 'question' ? sort[0] : '2'}
                                  color={COLORS.SORT}
                                  onClick={() => onClickHandler('question')}/>
                    : <div className={styles.hidden}
                           onMouseEnter={() => onMouseEnterHandler(question)}
                           onMouseLeave={() => onMouseLeaveHandler(question)}>{question}</div>
            }
            </div>
            <div className={styles.answer}>{
                header
                    ? <SortButton title={answer}
                                  value={sort[1] === 'answer' ? sort[0] : '2'}
                                  color={COLORS.SORT}
                                  onClick={() => onClickHandler('answer')}/>
                    : <div className={styles.hidden}
                           onMouseEnter={() => onMouseEnterHandler(answer)}
                           onMouseLeave={() => onMouseLeaveHandler(answer)}>{answer}</div>
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
