import React from 'react';
import Skeleton from '../../../atoms/Skeleton';
import Card from '../../Card';
import styles from './cardSkeletonRow.styles.module.scss';

const CardSkeletonRowComponent = ({ className }) => (
    <Card className={`${styles.wrapper} ${className}`}>
        <Skeleton height='80px' width='80px' />
        <section className={styles.body}>
            <Skeleton height='20px' width='60%' />
            <Skeleton height='20px' width='40%' />
            <Skeleton height='20px' width='30%' />
        </section>
    </Card>
);

export default CardSkeletonRowComponent;
