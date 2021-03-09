import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import style from './navBarItem.styles.module.scss';

const NavBarItem = ({ children, href, className }) => {
    const router = useRouter();

    const classNames = useMemo(() => `${style.navBarItem} ${className}  ${router.pathname === href && style.active}`, [
        href,
        router,
    ]);

    const handleClick = (e) => {
        e.preventDefault();
        router.push(href);
    };

    return (
        <li className={classNames}>
            <a href={href} onClick={handleClick}>
                {children}
            </a>
        </li>
    );
};

export default NavBarItem;
