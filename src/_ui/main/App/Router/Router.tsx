import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../../../features/auth/_Login/Login';
import {Register} from '../../../features/auth/_Register/Register';
import {Forgot} from '../../../features/auth/Forgot/Forgot';
import {SetPass} from '../../../features/auth/SetPass/SetPass';
import {Profile} from '../../../features/Profile/Profile';
import {Test} from '../../../common/Test/Test';
import {Error404} from '../../../common/Error404/Error404';
import {ROUTE_PATHS} from '../../../../utils/_values';

export const Router = () => {
  return <div>
    <Routes>
      <Route path={ROUTE_PATHS.MAIN} element={<Navigate to={ROUTE_PATHS.LOGIN}/>}/>
      <Route path={ROUTE_PATHS.LOGIN} element={<Login/>}/>
      <Route path={ROUTE_PATHS.REGISTER} element={<Register/>}/>
      <Route path={ROUTE_PATHS.FORGOT} element={<Forgot/>}/>
      <Route path={ROUTE_PATHS.SET_PASS} element={<SetPass/>}/>
      <Route path={ROUTE_PATHS.PROFILE} element={<Profile/>}/>
      <Route path={ROUTE_PATHS.TEST} element={<Test/>}/>
      <Route path={ROUTE_PATHS.ERROR_404} element={<Error404/>}/>
    </Routes>
  </div>
}