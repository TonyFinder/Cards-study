import React from 'react';
import styles from '../../../Template.module.scss';
import {Button} from '../../../../common/_superComponents/Button/Button';
import {LoadingStatusType} from '../../../../../utils/enums';
import {COLORS} from '../../../../../utils/_values';
import {Loader} from '../../../../common/_superComponents/Loader/Loader';
import {useCustomSelector} from '../../../../../_bll/main/store';

export const Question = () => {
    const loading = useCustomSelector<LoadingStatusType>(state => state.app.loadingStatus)

    return <div className={styles.container}>
        <div className={styles.block}>
            <h2 className={styles.headerSecond}>Learn 'PACK NAME'</h2>

            <div className={styles.question_answer}>
                <p><b>Question: </b>"I am question here"</p>
            </div>

            <div className={styles.button}>
                {loading === LoadingStatusType.disabled
                    ? <>
                        <Button color={COLORS.MAIN_DARK} onClick={()=>''}>Leave</Button>
                        <Button color={COLORS.MAIN_DARK} onClick={()=>''}>Answer</Button>
                    </>
                    : <Loader color={COLORS.MAIN_DARK}/>
                }
            </div>
        </div>
    </div>
}