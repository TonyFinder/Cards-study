import styles from './Header.module.scss'
import {dataRoutes} from '../../../../utils/_values';
import {HeaderLink} from '../../../common/_superComponents/HeaderLink/HeaderLink';
import React from 'react';

export const Header = React.memo( () => {
    return <div className={styles.container}>
        {dataRoutes.routes.map(item => item.visible && <HeaderLink key={item.id} to={item.path}>{item.title}</HeaderLink>)}
    </div>
})