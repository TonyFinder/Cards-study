import React, {useState} from 'react';
import styles from '../TestBlocks.module.scss';
import {dataTestPage} from '../../../../utils/_values';
import {DoubleButton} from '../../_superComponents/DoubleButton/DoubleButton';

export const DoubleButtonIntro = () => {
    const doubleButtonData = dataTestPage.doubleButton
    const [activeButton, setActiveButton] = useState(doubleButtonData.rowFirst[0])

    return (
        <div className={styles.innerBlock}>
            <div className={styles.description}>
                <h3>{doubleButtonData.header}</h3>
                {doubleButtonData.comments.map((comment, i) => <span key={i}>{comment}</span>)}
            </div>
            <div>
                <DoubleButton key={activeButton.id}
                              activeColor={activeButton.activeColor}
                              disableColor={activeButton.disableColor}
                              active={activeButton.active}
                              onClick={() => setActiveButton({...activeButton, active: [!activeButton.active[0], !activeButton.active[1]]})}/>
            </div>
        </div>
    )
}