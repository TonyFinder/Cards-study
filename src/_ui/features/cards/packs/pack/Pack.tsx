import React from 'react';
import {PackType} from "../../../../../_dal/api-vadim";
import {Button} from '../../../../common/_superComponents/Button/Button';
import styles from './pack.module.scss';


export const Pack: React.FC<PackType> = (props) => {

    const {
        name,
        cardsCount,
        updated,
        user_name,
    } = props;

    return (
        <div className={styles.row}>
            <span>
                {name}
            </span>
            <span>
                {cardsCount === 999 ? 'Cards' : cardsCount}
            </span>
            <span>
                {updated.slice(0, 10)}
            </span>
            <span>
                {user_name}
            </span>
            <Button color={"red"}>Delete</Button>
            <Button>Edit</Button>
            <Button>Learn</Button>
        </div>
    );
};



