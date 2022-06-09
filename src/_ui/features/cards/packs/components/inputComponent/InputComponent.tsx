import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import useDebounce from "./castomHookUseDebounce";
import {Input} from "../../../../../common/_superComponents/Input/Input";
import styles from "./inputComponent.module.scss"
import {setCurrentPage, setPackName} from "../../../../../../_bll/features/cards/packsReducer";


export const InputComponent = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(setPackName(debouncedSearchTerm))
        dispatch(setCurrentPage(1))
    }, [debouncedSearchTerm, dispatch])


    return (
        <div className={styles.input}>
            <h2>Packs list</h2>
            <Input onChange={(e) => setSearchTerm(e.currentTarget.value)}/>
        </div>
    )
}

