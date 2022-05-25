import React, {useState} from 'react';
import styles from '../TestBlocks.module.scss';
import {dataTestPage} from '../../../../utils/_values';
import {Select} from '../../_superComponents/Select/Select';

export const SelectIntro = () => {
    const [valueSelect, setValueSelect] = useState<any[]>(['', 'Petrov', 'Levin'])
    const options = ['None', 'Ivanov', 'Petrov', 'Sidorov', 'Levin']

    const setValueSelectHandler = (position: number, value: string) =>
        setValueSelect(valueSelect.map((pos, i) => i === position ? value : pos))

    return (
        <div className={styles.innerBlock}>
            <div className={styles.innerBlock}>
                <div className={styles.description}>
                    <h3>{dataTestPage.select.header}</h3>
                    {dataTestPage.select.comments.map((comment, i) => <span key={i}>{comment}</span>)}
                </div>
                <div>
                    {dataTestPage.select.rowFirst.map(item =>
                        <Select key={item.id}
                                color={item.color}
                                options={options}
                                value={valueSelect[item.id]}
                                onChangeOption={(value: string) => setValueSelectHandler(item.id, value)}
                                disabled={item.disable}/>)}
                </div>
            </div>
        </div>
    );
};