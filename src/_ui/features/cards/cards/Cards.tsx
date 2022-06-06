import React from 'react';
import {useParams} from "react-router-dom";

export const Cards = () => {

    let {packId, packName} = useParams()

    return (
        <div>
            HI{packId}
            {packName}
        </div>
    );
};
