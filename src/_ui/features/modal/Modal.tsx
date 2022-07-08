import React from 'react';
import styles from './Modal.module.scss'

type ModalPropsType = {
    backgroundOnClick: () => void
    show: boolean
    children: React.ReactNode
}

export const Modal = ({backgroundOnClick, show, children}: ModalPropsType) => {

    if (!show) return null

    return (
        <>
            <div className={styles.modalBackground} onClick={backgroundOnClick}/>
            <div className={styles.modal}>
                {children}
            </div>
        </>
    )
}