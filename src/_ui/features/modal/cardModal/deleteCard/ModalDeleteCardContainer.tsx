import React, {useCallback, useEffect, useState} from 'react';
import {Button} from '../../../../common/_superComponents/Button/Button';
import {useAppDispatch} from "../../../../../_bll/main/store";
import styles from "../../ModalTemplate.module.scss"
import {deleteCardTC} from "../../../../../_bll/features/cards/cardsReducer";
import {COLORS} from '../../../../../utils/_values';
import {Modal} from '../../Modal';
import {toShortMessage} from '../../../../../utils/functions';

type ModalDeleteContainerType = {
    cardID: string
    disabled: boolean
    cardName: string
}


export const ModalDeleteCardContainer: React.FC<ModalDeleteContainerType> = React.memo( ({cardID, cardName, disabled}) => {
    const [show, setShow] = useState(false);

    const dispatch = useAppDispatch()

    const onClickDeleteHandler = useCallback( () => {
        dispatch(deleteCardTC(cardID, cardName))
        setShow(false)
    }, [dispatch, cardID, cardName])

    // Logic for leaving modal window in case ESC button is pressed
    const escFunction = useCallback( (event: KeyboardEvent) => {
        event.code === 'Escape' && setShow(false)
    }, [])

    useEffect(() => {
        document.addEventListener("keydown", escFunction)

        return () => {
            document.removeEventListener("keydown", escFunction)
        }
    }, [escFunction])

    return (
        <>
            <Button disabled={disabled}
                    onClick={() => setShow(true)}
                    color={'red'} className={styles.button}>
                Delete</Button>
            <Modal backgroundOnClick={() => setShow(false)} show={show}>
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <h3>Delete Card: "{toShortMessage(cardName, 100)}"</h3>
                    </div>

                    <p className={styles.text}>
                        Do you really want to remove this card?
                    </p>

                    <div className={styles.buttons}>
                        <Button color='red' onClick={onClickDeleteHandler}>Delete</Button>
                        <Button color={COLORS.HEADER_BOTTOM} onClick={() => setShow(false)}>Cancel</Button>
                    </div>

                </div>
            </Modal>
        </>
    )
})