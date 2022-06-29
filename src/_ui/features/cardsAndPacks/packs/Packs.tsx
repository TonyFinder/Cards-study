import React, {useEffect, useState} from 'react';
import {initialStatePacksType, setPacksTC, updatePacksParams} from '../../../../_bll/features/cards/packsReducer';
import {useAppDispatch, useCustomSelector} from '../../../../_bll/main/store';
import {Navigate, useNavigate} from 'react-router-dom';
import {Pack} from './pack/Pack';
import styles from './packs.module.scss';
import {Pagination} from './components/pagination/Pagination';
import {InputComponent} from './components/inputComponent/InputComponent';
import {COLORS, ROUTE_PATHS} from '../../../../utils/_values';
import {LoadingStatusType} from '../../../../utils/enums';
import {Loader} from '../../../common/_superComponents/Loader/Loader';
import useDebounce from './components/inputComponent/castomHookUseDebounce';
import {setCardsTC, updateCardParams} from '../../../../_bll/features/cards/cardsReducer';
import {ModalCreatePackContainer} from '../../modal/packModal/createPack/ModalCreatePackContainer';
import {Input} from '../../../common/_superComponents/Input/Input';
import {Filters} from './components/Filters/Filters';

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
    } = useCustomSelector<initialStatePacksType>(state => state.packs)
    const isLogin = useCustomSelector<boolean>(state => state.login.isLoggedIn)
    const loading = useCustomSelector<LoadingStatusType>(state => state.app.loadingStatus)
    const disabled = loading === LoadingStatusType.active

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

    const [showFilters, setShowFilters] = useState<boolean>(false)

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

    const onPageChangeHandler = (page: number) => {
        if (loading === LoadingStatusType.active) return
        dispatch(updatePacksParams({page}))
        setPaginationInput('')
    }
    const onClickResetFiltersHandler = () => {
        setIsChangeSlider(!isChangeSlider)
        dispatch(updatePacksParams({
            page: 1, min: minCardsCount, max: maxCardsCount,
            sortPacks: '0updated',
            user_id: '',
            packName: ''
        }))
        setSearchTerm('')
    }
    const onClickToLearn = (packId: string) => {
        dispatch(updateCardParams({cardsPack_id: packId}))
        dispatch(setCardsTC())
        navigate(`${ROUTE_PATHS.QUESTION}/${packId}`)
    }

    if (!isLogin) return <Navigate to={ROUTE_PATHS.LOGIN}/>

    return (
        <div className={styles.block}>
            <div className={styles.container}>

                <div className={styles.filters}>
                    <Filters user_id={!!packParams.user_id} disabled={disabled}
                             min={Number(packParams.min)} max={Number(packParams.max)}
                             minCardsCount={minCardsCount} maxCardsCount={maxCardsCount}
                             changeSlider={isChangeSlider}
                             setShowFilters={setShowFilters} onResetFilters={onClickResetFiltersHandler}/>
                </div>

                <div className={styles.packs}>
                    <div className={styles.header}>
                        <InputComponent value={searchTerm}
                                        onChange={setSearchTerm}
                                        onClickShowFilters={() => setShowFilters(!showFilters)}
                                        onResetFilters={onClickResetFiltersHandler}
                                        disabled={disabled}/>
                        <ModalCreatePackContainer disabled={disabled}/>
                    </div>

                    <div className={styles.filtersSmall}>
                        {showFilters && <Filters user_id={!!packParams.user_id} disabled={disabled}
                                                 min={Number(packParams.min)} max={Number(packParams.max)}
                                                 minCardsCount={minCardsCount} maxCardsCount={maxCardsCount}
                                                 changeSlider={isChangeSlider}
                                                 setShowFilters={(value) => setShowFilters(value)}/>
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
                                                               onClick={onClickToLearn}/>)
                                    : <span className={styles.emptyPacksText}>There is no data according to your search parameters...</span>
                            }
                        </div>
                    </div>

                    <div className={styles.page}>
                        <Pagination
                            siblingCount={1}
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
    );
};