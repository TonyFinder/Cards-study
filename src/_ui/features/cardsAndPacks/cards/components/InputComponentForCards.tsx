import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import useDebounce from "../../packs/components/inputComponent/castomHookUseDebounce";
import {Input} from "../../../../common/_superComponents/Input/Input";
import ModalCreateCardContainer from "../../../modal/cardModal/createCard/ModalCreateCardContainer";
import {updateCardParams} from "../../../../../_bll/features/cards/cardsReducer";

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
            <Input onChange={(e) => setSearchQuestion(e.currentTarget.value)}/>
            <Input onChange={(e) => setSearchAnswer(e.currentTarget.value)}/>
            {packUserId === userId ? <ModalCreateCardContainer packUserId={packId} disabled={disabled}/> : null}
        </div>
    )
}

