import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react'
import styles from './Checkbox.module.scss'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
    checked: boolean
    onClickChecked: () => void
}

export const Checkbox: React.FC<SuperCheckboxPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeChecked,
        className, spanClassName,
        checked, onClickChecked,
        children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    // const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    //     onChange && onChange(e)
    //     onChangeChecked && onChangeChecked(e.currentTarget.checked)
    //
    //     // сделайте так чтоб работал onChange и onChangeChecked
    // }
    const onClickCallback = () => {
        onClickChecked()
    }

    const finalInputClassName = checked ? `${styles.labelAfter} ${styles.label}` : `${styles.labelBefore} ${styles.label}`

    return (
        <div className={styles.main}>
            <label className={finalInputClassName}>
                <input
                    type={'checkbox'}
                    onClick={onClickCallback}
                    className={styles.checkbox}
                    {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
                />
                {children && <span className={styles.spanClassName}>{children}</span>}
            </label> {/*благодаря label нажатие на спан передастся в инпут*/}
        </div>
    )
}