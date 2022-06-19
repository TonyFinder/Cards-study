import React, {useState} from 'react';
import {Button} from '../../../../common/_superComponents/Button/Button';
import Modal from "../../Modal";
import {useAppDispatch} from "../../../../../_bll/main/store";
import {deletePackTC} from "../../../../../_bll/features/cards/packsReducer";
import styles from "../../modalStyle.module.scss"
import {COLORS} from '../../../../../utils/_values';

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
                    <h2>Delete Pack "{packName}"</h2>
                    <span>Do you really want to remove this Pack?</span>
                    <span>  All cards will be excluded from this course.</span>
                    <div className={styles.button}>
                        <Button color='red' onClick={onClickDeleteHandler}>Delete</Button>
                        <Button color={COLORS.HEADER_BOTTOM} onClick={() => setShow(false)}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalDeleteContainer;