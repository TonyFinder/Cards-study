import {Link} from 'react-router-dom';
import styles from './Header.module.scss'
import {dataRoutes} from '../../../../utils/_values';

export const Header = () => {
    return <div className={styles.container}>
        {dataRoutes.routes.map(item => item.visible && <Link key={item.id} to={item.path}>{item.title}</Link>)}
    </div>
}