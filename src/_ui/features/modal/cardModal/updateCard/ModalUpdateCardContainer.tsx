import React, {useCallback, useEffect, useState} from 'react';
import {Button} from '../../../../common/_superComponents/Button/Button';
import {useAppDispatch} from '../../../../../_bll/main/store';
import styles from '../../ModalTemplate.module.scss'
import {updateCardTC} from '../../../../../_bll/features/cards/cardsReducer';
import {COLORS} from '../../../../../utils/_values';
import {TextArea} from '../../../../common/_superComponents/TextArea/TextArea';
import {Modal} from '../../Modal';
import {toShortMessage} from '../../../../../utils/functions';

type ModalUpdateContainerType = {
    cardId: string
    cardQuestion: string
    cardAnswer: string
    disabled: boolean
}


export const ModalUpdateCardContainer: React.FC<ModalUpdateContainerType> = React.memo( ({cardId, cardQuestion, cardAnswer, disabled}) => {
    const [show, setShow] = useState(false);
    const [question, setQuestion] = useState(cardQuestion);
    const [answer, setAnswer] = useState(cardAnswer);

    const dispatch = useAppDispatch()

    useEffect(() => {
        setQuestion(cardQuestion)
        setAnswer(cardAnswer)
    }, [show, cardQuestion, cardAnswer])


    const onClickUpdateHandler = useCallback( () => {
        dispatch(updateCardTC({_id: cardId, question, answer}, cardQuestion))
        setShow(false)
    }, [dispatch, cardId, question, answer, cardQuestion])

    const onClickCloseModalHandler = useCallback( () => {
        setShow(false)
        setQuestion(cardQuestion)
        setAnswer(cardAnswer)
    }, [cardAnswer, cardQuestion])

    // Logic for leaving modal window in case ESC button is pressed
    const escFunction = useCallback( (event: KeyboardEvent) => {
        event.code === 'Escape' && onClickCloseModalHandler()
    }, [onClickCloseModalHandler])

    useEffect(() => {
        document.addEventListener("keydown", escFunction)

        return () => {
            document.removeEventListener("keydown", escFunction)
        }
    }, [escFunction])

    return (
        <>
            <Button color={COLORS.MAIN_DARK}
                    disabled={disabled}
                    onClick={() => setShow(true)}
                    className={styles.button}>Edit</Button>
            <Modal backgroundOnClick={onClickCloseModalHandler} show={show}>
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <h3>Change card: "{toShortMessage(cardQuestion, 100)}"</h3>
                    </div>

                    <div className={styles.textArea}>
                    <TextArea sign='New question'
                              value={question}
                              color={COLORS.MAIN_DARK}
                              autoFocus
                              onChangeText={(e) => setQuestion(e.currentTarget.value)}/>
                    </div>

                    <div className={styles.textArea}>
                    <TextArea sign='New answer'
                              value={answer}
                              color={COLORS.MAIN_DARK}
                              onChangeText={(e) => setAnswer(e.currentTarget.value)}/>
                    </div>

                    <div className={styles.buttons}>
                        <Button color={COLORS.HEADER_BOTTOM}
                                disabled={(question === cardQuestion && answer === cardAnswer) || !question || !answer}
                                onClick={onClickUpdateHandler}>Save</Button>
                        <Button color={COLORS.HEADER_BOTTOM}
                                onClick={onClickCloseModalHandler}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
})