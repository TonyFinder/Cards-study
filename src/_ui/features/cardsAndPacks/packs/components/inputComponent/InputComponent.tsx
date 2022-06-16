import React, {ChangeEvent} from 'react';
import {Input} from '../../../../../common/_superComponents/Input/Input';
import styles from './inputComponent.module.scss'
import {COLORS} from '../../../../../../utils/_values';

type InputComponentPropsType = {
    value: string
    onChange: (value: string) => void
    disabled?: boolean
}

export const InputComponent = ({value, disabled, onChange}: InputComponentPropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value)
    }

    return (
        <div className={styles.input}>
            <h2>Packs list</h2>
            <Input value={value}
                   onChange={onChangeHandler}
                   color={COLORS.MAIN_DARK}
                   placeholder='&#x1F50E;&#xFE0E; Search...'
                   disabled={disabled}/>
        </div>
    )
}

