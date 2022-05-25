import React, {useState} from 'react';
import styles from '../TestBlocks.module.scss';
import {EditableSpan} from '../../_superComponents/EditableSpan/EditableSpan';

export const EditableSpanIntro = () => {
    const [valueEditSpan, setValueEditSpan] = useState<string>('')

    return (
        <div className={styles.innerBlock}>
            <div className={styles.innerBlock}>
                <div className={styles.description}>
                    <h3>EditableSpan</h3>
                </div>
                <div>
                    <EditableSpan
                        value={valueEditSpan}
                        onChangeText={setValueEditSpan}
                        spanProps={{children: valueEditSpan ? undefined : 'double click on me to edit the text'}}
                    />
                </div>
            </div>
        </div>
    );
};