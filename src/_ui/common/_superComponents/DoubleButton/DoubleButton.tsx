import React from 'react';
import styles from './DoubleButton.module.scss'

type DoubleButtonType = {
    active: boolean[]
    activeColor: string
    disableColor: string
}

export const DoubleButton = ({active, activeColor, disableColor}: DoubleButtonType) => {
    const style = (order: number) => ({
        borderRadius: order === 0 ? '8px 0 0 8px' : '0 8px 8px 0',
        backgroundColor: active[order] ? activeColor : disableColor,
        color: active[order] ? disableColor : activeColor,
    })

    return <div>
        <button style={style(0)} className={styles.button}>My</button>
        <button style={style(1)} className={styles.button}>All</button>
    </div>
}
