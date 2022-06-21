import {Route, Routes} from 'react-router-dom';
import {dataRoutes} from '../../../../utils/_values';
import style from './Router.module.scss';
import {AnimationModal} from "../../../features/modal/animationModal/AnimationModal";
import React from "react";

export const Router = () => {
    return <div className={style.routContainer}>
        <AnimationModal/>
        <Routes>
            {dataRoutes.routes.map(item =>
                <Route key={item.id} path={item.path} element={item.element}/>)}
        </Routes>
    </div>
}