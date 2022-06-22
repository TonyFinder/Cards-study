import React, {useState} from 'react';
import {Button} from '../../../../common/_superComponents/Button/Button';
import {useAppDispatch} from '../../../../../_bll/main/store';
import {COLORS} from '../../../../../utils/_values';
import styles from '../../modalTemplate.module.scss'
import {createCardTC} from '../../../../../_bll/features/cards/cardsReducer';
import {TextArea} from '../../../cardsAndPacks/cards/components/textArea/TextArea';
import {Modal} from '../../Modal';

type ModalCreatePackContainerType = {
    disabled: boolean
    packUserId: string
}

export const ModalCreateCardContainer: React.FC<ModalCreatePackContainerType> = ({disabled, packUserId}) => {
    const [show, setShow] = useState(false);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const dispatch = useAppDispatch()

    const onClickCreateHandler = () => {
        dispatch(createCardTC({cardsPack_id: packUserId, answer, question}))
        setQuestion('')
        setAnswer('')
        setShow(false)
    }

    const onClickCloseHandler = () => {
        setShow(false)
        setQuestion('')
        setAnswer('')
    }

    return (
        <>
            <Button onClick={() => setShow(true)}
                    color={COLORS.MAIN_DARK}
                    disabled={disabled}>Add new card</Button>
            <Modal backgroundOnClick={onClickCloseHandler} show={show}>
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <h3>Add new Card</h3>
                    </div>

                    <div className={styles.textArea}>
                        <TextArea sign="question"
                                  color={COLORS.HEADER_BOTTOM}
                                  autoFocus
                                  value={question}
                                  onChangeText={(e) => setQuestion(e.currentTarget.value)}/>
                    </div>

                    <div className={styles.textArea}>
                        <TextArea sign="answer"
                                  color={COLORS.HEADER_BOTTOM}
                                  value={answer}
                                  onChangeText={(e) => setAnswer(e.currentTarget.value)}/>
                    </div>

                    <div className={styles.buttons}>
                        <Button color={COLORS.HEADER_BOTTOM}
                                onClick={onClickCreateHandler}>Save</Button>
                        <Button color={COLORS.HEADER_BOTTOM}
                                onClick={onClickCloseHandler}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}