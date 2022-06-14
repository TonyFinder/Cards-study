import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import useDebounce from "./castomHookUseDebounce";
import {Input} from "../../../../../common/_superComponents/Input/Input";
import styles from "./inputComponent.module.scss"
import {updateParams} from '../../../../../../_bll/features/cards/packsReducer';
import {COLORS} from '../../../../../../utils/_values';

type InputComponentPropsType = {
    disabled?: boolean
}

export const InputComponent = ({disabled}: InputComponentPropsType) => {

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(updateParams({packName: debouncedSearchTerm, page: 1}))
    }, [debouncedSearchTerm, dispatch])


    return (
        <div className={styles.input}>
            <h2>Packs list</h2>
            <Input onChange={(e) => setSearchTerm(e.currentTarget.value)}
                   color={COLORS.MAIN_DARK}
                   placeholder='&#x1F50E;&#xFE0E; Search...'
                   disabled={disabled}/>
        </div>
    )
}

