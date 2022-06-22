import {Route, Routes} from 'react-router-dom';
import {dataRoutes} from '../../../../utils/_values';
import style from './Router.module.scss';
import React from "react";
import {NotificationProvider} from "../../../features/modal/notification/NotificationProvider";

export const Router = () => {
    return <div className={style.routContainer}>
        <NotificationProvider/>
        <Routes>
            {dataRoutes.routes.map(item =>
                <Route key={item.id} path={item.path} element={item.element}/>)}
        </Routes>
    </div>
}