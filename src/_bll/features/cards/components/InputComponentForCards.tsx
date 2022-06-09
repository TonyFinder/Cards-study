import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import useDebounce from "../../../../_ui/features/cards/packs/components/inputComponent/castomHookUseDebounce";
import {Input} from "../../../../_ui/common/_superComponents/Input/Input";
import {setCardQuestionAndAnswer} from "../cardsReducer";


export const InputComponentForCards = () => {

    const [searchQuestion, setSearchQuestion] = useState('');
    const [searchAnswer, setSearchAnswer] = useState('');

    const debouncedSearchQuestion = useDebounce(searchQuestion, 1000);
    const debouncedSearchAnswer = useDebounce(searchAnswer, 1000);

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(setCardQuestionAndAnswer([debouncedSearchQuestion, debouncedSearchAnswer]))
    }, [debouncedSearchQuestion, debouncedSearchAnswer, dispatch])


    return (
        <div>
            <Input onChange={(e) => setSearchQuestion(e.currentTarget.value)}/>
            <Input onChange={(e) => setSearchAnswer(e.currentTarget.value)}/>
        </div>
    )
}

