import React, {useState} from 'react';
import {Button} from '../../../../common/_superComponents/Button/Button';
import Modal from "../../Modal";
import {useAppDispatch} from "../../../../../_bll/main/store";
import styles from "../../modalStyle.module.scss"
import {deleteCardTC} from "../../../../../_bll/features/cards/cardsReducer";
import {COLORS} from '../../../../../utils/_values';

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
                    <h2>Delete Card "{packName}"</h2>
                    <span>Do you really want to remove this card?</span>
                    <div className={styles.button}>
                        <Button color='red' onClick={onClickDeleteHandler}>Delete</Button>
                        <Button color={COLORS.HEADER_BOTTOM} onClick={() => setShow(false)}>Cancel</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalDeleteCardContainer;