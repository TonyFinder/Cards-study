import React, {useCallback, useEffect, useState} from 'react';
import {Button} from '../../../../common/_superComponents/Button/Button';
import {useAppDispatch} from '../../../../../_bll/main/store';
import {COLORS} from '../../../../../utils/_values';
import styles from '../../ModalTemplate.module.scss'
import {createCardTC} from '../../../../../_bll/features/cards/cardsReducer';
import {TextArea} from '../../../../common/_superComponents/TextArea/TextArea';
import {Modal} from '../../Modal';

type ModalCreatePackContainerType = {
    disabled: boolean
    packUserId: string
}

export const ModalCreateCardContainer: React.FC<ModalCreatePackContainerType> = React.memo( ({disabled, packUserId}) => {
    const [show, setShow] = useState(false);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const dispatch = useAppDispatch()

    const onClickCloseHandler = useCallback( () => {
        setShow(false)
        setQuestion('')
        setAnswer('')
    }, [])

    const onClickCreateHandler = useCallback( () => {
        dispatch(createCardTC({cardsPack_id: packUserId, answer, question}))
        onClickCloseHandler()
    }, [dispatch, packUserId, answer, question, onClickCloseHandler])

    // Logic for leaving modal window in case ESC button is pressed
    const escFunction = useCallback( (event: KeyboardEvent) => {
        event.code === 'Escape' && onClickCloseHandler()
    }, [onClickCloseHandler])

    useEffect(() => {
        document.addEventListener("keydown", escFunction)

        return () => {
            document.removeEventListener("keydown", escFunction)
        }
    }, [escFunction])

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
                                disabled={!question || !answer}
                                onClick={onClickCreateHandler}>Save</Button>
                        <Button color={COLORS.HEADER_BOTTOM}
                                onClick={onClickCloseHandler}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
})