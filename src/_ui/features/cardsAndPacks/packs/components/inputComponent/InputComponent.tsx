import React, {ChangeEvent} from 'react';
import {Input} from '../../../../../common/_superComponents/Input/Input';
import styles from './inputComponent.module.scss'
import {COLORS} from '../../../../../../utils/_values';
import {useAppDispatch, useCustomSelector} from '../../../../../../_bll/main/store';
import {setShowFilters} from '../../../../../../_bll/features/cards/packsReducer';

type InputComponentPropsType = {
    value: string
    onChange: (value: string) => void
    disabled?: boolean
    onResetFilters: () => void
}

export const InputComponent = ({value, disabled, onChange, onResetFilters}: InputComponentPropsType) => {
    const showFilters = useCustomSelector<boolean>(state => state.packs.showFilters)
    const dispatch = useAppDispatch()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value)
    }
    const onClickShowFiltersHandler = () => dispatch(setShowFilters(!showFilters))

    return (
        <div className={styles.inputBlock}>
            <h2>Packs list</h2>
            <div className={styles.input}>
                <div className={styles.filters} onClick={onClickShowFiltersHandler}>
                    <span>&#8693;</span> filters
                </div>
                <div className={styles.clearFilters} onClick={onResetFilters}>
                    clear filters
                </div>
                <Input value={value}
                       onChange={onChangeHandler}
                       color={COLORS.MAIN_DARK}
                       placeholder="&#x1F50E;&#xFE0E; Search for packs..."
                       disabled={disabled}/>
            </div>
        </div>
    )
}

