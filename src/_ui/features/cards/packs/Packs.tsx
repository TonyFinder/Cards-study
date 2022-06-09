import React, {useEffect} from 'react';
import {initialStatePacksType, setArrowButtonPage, setPacksTC} from "../../../../_bll/features/cards/packsReducer";
import {useAppDispatch, useCustomSelector} from "../../../../_bll/main/store";
import {Navigate} from "react-router-dom";
import {Pack} from "./pack/Pack";
import styles from "./packs.module.scss";
import {InputComponent} from "./components/inputComponent/InputComponent";
import {Button} from '../../../common/_superComponents/Button/Button';
import {Pagination} from "./components/pagination/Pagination";

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
    } = useCustomSelector<initialStatePacksType>(state => state.packs);
    const isLogin = useCustomSelector(state => state.login.isLoggedIn);


    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isLogin) {
            dispatch(setPacksTC())
        }
    }, [isLogin, dispatch, packParams, page]);

    const onPageChangeHandler = (page: number | string) => {

        dispatch(setArrowButtonPage(+page))
    }

    if (!isLogin) {
        return <Navigate to='/login'/>
    }

    return (
        <div className={styles.block}>
            <div className={styles.container}>
                <div className={styles.settings}>
                    Show packs cards <br/>
                    MY ALL <br/>
                    {/*<MultiRangeSlider/>*/}
                </div>
                <div className={styles.packs}>
                    <div className={styles.header}>
                        <InputComponent/>
                        <Button>Add new pack</Button>
                    </div>
                    <div className={styles.table}>
                        <Pack {...headerTable}/>
                        {cardPacks.map(p => <Pack {...p}/>)}
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