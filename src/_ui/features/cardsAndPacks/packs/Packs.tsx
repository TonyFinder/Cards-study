import React, {useCallback, useEffect, useState} from 'react';
import {initialStatePacksType, setPacksTC, updatePacksParams} from '../../../../_bll/features/cards/packsReducer';
import {useAppDispatch, useCustomSelector} from '../../../../_bll/main/store';
import {Navigate, useNavigate} from 'react-router-dom';
import styles from './Packs.module.scss';
import {COLORS, ROUTE_PATHS} from '../../../../utils/_values';
import {LoadingStatusType} from '../../../../utils/enums';
import {Loader} from '../../../common/_superComponents/Loader/Loader';
import {setCardsTC, updateCardParams} from '../../../../_bll/features/cards/cardsReducer';
import {ModalCreatePackContainer} from '../../modal/packModal/createPack/ModalCreatePackContainer';
import {Input} from '../../../common/_superComponents/Input/Input';
import {Filters} from './components/Filters/Filters';
import {InputComponent} from './components/InputComponent/InputComponent';
import { Pack } from './Pack/Pack';
import useDebounce from './components/InputComponent/castomHookUseDebounce';
import {Pagination} from './components/pagination/Pagination';

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

export const Packs = React.memo( () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {
        packParams,
        cardPacks,
        cardPacksTotalCount,
        page,
        pageCount,
        maxCardsCount,
        minCardsCount,
        showFilters,
    } = useCustomSelector<initialStatePacksType>(state => state.packs)
    const isLogin = useCustomSelector<boolean>(state => state.auth.isLoggedIn)
    const loading = useCustomSelector<LoadingStatusType>(state => state.app.loadingStatus)
    const disabled = loading === LoadingStatusType.active

    const [hiddenText, showHiddenText] = useState<string>('')

    //For update slider if minDefault/maxDefault not change
    const [isChangeSlider, setIsChangeSlider] = useState(false)

    // Detect sorting column
    const sortPacks = useCustomSelector<string>(state => state.packs.packParams.sortPacks ? state.packs.packParams.sortPacks : '')
    const direction = sortPacks.slice(0, 1)
    const column = sortPacks.slice(1)

    // Debounce logic
    const [paginationInput, setPaginationInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedPaginationInput = useDebounce(paginationInput, 1000);
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    useEffect(() => {
        if (isLogin) {
            dispatch(setPacksTC())
        }
    }, [isLogin, dispatch, packParams.sortPacks, packParams.max, packParams.min, packParams.page, packParams.pageCount, packParams.packName, packParams.user_id])

    useEffect(() => {
        if (debouncedPaginationInput === '') return
        dispatch(updatePacksParams({page: +debouncedPaginationInput}))
        setPaginationInput('')
    }, [debouncedPaginationInput, dispatch])

    useEffect(() => {
        dispatch(updatePacksParams({packName: debouncedSearchTerm, page: 1}))
    }, [debouncedSearchTerm, dispatch])

    const onPageChangeHandler = useCallback( (page: number) => {
        if (loading === LoadingStatusType.active) return
        dispatch(updatePacksParams({page}))
        setPaginationInput('')
    }, [dispatch, loading])

    const onClickResetFiltersHandler = useCallback( (value: string) => {
        setIsChangeSlider(!isChangeSlider)
        dispatch(updatePacksParams({
            user_id: value,
            page: 1, packName: "",
            min: 0,
            max: 0,
            sortPacks: "0updated"}))
        setSearchTerm('')
    }, [dispatch, isChangeSlider])

    const onClickToLearn = useCallback( (packId: string) => {
        dispatch(updateCardParams({cardsPack_id: packId}))
        dispatch(setCardsTC())
        navigate(`${ROUTE_PATHS.QUESTION}/${packId}`)
    }, [dispatch, navigate])

    if (!isLogin) return <Navigate to={ROUTE_PATHS.LOGIN}/>

    return (
        <div className={styles.block}>
            <div className={styles.container}>

                {hiddenText && <>
                    <div className={styles.showHiddenText}>{hiddenText}</div>
                    <div className={styles.cross} onClick={()=>showHiddenText('')}>&#10006;</div>
                </>}

                <div className={styles.filters}>
                    <Filters min={Number(packParams.min)} max={Number(packParams.max)}
                             minCardsCount={minCardsCount} maxCardsCount={maxCardsCount}
                             changeSlider={isChangeSlider}
                             onResetFilters={onClickResetFiltersHandler}
                             disabled={disabled}/>
                </div>

                <div className={styles.packs}>
                    <div className={styles.header}>
                        <InputComponent value={searchTerm}
                                        onChange={setSearchTerm}
                                        onResetFilters={() => onClickResetFiltersHandler(packParams.user_id ? packParams.user_id : '')}
                                        disabled={disabled}/>
                        <ModalCreatePackContainer disabled={disabled}/>
                    </div>

                    <div className={styles.filtersSmall}>
                        {showFilters && <Filters min={Number(packParams.min)} max={Number(packParams.max)}
                                                 minCardsCount={minCardsCount} maxCardsCount={maxCardsCount}
                                                 changeSlider={isChangeSlider}
                                                 onResetFilters={onClickResetFiltersHandler}
                                                 disabled={disabled}/>
                        }
                    </div>

                    <div className={styles.tableWrap}>
                        <div className={styles.table}>
                            <Pack sort={[direction, column]} {...headerTable}/>
                            {loading === LoadingStatusType.active
                                ? <Loader color={COLORS.MAIN_DARK} className={styles.loader}/>
                                : cardPacks.length > 0
                                    ? cardPacks.map(p => <Pack key={p._id}
                                                               sort={[direction, column]} {...p}
                                                               onClick={onClickToLearn}
                                                               showHiddenText={showHiddenText}/>)
                                    : <span className={styles.emptyPacksText}>There is no data according to your search parameters...</span>
                            }
                        </div>
                    </div>

                    <div className={styles.page}>
                        <Pagination
                            siblingCount={0}
                            currentPage={page}
                            totalCount={cardPacksTotalCount}
                            pageSize={pageCount}
                            onPageChange={onPageChangeHandler}
                        />
                        <div className={`${styles.jumper} ${cardPacksTotalCount < 9 && styles.hide}`}>
                            <span>Go to</span>
                            <Input type={'number'}
                                   value={paginationInput ? paginationInput : ''}
                                   onChangeText={setPaginationInput}
                                   min="1" max={cardPacksTotalCount%pageCount ? cardPacksTotalCount/pageCount + 1 : cardPacksTotalCount/pageCount}
                                   disabled={disabled}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})