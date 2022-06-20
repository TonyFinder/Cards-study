import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import useDebounce from "../../../packs/components/inputComponent/castomHookUseDebounce";
import {Input} from "../../../../../common/_superComponents/Input/Input";
import {updateCardParams} from "../../../../../../_bll/features/cards/cardsReducer";
import {COLORS} from "../../../../../../utils/_values";
import {ModalCreateCardContainer} from '../../../../modal/cardModal/createCard/ModalCreateCardContainer';
import styles from './inputComponentForCards.module.scss'

type InputComponentForCardsType = {
    packUserId: string
    userId: string
    packId: string
    disabled: boolean
}

export const InputComponentForCards: React.FC<InputComponentForCardsType> = (props) => {

    const {
        packUserId,
        userId,
        packId,
        disabled
    } = props

    const [searchQuestion, setSearchQuestion] = useState('');
    const [searchAnswer, setSearchAnswer] = useState('');

    const debouncedSearchQuestion = useDebounce(searchQuestion, 1000);
    const debouncedSearchAnswer = useDebounce(searchAnswer, 1000);

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(updateCardParams({cardAnswer: debouncedSearchAnswer, cardQuestion: debouncedSearchQuestion,}))
    }, [debouncedSearchQuestion, debouncedSearchAnswer, dispatch])


    return (
        <div className={styles.container}>
            <div className={styles.inputBlock}>
                <div className={styles.input}>
                    <Input
                        color={COLORS.MAIN_DARK}
                        placeholder="&#x1F50E;&#xFE0E; Search for question..."
                        onChange={(e) => setSearchQuestion(e.currentTarget.value)}
                        className={styles.input}/>
                </div>
                <div className={styles.input}>
                <Input
                    color={COLORS.MAIN_DARK}
                    placeholder="&#x1F50E;&#xFE0E; Search for answer..."
                    onChange={(e) => setSearchAnswer(e.currentTarget.value)}
                    className={styles.input}/>
                </div>
            </div>
            {packUserId === userId &&
                <div className={styles.button}>
                    <ModalCreateCardContainer packUserId={packId} disabled={disabled}/>
                </div>
            }
        </div>
    )
}

