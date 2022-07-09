import React, {ChangeEvent, useCallback} from 'react';
import {Input} from '../../../../../common/_superComponents/Input/Input';
import styles from './InputComponent.module.scss'
import {COLORS} from '../../../../../../utils/_values';
import {useAppDispatch, useCustomSelector} from '../../../../../../_bll/main/store';
import {setShowFilters} from '../../../../../../_bll/features/cards/packsReducer';

type InputComponentPropsType = {
    value: string
    onChange: (value: string) => void
    disabled?: boolean
    onResetFilters: (value: string) => void
}

export const InputComponent = React.memo( ({value, disabled, onChange, onResetFilters}: InputComponentPropsType) => {
    const showFilters = useCustomSelector<boolean>(state => state.packs.showFilters)
    const user_id = useCustomSelector<string|undefined>(state => state.packs.packParams.user_id)
    const dispatch = useAppDispatch()

    const onChangeHandler = useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value)
    }, [onChange])
    const onClickShowFiltersHandler = useCallback( () => dispatch(setShowFilters(!showFilters)), [dispatch, showFilters])

    return (
        <div className={styles.inputBlock}>
            <h2>Packs list</h2>
            <div className={styles.input}>
                <div className={styles.filters} onClick={onClickShowFiltersHandler}>
                    <span>&#8693;</span> filters
                </div>
                <div className={styles.clearFilters} onClick={() => onResetFilters(user_id ? user_id : '')}>
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
})