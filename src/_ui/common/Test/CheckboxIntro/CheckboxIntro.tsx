import React, {useState} from 'react';
import styles from '../TestBlocks.module.scss';
import {dataTestPage} from '../../../../utils/_values';
import {Checkbox} from '../../_superComponents/Checkbox/Checkbox';

export const CheckboxIntro = () => {
    const [checkboxValue, setCheckboxValue] = useState<boolean[]>([false, true, true, true, false, true])

    const onClickCheckbox = (position: number) =>
        setCheckboxValue(checkboxValue.map((i, index) => index === position ? !checkboxValue[index] : i))

    return (
        <div className={styles.innerBlock}>
            <div className={styles.innerBlock}>
                <div className={styles.description}>
                    <h3>{dataTestPage.checkbox.header}</h3>
                    {dataTestPage.checkbox.comments.map((comment, i) => <span key={i}>{comment}</span>)}
                </div>
                <div>
                    {dataTestPage.checkbox.rowFirst.map(item =>
                        <Checkbox key={item.id}
                                  color={item.color}
                                  checked={checkboxValue[item.id]}
                                  onClick={() => onClickCheckbox(item.id)}
                                  disabled={item.disable}
                        >{item.title}</Checkbox>)}
                </div>
                <div>
                    {dataTestPage.checkbox.rowSecond.map(item =>
                        <Checkbox key={item.id}
                                  color={item.color}
                                  checked={checkboxValue[item.id]}
                                  onClick={() => onClickCheckbox(item.id)}
                                  disabled={item.disable}
                        >{item.title}</Checkbox>)}
                </div>
            </div>
        </div>
    );
};