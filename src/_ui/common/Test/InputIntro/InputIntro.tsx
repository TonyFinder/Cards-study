import React, {useState} from 'react';
import styles from '../TestBlocks.module.scss';
import {dataTestPage} from '../../../../utils/_values';
import {Input} from '../../_superComponents/Input/Input';

export const InputIntro = () => {
    const [text, setText] = useState<string[]>(['', 'Value is typed', ''])
    const [error, setError] = useState<boolean[]>([false, false, true])

    const setTextHandler = (position: number, value: string) =>
        setText(text.map((pos, i) => i === position ? value : pos))
    const setErrorHandler = (position: number, value: boolean) =>
        setError(error.map((pos, i) => i === position ? value : pos))

    return (
        <div className={styles.innerBlock}>
            <div className={styles.innerBlock}>
                <div className={styles.description}>
                    <h3>{dataTestPage.input.header}</h3>
                    {dataTestPage.input.comments.map((comment, i) => <span key={i}>{comment}</span>)}
                </div>
                <div>
                    {dataTestPage.input.rowFirst.map(item =>
                        <Input key={item.id}
                               color={item.color}
                               value={text[item.id]}
                               sign={item.sign}
                               placeholder={item.placeholder}
                               onChangeText={(value: string) => setTextHandler(item.id, value)}
                               onChangeError={(value: boolean) => setErrorHandler(item.id, value)}
                               onEnter={() => alert('Data is accepted')}
                               error={error[item.id]}
                               disabled={item.disable}/>)}
                </div>
            </div>
        </div>
    );
};