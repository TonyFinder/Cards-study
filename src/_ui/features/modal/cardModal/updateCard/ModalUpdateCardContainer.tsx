import React, {useState} from 'react';
import {Button} from '../../../../common/_superComponents/Button/Button';
import Modal from "../../Modal";
import {useAppDispatch} from "../../../../../_bll/main/store";
import styles from "../../modalStyle.module.scss"
import {Input} from '../../../../common/_superComponents/Input/Input';
import {updateCardTC} from "../../../../../_bll/features/cards/cardsReducer";
import {COLORS} from "../../../../../utils/_values";
import {TextArea} from "../../../cardsAndPacks/cards/components/textArea/TextArea";

type ModalUpdateContainerType = {
    cardId: string
    cardQuestion: string
    cardAnswer: string
    disabled: boolean
}


const ModalUpdateCardContainer: React.FC<ModalUpdateContainerType> = ({cardId, cardQuestion, cardAnswer, disabled}) => {
    const [show, setShow] = useState(false);
    const [question, setQuestion] = useState(cardQuestion);
    const [answer, setAnswer] = useState(cardAnswer);

    const dispatch = useAppDispatch()

    const onClickUpdateHandler = () => {
        dispatch(updateCardTC({_id: cardId, question, answer}))
        setShow(false)
    }

    return (
        <>
            <Button color={COLORS.MAIN_DARK} disabled={disabled} onClick={() => setShow(true)}>Edit</Button>
            <Modal
                enableBackground={true}
                backgroundOnClick={() => setShow(false)}

                width={400}
                height={500}
                modalClassName={styles.bgColorModal}
                show={show}
            >
                <div className={styles.modal}>
                    <h2>Change pack "{cardQuestion}"</h2>
                    <Input value={question} onChange={(e) => setQuestion(e.currentTarget.value)} sign='New question'/>
                    <TextArea value={answer} onChange={(e) => setAnswer(e.currentTarget.value)} sign='New answer'/>
                    <div className={styles.button}>
                        <Button onClick={onClickUpdateHandler}>Save</Button>
                        <Button color='red' onClick={() => setShow(false)}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalUpdateCardContainer;