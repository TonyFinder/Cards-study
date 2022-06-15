import React, {useState} from 'react';
import styles from '../../../Template.module.scss'
import {Button} from '../../../../common/_superComponents/Button/Button';
import {LoadingStatusType} from '../../../../../utils/enums';
import {COLORS} from '../../../../../utils/_values';
import {Loader} from '../../../../common/_superComponents/Loader/Loader';
import {useCustomSelector} from '../../../../../_bll/main/store';
import {Radio} from '../../../../common/_superComponents/Radio/Radio';

export const Answer = () => {
    const loading = useCustomSelector<LoadingStatusType>(state => state.app.loadingStatus)

    const [radioSelect, setRadioSelect] = useState<{id: number, title: string, selected: boolean}[]>([
        {id: 0, title: 'Did not know', selected: false},
        {id: 1, title: 'Forgot', selected: false},
        {id: 2, title: 'A lot of thought', selected: false},
        {id: 3, title: 'Confused', selected: false},
        {id: 4, title: 'Knew the answer', selected: false},
    ])
    const onClickRadio = (position: number) => {
        setRadioSelect(radioSelect.map(item =>
            item.id === position
                ? {...item, selected: true}
                : {...item, selected: false}))
    }

    return <div className={styles.container}>
        <div className={styles.block}>
            <h2 className={styles.headerSecond}>Learn 'PACK NAME'</h2>

            <div className={styles.question_answer}>
                <p><b>Question: </b>"I am question here"</p>
                <p><b>Answer: </b>"I am answer here"</p>
            </div>

            <div className={styles.rateYourself}>
                <p><b>Rate yourself:</b></p>
                <div>
                    {radioSelect.map(item =>
                        <Radio key={item.id}
                               color={COLORS.MAIN_DARK}
                               checked={item.selected}
                               onClick={() => onClickRadio(item.id)}
                        >{item.title}</Radio>)}
                </div>
            </div>

            <div className={styles.button}>
                {loading === LoadingStatusType.disabled
                    ? <>
                        <Button color={COLORS.MAIN_DARK} onClick={()=>''}>Leave</Button>
                        <Button color={COLORS.MAIN_DARK} onClick={()=>''}>Next</Button>
                    </>
                    : <Loader color={COLORS.MAIN_DARK}/>
                }
            </div>
        </div>
    </div>
}
