import React, {useState} from 'react';
import {Button} from '../../../common/_superComponents/Button/Button';
import Modal from "../Modal";
import {useAppDispatch} from "../../../../_bll/main/store";
import {deletePackTC, updateParams} from "../../../../_bll/features/cards/packsReducer";
import styles from "../modalStyle.module.scss"

type ModalDeleteContainerType = {
    packId: string
    packName: string
    disabled: boolean
}


const ModalDeleteContainer: React.FC<ModalDeleteContainerType> = ({packId, packName, disabled}) => {
    const [show, setShow] = useState(false);

    const dispatch = useAppDispatch()

    const onClickDeleteHandler = () => {
        dispatch(deletePackTC(packId))
        dispatch(updateParams({page: 1}))
        setShow(false)
    }

    return (
        <>
            <Button disabled={disabled} onClick={() => setShow(true)} color={'red'}>Delete</Button>
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
                    <h2>Delete Pack</h2>
                    <span>Do you really want to remove Pack "{packName}"?</span>
                    <span>  All cards will be excluded from this course.</span>
                    <div className={styles.button}>
                        <Button color='red' onClick={onClickDeleteHandler}>Delete</Button>
                        <Button onClick={() => setShow(false)}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalDeleteContainer;