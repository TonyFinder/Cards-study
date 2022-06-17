import React, {useState} from 'react';
import {Button} from '../../../../common/_superComponents/Button/Button';
import Modal from "../../Modal";
import {useAppDispatch} from "../../../../../_bll/main/store";
import {updateParams} from "../../../../../_bll/features/cards/packsReducer";
import {Input} from "../../../../common/_superComponents/Input/Input";
import {COLORS} from "../../../../../utils/_values";
import styles from "../../modalStyle.module.scss"
import {createCardTC} from "../../../../../_bll/features/cards/cardsReducer";
import {TextArea} from "../../../cardsAndPacks/cards/components/textArea/TextArea";

type ModalCreatePackContainerType = {
    disabled: boolean
    packUserId: string
}

const ModalCreateCardContainer: React.FC<ModalCreatePackContainerType> = ({disabled, packUserId}) => {
    const [show, setShow] = useState(false);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const dispatch = useAppDispatch()

    const onClickCreateHandler = () => {
        dispatch(createCardTC({cardsPack_id: packUserId, answer, question}))
        dispatch(updateParams({page: 1}))
        setQuestion('')
        setAnswer('')
        setShow(false)
    }

    return (
        <>
            <Button onClick={() => setShow(true)} color={COLORS.MAIN_DARK} disabled={disabled}>Add new card</Button>
            <Modal
                enableBackground={true}
                backgroundOnClick={() => setShow(false)}
                width={400}
                height={500}
                modalClassName={styles.bgColorModal}
                show={show}
            >
                <div className={styles.modal}>
                    <h3>Add new Card</h3>
                    <Input sign='question' autoFocus value={question} onChange={(e) => setQuestion(e.currentTarget.value)}/>
                    <TextArea sign='answer' value={answer} onChangeText={(e) => setAnswer(e.currentTarget.value)}/>
                    <div className={styles.button}>
                        <Button onClick={onClickCreateHandler}>Save</Button>
                        <Button color='red' onClick={() => setShow(false)}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalCreateCardContainer;