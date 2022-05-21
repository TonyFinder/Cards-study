import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react'
import styles from './Radio.module.scss'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

export const Radio: React.FC<SuperRadioPropsType> = (
    {
        // type,
        name,
        options, value,
        onChange, onChangeOption,
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
        // onChange, onChangeOption
    }


    const mappedOptions: any[] = options ? options.map((o, i) => ( // map options with key
        <label key={name + '-' + i} className={value === o ? styles.labelAfter : styles.labelBefore}>
            <input
                type={name}
                onChange={onChangeCallback}
                checked={value === o}
                value={o}
                className={styles.input}
                // name, checked, value, onChange
            />
            {o}
        </label>
    )) : []

    return (
        <div className={styles.main}>
            {mappedOptions}
        </div>
    )
}