import React from 'react';
import styles from './DoubleButton.module.scss'

type DoubleButtonType = {
    active: boolean[]
    activeColor: string
    disableColor: string
    onClick: (value: string) => void
    disabled?: boolean
}

export const DoubleButton = React.memo( ({active, activeColor, disableColor, onClick, disabled}: DoubleButtonType) => {
    const style = (order: number) => ({
        borderRadius: order === 0 ? '8px 0 0 8px' : '0 8px 8px 0',
        backgroundColor: active[order] ? activeColor : disableColor,
        color: active[order] ? disableColor : activeColor,
    })

    return <div>
        <button style={style(0)} className={styles.button} onClick={() => onClick('my')} disabled={disabled}>My</button>
        <button style={style(1)} className={styles.button} onClick={() => onClick('all')} disabled={disabled}>All</button>
    </div>
})
