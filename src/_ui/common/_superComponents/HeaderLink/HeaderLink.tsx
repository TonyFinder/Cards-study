import React from 'react';
import styles from './headerLink.module.scss'
import {Link, useMatch} from 'react-router-dom';
import {COLORS} from '../../../../utils/_values';

type HeaderLinkPropsType = {
    to: string
    children: React.ReactNode
}

export const HeaderLink = ({to, children, ...props}: HeaderLinkPropsType) => {
    const match = useMatch(to)

    const style = {
        color: `${match ? COLORS.MAIN_LIGHT : COLORS.MAIN_DARK}`,
        borderBottom: `3px solid ${match ? COLORS.HEADER_BOTTOM : 'transparent'}`,
        borderRadius: '12% 12% 0 0',
        backgroundColor: `${match ? COLORS.MAIN_DARK : 'transparent'}`,
    }

    return <Link to={to}
                 style={style}
                 className={styles.link}
                 {...props}>
        {children}
    </Link>
}