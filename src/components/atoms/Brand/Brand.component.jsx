import React from 'react';
import styles from './brand.styles.module.scss';
import Link from 'next/link';

const BrandComponent = () => {
    return (
        <Link href='/'>
            <div className={styles.brand}>
                <span className={styles.title}>BG</span> <span className={styles.description}> Real estate</span>
            </div>
        </Link>
    );
};

export default BrandComponent;
