import React, {useState} from 'react';
import styles from '../TestBlocks.module.scss';
import {dataTestPage} from '../../../../utils/_values';
import {SortButton} from '../../_superComponents/SortButton/SortButton';

export const SortButtonIntro = () => {
    const values = dataTestPage.sortButton.rowFirst
    const [sortButtons, setSortButtons] = useState(values)

    const onClickHandler = (value: number) => {
        setSortButtons(sortButtons.map(m => m.id === value
            ? {
                ...m, value: m.value === '0'
                    ? '1'
                    : m.value === '1'
                        ? '2'
                        : '0'
            }
            : m))
    }

    return (
        <div className={styles.innerBlock}>
            <div className={styles.description}>
                <h3>{dataTestPage.sortButton.header}</h3>
                {dataTestPage.sortButton.comments.map((comment, i) => <span key={i}>{comment}</span>)}
            </div>
            <div className={styles.component}>
                {sortButtons.map((item, i) =>
                    <SortButton key={item.id} title={item.title} value={item.value} color={item.color} onClick={() => onClickHandler(i)}/>)}
            </div>
        </div>
    )
}