import {Link} from 'react-router-dom';
import styles from './Header.module.scss'
import {ROUTE_PATHS} from '../../../../utils/values';

export const Header = () => {
    return <div className={styles.container}>
        <Link to={ROUTE_PATHS.MAIN}>Main</Link>
        <Link to={ROUTE_PATHS.LOGIN}>Login</Link>
        <Link to={ROUTE_PATHS.REGISTER}>Register</Link>
        <Link to={ROUTE_PATHS.FORGOT}>ForgotPass</Link>
        <Link to={ROUTE_PATHS.SET_PASS}>SetPass</Link>
        <Link to={ROUTE_PATHS.PROFILE}>Profile</Link>
        <Link to={ROUTE_PATHS.TEST}>Test</Link>
        <Link to={ROUTE_PATHS.ERROR_404}>Error404</Link>
    </div>
}