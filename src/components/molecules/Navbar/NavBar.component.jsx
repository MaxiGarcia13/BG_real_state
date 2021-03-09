import React from 'react';
import styles from './navbar.styles.module.scss';
import NavBarItem from '../../atoms/NavBarItem';

const NavbarComponent = ({ className }) => {
    return (
        <nav className={`${styles.navbar} ${className}`}>
            <ul>
                <NavBarItem href='/'> Productos </NavBarItem>
                <NavBarItem href='/about'> Nosotros </NavBarItem>
                <NavBarItem href='/contact'> Contactanos </NavBarItem>
            </ul>
        </nav>
    );
};

export default NavbarComponent;
