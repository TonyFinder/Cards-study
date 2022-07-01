import React, {useCallback, useEffect, useState} from 'react';
import {Button} from '../../../../common/_superComponents/Button/Button';
import {useAppDispatch} from "../../../../../_bll/main/store";
import {deletePackTC, setShowFilters} from '../../../../../_bll/features/cards/packsReducer';
import styles from "../../modalTemplate.module.scss"
import {COLORS} from '../../../../../utils/_values';
import {Modal} from '../../Modal';

type ModalDeleteContainerType = {
    packId: string
    packName: string
    disabled: boolean
}


export const ModalDeleteContainer: React.FC<ModalDeleteContainerType> = ({packId, packName, disabled}) => {
    const [show, setShow] = useState(false);

    const dispatch = useAppDispatch()

    const onClickDeleteHandler = () => {
        dispatch(deletePackTC(packId,packName))
        setShow(false)
    }
    const onClickDeleteMainButtonHandler = () => {
        setShow(true)
        dispatch(setShowFilters(false))
    }

    // Logic for leaving modal window in case ESC button is pressed
    const escFunction = useCallback((event: KeyboardEvent) => {
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
                    onClick={onClickDeleteMainButtonHandler}
                    color={'red'}
                    className={styles.button}>Delete</Button>
            <Modal backgroundOnClick={() => setShow(false)} show={show}>
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <h3>Delete Pack: "{packName}"</h3>
                    </div>

                    <p className={styles.text}>
                        Do you really want to remove this Pack?<br/><br/>
                        All cards will be excluded from this course.
                    </p>

                    <div className={styles.buttons}>
                        <Button color='red'
                                onClick={onClickDeleteHandler}>Delete</Button>
                        <Button color={COLORS.HEADER_BOTTOM}
                                onClick={() => setShow(false)}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}