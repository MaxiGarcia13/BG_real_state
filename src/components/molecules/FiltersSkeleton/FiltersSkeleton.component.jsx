import React from 'react';
import Skeleton from '../../atoms/Skeleton';
import styles from './filtersSkeleton.styles.module.scss';

const FiltersSkeletonComponent = ({ count = 2 }) => {
    const skeleton = Array(count).fill(count);

    return skeleton.map((_, index) => (
        <React.Fragment key={index}>
            <Skeleton />
            <div className={styles.checkbox}>
                <Skeleton height='20px' width='20px' />
                <Skeleton height='30px' width='80%' />
            </div>
            <div className={styles.checkbox}>
                <Skeleton height='20px' width='20px' />
                <Skeleton height='30px' width='80%' />
            </div>
        </React.Fragment>
    ));
};

export default FiltersSkeletonComponent;
