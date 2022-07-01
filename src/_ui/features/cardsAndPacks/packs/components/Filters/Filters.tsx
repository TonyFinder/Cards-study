import React from 'react';
import styles from './Filters.module.scss';
import {DoubleButton} from '../../../../../common/_superComponents/DoubleButton/DoubleButton';
import {COLORS} from '../../../../../../utils/_values';
import {maxMinValueType, Slider} from '../../../../../common/_superComponents/Slider/Slider';
import {setShowFilters, updatePacksParams} from '../../../../../../_bll/features/cards/packsReducer';
import {useAppDispatch, useCustomSelector} from '../../../../../../_bll/main/store';
import { Button } from '../../../../../common/_superComponents/Button/Button';

type FiltersPropsType = {
    disabled: boolean
    min: number
    max: number
    minCardsCount: number
    maxCardsCount: number
    changeSlider: boolean
    onResetFilters: (value: string) => void
}

export const Filters = (
    {
        disabled,
        min, max, minCardsCount, maxCardsCount,
        changeSlider,
        onResetFilters
    }: FiltersPropsType) => {

    const dispatch = useAppDispatch()
    const userId = useCustomSelector<string>(state => state.profile._id)
    const user_id = useCustomSelector<string|undefined>(state => state.packs.packParams.user_id)

    const onMouseUpSliderHandler = ({min, max}: maxMinValueType) => {
        dispatch(updatePacksParams({min, max, page: 1}))
    }
    const onClickMyAllOrResetChanger = (value: string) => {
        value === 'my'
            ? onResetFilters(userId)
            : onResetFilters('')
    }
    const onClickCrossHandler = () => {
      dispatch(setShowFilters(false))
    }

    return <div className={styles.settingsBlock}>
        <div className={styles.settings}>
            <div className={styles.showPacks}>
                <p>Show packs cards</p>
                <DoubleButton active={[!!user_id, !user_id]}
                              activeColor={COLORS.MAIN_DARK} disableColor={COLORS.MAIN_LIGHT}
                              onClick={onClickMyAllOrResetChanger}
                              disabled={disabled}/>
            </div>
            <div className={styles.showNumberPacks}>
                <p>Number of cards</p>
                <Slider min={min}
                        max={max}
                        minDefault={minCardsCount}
                        maxDefault={maxCardsCount}
                        onMouseUp={onMouseUpSliderHandler}
                        disabled={disabled}
                        changeSlider={changeSlider}
                />
            </div>
            <div className={styles.button}>
                <Button onClick={() => onClickMyAllOrResetChanger(user_id ? 'my' : '')}
                        color={'red'}>Reset filters</Button>
            </div>
        </div>
        <div className={styles.cross} onClick={onClickCrossHandler}>&#10006;</div>
    </div>
}