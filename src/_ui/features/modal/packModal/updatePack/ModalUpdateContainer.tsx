import React, {useState} from 'react';
import {Button} from '../../../../common/_superComponents/Button/Button';
import {useAppDispatch} from "../../../../../_bll/main/store";
import {updatePackTC} from "../../../../../_bll/features/cards/packsReducer";
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

    const onClickUpdateHandler = () => {
        dispatch(updatePackTC({_id: packId, name: name, deckCover: "", cardPrivate: cardPrivate}))
        setShow(false)
    }

    const onClickCloseModalHandler = () => {
        setShow(false)
        setName(packName)
        setCardPrivate(false)
    }

    return (
        <>
            <Button color='red'
                    disabled={disabled}
                    onClick={() => setShow(true)}
                    className={styles.button}>Edit</Button>
            <Modal backgroundOnClick={onClickCloseModalHandler} show={show}>
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <h3>Change pack: "{packName}"</h3>
                    </div>

                    <div className={styles.input}>
                    <Input value={name} color={COLORS.HEADER_BOTTOM} autoFocus
                           onChange={(e) => setName(e.currentTarget.value)}
                           sign='New pack mame'/>
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
                                onClick={onClickUpdateHandler}>Save</Button>
                        <Button color={COLORS.HEADER_BOTTOM}
                                onClick={() => setShow(false)}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}