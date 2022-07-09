import {Route, Routes} from 'react-router-dom';
import {dataRoutes} from '../../../../utils/_values';
import React from "react";
import {NotificationProvider} from "../../../features/modal/notification/NotificationProvider";

export const Router = React.memo( () => {
    return <div>
        <NotificationProvider/>
        <Routes>
            {dataRoutes.routes.map(item =>
                <Route key={item.id} path={item.path} element={item.element}/>)}
        </Routes>
    </div>
})