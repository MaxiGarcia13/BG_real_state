import React from 'react';
import Navbar from '../../molecules/Navbar';
import ShoppingCart from '../ShoppingCart';
import Brand from '../../atoms/Brand';
import AutocompleteArticles from '../AutocompleteArticles';
import styles from './header.styles.module.scss';

const HeaderComponent = () => {
    return (
        <header className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Brand />
                </div>

                <AutocompleteArticles className={styles.fill} />

                <div className={styles.right}>
                    <ShoppingCart />
                </div>
            </div>

            <Navbar className={styles.navBar} />
        </header>
    );
};

export default HeaderComponent;
