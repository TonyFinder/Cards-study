import React, {useEffect} from 'react';
import {setPacksTC} from "../../../../_bll/features/cards/packsReducer";
import {useAppDispatch, useCustomSelector} from "../../../../_bll/main/store";
import {Navigate} from "react-router-dom";
import {Pack} from "./pack/Pack";
import styles from "./packs.module.scss";


export const Packs = () => {

    const pack = useCustomSelector(state => state.pack);
    const isLogin = useCustomSelector(state => state.login.isLoggedIn);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isLogin) {
            dispatch(setPacksTC({
                packName: "English",
                min: 2,
                max: 100,
                sortPacks: "0updated",
                page: 1,
                pageCount: 10,
                userId: "",
            }))
        }
    }, [isLogin, dispatch]);


    if (!isLogin) {
        return <Navigate to='/login'/>
    }

    return (
        <div className={styles.container}>
            {pack.cardPacks.map(p => <Pack data={p}/>)}
        </div>
    );
};
