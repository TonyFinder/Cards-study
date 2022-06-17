import React, {useState} from 'react';
import {Button} from '../../../../common/_superComponents/Button/Button';
import Modal from "../../Modal";
import {useAppDispatch} from "../../../../../_bll/main/store";
import {updatePackTC, updateParams} from "../../../../../_bll/features/cards/packsReducer";
import styles from "../../modalStyle.module.scss"
import {Input} from '../../../../common/_superComponents/Input/Input';
import {COLORS} from '../../../../../utils/_values';
import {Checkbox} from "../../../../common/_superComponents/Checkbox/Checkbox";

type ModalUpdateContainerType = {
    packId: string
    packName: string
    disabled: boolean
}


const ModalUpdateContainer: React.FC<ModalUpdateContainerType> = ({packId, packName, disabled}) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState(packName);
    const [cardPrivate, setCardPrivate] = useState(false);
    const dispatch = useAppDispatch()

    const onClickUpdateHandler = () => {
        dispatch(updatePackTC({_id: packId, name: name, deckCover: "", cardPrivate: cardPrivate}))
        dispatch(updateParams({page: 1}))
        setShow(false)
    }

    const onClickCloseModalHandler = () => {
        setShow(false)
        setName(packName)
        setCardPrivate(false)
    }

    return (
        <>
            <Button color='red' disabled={disabled} onClick={() => setShow(true)}>Edit</Button>
            <Modal
                enableBackground={true}
                backgroundOnClick={onClickCloseModalHandler}

                width={400}
                height={300}
                modalClassName={styles.bgColorModal}
                show={show}
            >
                <div className={styles.modal}>
                    <h2>Change pack "{packName}"</h2>
                    <Input value={name} color={COLORS.HEADER_BOTTOM} autoFocus
                           onChange={(e) => setName(e.currentTarget.value)}
                           sign='New pack mame'/>
                    <Checkbox
                        className={styles.checkbox}
                        checked={cardPrivate}
                        color={COLORS.HEADER_BOTTOM}
                        onChange={(e) => setCardPrivate(e.currentTarget.checked)}>
                        Private
                    </Checkbox>
                    <div className={styles.button}>
                        <Button color={COLORS.HEADER_BOTTOM} onClick={onClickUpdateHandler}>Save</Button>
                        <Button color={COLORS.HEADER_BOTTOM} onClick={() => setShow(false)}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalUpdateContainer;