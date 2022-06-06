import React from 'react';
import {Button} from '../../../../common/_superComponents/Button/Button';
import styles from './pack.module.scss';
import {Link} from "react-router-dom";
import {ROUTE_PATHS} from "../../../../../utils/_values";

export type PackPropsType = {
    _id: string
    user_id?: string
    user_name?: string,
    name?: string
    cardsCount?: number | string
    created?: string
    updated?: string
    header?: boolean
}


export const Pack: React.FC<PackPropsType> = (props) => {

    const {
        name,
        cardsCount,
        updated,
        user_name,
    } = props;


    return (
        <div key={props._id} className={styles.row}>
            {props.header ?
                <span>{name}</span> :
                <Link to={`${ROUTE_PATHS.CARDS}/${props._id}/${name}`}>{name}</Link>}
            <span>
                {cardsCount}
            </span>
            <span>
                {updated?.slice(0, 10)}
            </span>
            <span>
                {user_name}
            </span>
            {props.header ? <div style={{'textAlign': 'center'}}>Actions</div> : <div>
                <Button color={'red'}>Delete</Button>
                <Button>Edit</Button>
                <Button>Learn</Button>
            </div>}
        </div>
    );
};


