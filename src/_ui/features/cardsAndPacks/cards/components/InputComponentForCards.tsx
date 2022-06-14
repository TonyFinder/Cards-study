import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import useDebounce from "../../packs/components/inputComponent/castomHookUseDebounce";
import {Input} from "../../../../common/_superComponents/Input/Input";
import ModalCreateCardContainer from "../../../modal/cardModal/createCard/ModalCreateCardContainer";
import {updateCardParams} from "../../../../../_bll/features/cards/cardsReducer";
import {COLORS} from "../../../../../utils/_values";

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
        <div>
            <Input
                color={COLORS.MAIN_DARK}
                placeholder='&#x1F50E;&#xFE0E; Search for question'
                onChange={(e) => setSearchQuestion(e.currentTarget.value)}/>
            <Input
                color={COLORS.MAIN_DARK}
                placeholder='&#x1F50E;&#xFE0E; Search for answer'
                onChange={(e) => setSearchAnswer(e.currentTarget.value)}/>
            {packUserId === userId ? <ModalCreateCardContainer packUserId={packId} disabled={disabled}/> : null}
        </div>
    )
}

