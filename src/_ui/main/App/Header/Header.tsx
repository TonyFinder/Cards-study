import styles from './Header.module.scss'
import {dataRoutes} from '../../../../utils/_values';
import {HeaderLink} from '../../../common/_superComponents/HeaderLink/HeaderLink';

export const Header = () => {
    return <div className={styles.container}>
        {dataRoutes.routes.map(item => item.visible && <HeaderLink key={item.id} to={item.path}>{item.title}</HeaderLink>)}
    </div>
}