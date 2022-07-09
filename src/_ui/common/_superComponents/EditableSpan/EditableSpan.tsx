import React, {
    DetailedHTMLProps,
    KeyboardEvent,
    InputHTMLAttributes,
    HTMLAttributes,
    useState,
    useCallback
} from 'react'
import {Input} from '../Input/Input'
import styles from './EditableSpan.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

type EditableSpanType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onKeyDown?: () => void
    error?: boolean
    spanClassName?: string
    value?: string
    spanProps?: DefaultSpanPropsType
}

export const EditableSpan: React.FC<EditableSpanType> = React.memo( (
    {
        onChangeText,
        spanProps,
        value
    }
) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {}

    const onEnterCallback = useCallback( (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') setEditMode(false)
    }, [])
    const onBlurCallback = useCallback( () => setEditMode(false), [])
    const onDoubleClickCallBack = useCallback( () => setEditMode(true), [])

    return (
        <>
            {editMode
                ? (
                    <Input
                        autoFocus
                        onBlur={onBlurCallback}
                        onKeyDown={onEnterCallback}
                        value={value}
                        onChangeText={onChangeText}
                    />
                ) : (
                    <div className={styles.mainSpan}>
                    <span onDoubleClick={onDoubleClickCallBack}
                          {...restSpanProps} className={styles.spanEdit}>
                            {children || value}
                    </span>
                    </div>
                )
            }
        </>
    )
})