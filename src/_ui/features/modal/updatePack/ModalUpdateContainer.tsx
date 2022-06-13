import React, {useState} from 'react';
import {Button} from '../../../common/_superComponents/Button/Button';
import Modal from "../Modal";
import {useAppDispatch} from "../../../../_bll/main/store";
import {updatePackTC, updateParams} from "../../../../_bll/features/cards/packsReducer";
import styles from "../modalStyle.module.scss"
import {Input} from '../../../common/_superComponents/Input/Input';

type ModalUpdateContainerType = {
    packId: string
    packName: string
    disabled: boolean
}


const ModalUpdateContainer: React.FC<ModalUpdateContainerType> = ({packId, packName, disabled}) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState(packName);

    const dispatch = useAppDispatch()

    const onClickDeleteHandler = () => {
        dispatch(updatePackTC({_id: packId, name: name, deckCover: ""}))
        dispatch(updateParams({page: 1}))
        setShow(false)
    }

    return (
        <>
            <Button color='red' disabled={disabled} onClick={() => setShow(true)}>Edit</Button>
            <Modal
                enableBackground={true}
                backgroundOnClick={() => setShow(false)}

                width={400}
                height={300}
                // modalOnClick={() => setShow(false)}
                modalClassName={styles.bgColorModal}
                show={show}
            >
                <div className={styles.modal}>
                    <h2>Change pack "{packName}"</h2>
                    <Input onChange={(e) => setName(e.currentTarget.value)} sign='New pack mame'/>
                    <div className={styles.button}>
                        <Button onClick={onClickDeleteHandler}>Save</Button>
                        <Button color='red' onClick={() => setShow(false)}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalUpdateContainer;