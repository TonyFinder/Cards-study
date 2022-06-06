import {Route, Routes} from 'react-router-dom';
import {dataRoutes} from '../../../../utils/_values';
import style from './Router.module.scss';

export const Router = () => {
    return <div className={style.routContainer}>
        <Routes>
            {dataRoutes.routes.map(item =>
                <Route key={item.id} path={item.path} element={item.element}/>)}
        </Routes>
    </div>
}