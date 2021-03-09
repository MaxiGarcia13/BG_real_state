import React from 'react';
import Header from '../../src/components/organism/Header';
import styles from './layout.styles.module.scss';
import dynamic from 'next/dynamic';

const Footer = dynamic(import('../../src/components/organism/Footer'), { ssr: false });

const LayoutComponent = ({ children, className }) => {
    return (
        <>
            <Header />

            <main className={`${styles.wrapper} ${className}`}>{children}</main>

            <Footer />
        </>
    );
};

export default LayoutComponent;
