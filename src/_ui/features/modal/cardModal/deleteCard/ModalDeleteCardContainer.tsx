import React, {useState} from 'react';
import {Button} from '../../../../common/_superComponents/Button/Button';
import Modal from "../../Modal";
import {useAppDispatch} from "../../../../../_bll/main/store";
import styles from "../../modalStyle.module.scss"
import {deleteCardTC, updateCardParams} from "../../../../../_bll/features/cards/cardsReducer";

type ModalDeleteContainerType = {
    cardID: string
    disabled: boolean
    packName: string
}


const ModalDeleteCardContainer: React.FC<ModalDeleteContainerType> = ({cardID, packName, disabled}) => {
    const [show, setShow] = useState(false);

    const dispatch = useAppDispatch()

    const onClickDeleteHandler = () => {
        dispatch(deleteCardTC(cardID))
        dispatch(updateCardParams({page: 1}))
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
                modalClassName={styles.bgColorModal}
                show={show}
            >
                <div className={styles.modal}>
                    <h2>Delete Card</h2>
                    <span>Do you really want to remove this card? "{packName}"?</span>
                    <div className={styles.button}>
                        <Button color='red' onClick={onClickDeleteHandler}>Delete</Button>
                        <Button onClick={() => setShow(false)}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalDeleteCardContainer;