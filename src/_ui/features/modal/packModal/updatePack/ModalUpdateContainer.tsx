import React, {useCallback, useEffect, useState} from 'react';
import {Button} from '../../../../common/_superComponents/Button/Button';
import {useAppDispatch} from "../../../../../_bll/main/store";
import {setShowFilters, updatePackTC} from '../../../../../_bll/features/cards/packsReducer';
import styles from "../../modalTemplate.module.scss"
import {Input} from '../../../../common/_superComponents/Input/Input';
import {COLORS} from '../../../../../utils/_values';
import {Checkbox} from "../../../../common/_superComponents/Checkbox/Checkbox";
import {Modal} from '../../Modal';

type ModalUpdateContainerType = {
    packId: string
    packName: string
    disabled: boolean
}


export const ModalUpdateContainer: React.FC<ModalUpdateContainerType> = ({packId, packName, disabled}) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState(packName);
    const [cardPrivate, setCardPrivate] = useState(false);
    const dispatch = useAppDispatch()

    useEffect(() => {
        setName(packName)
    }, [show, packName])

    const onClickUpdateHandler = () => {
        if (packName === name) return
        dispatch(updatePackTC({_id: packId, name: name, deckCover: "", cardPrivate: cardPrivate}, packName))
        setShow(false)
    }
    const onClickCloseModalHandler = useCallback( () => {
        setShow(false)
        setName(packName)
        setCardPrivate(false)
    }, [packName])
    const onClickUpdateMainButtonHandler = () => {
        setShow(true)
        dispatch(setShowFilters(false))
    }

    // Logic for leaving modal window in case ESC button is pressed
    const escFunction = useCallback((event: KeyboardEvent) => {
        event.code === 'Escape' && onClickCloseModalHandler()
    }, [onClickCloseModalHandler])

    useEffect(() => {
        document.addEventListener("keydown", escFunction)

        return () => {
            document.removeEventListener("keydown", escFunction)
        }
    }, [escFunction])

    return (
        <>
            <Button color={COLORS.BUTTON_TABLE_MAIN}
                    disabled={disabled}
                    onClick={onClickUpdateMainButtonHandler}
                    className={styles.button}>Edit</Button>
            <Modal backgroundOnClick={onClickCloseModalHandler} show={show}>
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <h3>Change pack: "{packName.length > 100 ? `${packName.slice(0, 100)}...` : packName}"</h3>
                    </div>

                    <div className={styles.input}>
                        <Input value={name}
                               sign='New pack name'
                               color={COLORS.HEADER_BOTTOM}
                               autoFocus
                               onEnter={onClickUpdateHandler}
                               onChange={(e) => setName(e.currentTarget.value)}/>
                    </div>

                    <div className={styles.checkbox}>
                        <Checkbox
                            className={styles.checkbox}
                            checked={cardPrivate}
                            color={COLORS.HEADER_BOTTOM}
                            onChange={(e) => setCardPrivate(e.currentTarget.checked)}>
                            Private
                        </Checkbox>
                    </div>

                    <div className={styles.buttons}>
                        <Button color={COLORS.HEADER_BOTTOM}
                                disabled={packName === name || !name}
                                onClick={onClickUpdateHandler}>Save</Button>
                        <Button color={COLORS.HEADER_BOTTOM}
                                onClick={onClickCloseModalHandler}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}