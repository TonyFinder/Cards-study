import React, {ChangeEvent} from 'react';
import {Input} from '../../../../../common/_superComponents/Input/Input';
import styles from './inputComponent.module.scss'
import {COLORS} from '../../../../../../utils/_values';

type InputComponentPropsType = {
    value: string
    onChange: (value: string) => void
    disabled?: boolean
    onClickShowFilters: () => void
    onResetFilters: () => void
}

export const InputComponent = ({value, disabled, onChange, onClickShowFilters, onResetFilters}: InputComponentPropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value)
    }

    return (
        <div className={styles.inputBlock}>
            <h2>Packs list</h2>
            <div className={styles.input}>
                <div className={styles.filters} onClick={onClickShowFilters}>
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

