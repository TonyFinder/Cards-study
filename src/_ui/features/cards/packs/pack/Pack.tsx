import React from 'react';
import {PackType} from "../../../../../_dal/api-vadim";
import { SearchCards } from '../../searchPack/SearchPack';
import styles from './pack.module.scss';

type PackPropsType = {
    data: PackType
}

export const Pack: React.FC<PackPropsType> = (props) => {

    const {
        name,
        cardsCount,
        updated,
        user_name,
    } = props.data;

    return (
        <div className={styles.row}>
            <SearchCards/>
            <span>
                {name}
            </span>
            <span>
                {cardsCount}
            </span>
            <span>
                {updated.slice(0, 10)}
            </span>
            <span>
                {user_name}
            </span>
            <span>
                actions
            </span>
        </div>
    );
};



