import React, {useEffect} from 'react';
import {setPacksTC} from "../../../../_bll/features/cards/packsReducer";
import {useAppDispatch, useCustomSelector} from "../../../../_bll/main/store";
import {Navigate} from "react-router-dom";
import {Pack} from "./pack/Pack";
import styles from "./packs.module.scss";
import {Button} from '../../../common/_superComponents/Button/Button';
import {Input} from "../../../common/_superComponents/Input/Input";

const headerTable = {
    name: "Name",
    cardsCount: "Cards",
    updated: "Last updated",
    user_name: "Created by",
    _id: "_id",
    user_id: "user_id",
    created: "Actions",
}


export const Packs = () => {

    const packs = useCustomSelector(state => state.packs);
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
                pageCount: 8,
                userId: "",
            }))
        }
    }, [isLogin, dispatch]);


    if (!isLogin) {
        return <Navigate to='/login'/>
    }

    return (
        <div className={styles.block}>
            <div className={styles.container}>
                <div className={styles.settings}>
                    Show packs cards <br/>
                    MY ALL <br/>
                    Number of cards <br/>
                </div>

                <div className={styles.packs}>
                    <div className={styles.input}>
                        <h2>Packs list </h2>
                        <div>
                            <Input type="text"/>
                            <Button>Add new pack</Button>
                        </div>
                    </div>
                    <div className={styles.table}>
                        <Pack header={true} {...headerTable}/>
                        {packs.cardPacks.map(p => <Pack {...p}/>)}
                    </div>
                    <div className={styles.page}>
                        Pagination <br/>
                    </div>
                </div>
            </div>

        </div>
    );
};
