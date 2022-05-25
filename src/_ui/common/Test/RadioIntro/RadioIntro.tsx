import React, {useState} from 'react';
import styles from '../TestBlocks.module.scss';
import {dataTestPage} from '../../../../utils/_values';
import {Radio} from '../../_superComponents/Radio/Radio';

export const RadioIntro = () => {
    const [radioSelect, setRadioSelect] = useState<boolean[]>([false, true, false])

    const onClickRadio = (position: number) => setRadioSelect(radioSelect.map((i, index) => index === position))

    return (
        <div className={styles.innerBlock}>
            <div className={styles.innerBlock}>
                <div className={styles.description}>
                    <h3>{dataTestPage.radio.header}</h3>
                    {dataTestPage.radio.comments.map((comment, i) => <span key={i}>{comment}</span>)}
                </div>
                <div>
                    {dataTestPage.radio.rowFirst.map(item =>
                        <Radio key={item.id}
                               color={item.color}
                               checked={radioSelect[item.id]}
                               onClick={() => onClickRadio(item.id)}
                               disabled={item.disable}
                        >{item.title}</Radio>)}
                </div>
                <div>
                    {dataTestPage.radio.rowSecond.map(item =>
                        <Radio key={item.id}
                               checked={item.checked}
                               disabled={item.disable}
                        >{item.title}</Radio>)}
                </div>
            </div>
        </div>
    );
};