import React, {useEffect} from 'react';
import {initialStatePacksType, setPacksTC, updateParams} from '../../../../_bll/features/cards/packsReducer';
import {useAppDispatch, useCustomSelector} from '../../../../_bll/main/store';
import {Navigate} from 'react-router-dom';
import {Pack} from './pack/Pack';
import styles from './packs.module.scss';
import {maxMinValueType, Slider} from '../../../common/_superComponents/Slider/Slider';
import {DoubleButton} from '../../../common/_superComponents/DoubleButton/DoubleButton';
import {Button} from '../../../common/_superComponents/Button/Button';
import {Pagination} from './components/pagination/Pagination';
import {InputComponent} from './components/inputComponent/InputComponent';
import {COLORS} from '../../../../utils/_values';
import {LoadingStatusType} from '../../../../utils/enums';
import {Loader} from '../../../common/_superComponents/Loader/Loader';

const headerTable = {
    name: "Name",
    cardsCount: "Cards",
    updated: "Last updated",
    user_name: "Created by",
    _id: "_id",
    user_id: "user_id",
    created: "Actions",
    header: true
}


export const Packs = () => {

    const {
        packParams,
        cardPacks,
        cardPacksTotalCount,
        page,
        pageCount
    } = useCustomSelector<initialStatePacksType>(state => state.packs)
    const isLogin = useCustomSelector<boolean>(state => state.login.isLoggedIn)
    const userId = useCustomSelector<string>(state => state.login.userId)
    const loading = useCustomSelector<LoadingStatusType>(state => state.app.loadingStatus)
    const disabled = loading === LoadingStatusType.active

    // Detect sorting column
    const sortPacks = useCustomSelector<string>(state => state.packs.packParams.sortPacks ? state.packs.packParams.sortPacks : '')
    const direction = sortPacks.slice(0,1)
    const column = sortPacks.slice(1)

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isLogin) {
            dispatch(setPacksTC())
        }
    }, [isLogin, dispatch, packParams]);

    const onPageChangeHandler = (page: number | string) => {
        if (loading === LoadingStatusType.active) return
        dispatch(updateParams({page: +page}))
    }
    const onMouseUpSliderHandler = ({min, max}: maxMinValueType) => {
        dispatch(updateParams({min, max, page: 1}))
    }
    const onClickMyAllChanger = (value: string) => {
        value === 'my'
            ? dispatch(updateParams({user_id: `${userId}`, page: 1}))
            : dispatch(updateParams({user_id: '', page: 1}))
    }

    if (!isLogin) {
        return <Navigate to='/login'/>
    }

    return (
        <div className={styles.block}>
            <div className={styles.container}>
                <div className={styles.settings}>
                    Show packs cards <br/><br/>
                    <DoubleButton active={[!!packParams.user_id, !packParams.user_id]}
                                  activeColor={COLORS.MAIN_DARK} disableColor={COLORS.MAIN_LIGHT}
                                  onClick={onClickMyAllChanger}
                                  disabled={disabled}/>
                    <br/><br/>
                    Number of cards
                    <Slider min={Number(packParams.min)}
                            max={Number(packParams.max)}
                            minDefault={0}
                            maхDefault={120}
                            onMouseUp={onMouseUpSliderHandler}
                            disabled={disabled}/>
                </div>
                <div className={styles.packs}>
                    <div className={styles.header}>
                        <InputComponent disabled={disabled}/>
                        <Button color={COLORS.MAIN_DARK} disabled={disabled}>Add new pack</Button>
                    </div>
                    <div className={styles.table}>
                        <Pack sort={[direction, column]} {...headerTable}/>
                        {loading === LoadingStatusType.active
                            ? <Loader color={COLORS.MAIN_DARK} className={styles.loader}/>
                            : cardPacks.map(p => <Pack key={p._id} sort={[direction, column]} {...p}/>)
                        }
                    </div>
                    <Pagination
                        siblingCount={1}
                        className=""
                        currentPage={page}
                        totalCount={cardPacksTotalCount}
                        pageSize={pageCount}
                        onPageChange={onPageChangeHandler}

                    />
                </div>
            </div>

        </div>
    );
};