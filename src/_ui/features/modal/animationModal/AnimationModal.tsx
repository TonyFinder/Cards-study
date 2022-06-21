import React, {useEffect, useState} from "react";
import styles from "./animationModal.module.scss"
import {useCustomSelector} from "../../../../_bll/main/store";


export const AnimationModal: React.FC = () => {
    const [show, setShow] = useState(false);

    const {type, message, id} = useCustomSelector(state => state.app.popupModal)

    let timer: ReturnType<typeof setTimeout>

    useEffect(() => {
        if (message) {
            setShow(true)
        }
    }, [id])

    useEffect(() => {
        if (show) {
            timer = setTimeout(() => {
                setShow(false)
            }, 5000)
        }
    }, [show])

    const onClickCloseModalHandler = () => {
        setShow(false)
        clearTimeout(timer);
    }

    return (
        <>
            <div className={styles.block}>
                <div className={show ? styles.modalActive : styles.modal}>
                    <div className={styles.text}>{message}</div>
                    <div className={styles.exit} onClick={onClickCloseModalHandler}>X</div>
                </div>
            </div>
        </>
    )
}

