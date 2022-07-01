import React, {useCallback, useEffect, useState} from 'react';
import {Button} from '../../../../common/_superComponents/Button/Button';
import {useAppDispatch} from '../../../../../_bll/main/store';
import {createPackTC, setShowFilters} from '../../../../../_bll/features/cards/packsReducer';
import {Input} from '../../../../common/_superComponents/Input/Input';
import {Checkbox} from '../../../../common/_superComponents/Checkbox/Checkbox';
import {COLORS} from '../../../../../utils/_values';
import styles from '../../modalTemplate.module.scss'
import {Modal} from '../../Modal';

type ModalCreatePackContainerType = {
    disabled: boolean
}

export const ModalCreatePackContainer: React.FC<ModalCreatePackContainerType> = ({disabled}) => {
    const [show, setShow] = useState(false);

    const [namePack, setNamePack] = useState("");
    const [cardPrivate, setCardPrivate] = useState(false);

    const dispatch = useAppDispatch()

    const onClickCreateHandler = () => {
        if (!namePack) return
        dispatch(createPackTC(
            {
                name: namePack,
                deckCover: "",
                cardPrivate: cardPrivate,
            }
        ))
        onClickCloseHandler()
    }
    const onClickCloseHandler = () => {
        setShow(false)
        setNamePack('')
        setCardPrivate(false)
    }
    const onClickMainButton = () => {
        dispatch(setShowFilters(false))
        setShow(true)
    }

    // Logic for leaving modal window in case ESC button is pressed
    const escFunction = useCallback( (event: KeyboardEvent) => {
        event.code === 'Escape' && onClickCloseHandler()
    }, [])

    useEffect(() => {
        document.addEventListener("keydown", escFunction)

        return () => {
            document.removeEventListener("keydown", escFunction)
        }
    }, [escFunction])

    return (
        <>
            <div className={styles.buttonAdd}>
                <Button onClick={onClickMainButton}
                        color={COLORS.MAIN_DARK}
                        disabled={disabled}>Add new pack</Button>
            </div>

            <Modal backgroundOnClick={onClickCloseHandler} show={show}>
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <h3>Add new Pack</h3>
                    </div>

                    <div className={styles.input}>
                        <Input sign="Name pack"
                               color={COLORS.HEADER_BOTTOM}
                               autoFocus
                               value={namePack}
                               onEnter={onClickCreateHandler}
                               onChange={(e) => setNamePack(e.currentTarget.value)}/>
                    </div>

                    <div className={styles.checkbox}>
                        <Checkbox
                            checked={cardPrivate}
                            color={COLORS.HEADER_BOTTOM}
                            onChange={(e) => setCardPrivate(e.currentTarget.checked)}>
                            Private
                        </Checkbox>
                    </div>

                    <div className={styles.buttons}>
                        <Button color={COLORS.HEADER_BOTTOM}
                                disabled={!namePack}
                                onClick={onClickCreateHandler}>Save</Button>
                        <Button color={COLORS.HEADER_BOTTOM}
                                onClick={onClickCloseHandler}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}