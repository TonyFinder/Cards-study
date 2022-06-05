import {Route, Routes} from 'react-router-dom';
import {dataRoutes} from '../../../../utils/_values';


export const Router = () => {
    return <>
        <Routes>
            {dataRoutes.routes.map(item =>
                <Route key={item.id} path={item.path} element={item.element}/>)}
        </Routes>
    </>
}