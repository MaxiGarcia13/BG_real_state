import React, { useMemo } from 'react';
import Svg from '../../../atoms/Svg';
import CardSkeleton from '../../../molecules/CardSkeleton/Row';
import dynamic from 'next/dynamic';
import styles from './articlesCardRow.styles.module.scss';

const Card = dynamic(() => import('../../../molecules/Card'), { ssr: false, loading: CardSkeleton });

const ArticleCardColumnComponent = ({
    className,
    onClick,
    img,
    title,
    subTitle,
    srcIcon,
    actionIcon,
    hideIcon = false,
}) => {
    const handleShowIcon = useMemo(() => !hideIcon || (!hideIcon && typeof srcIcon === 'string'), [srcIcon, hideIcon]);

    return (
        <Card className={`${styles.card} ${className}`} onClick={onClick}>
            <div className={styles.header}>
                <img src={img.url} alt={img.alt} />
            </div>
            <section className={styles.body}>
                <h3>{title}</h3>
                <em>{subTitle}</em>
            </section>
            {handleShowIcon && (
                <div className={styles.icon} onClick={actionIcon}>
                    <Svg src={srcIcon} />
                </div>
            )}
        </Card>
    );
};

export default ArticleCardColumnComponent;
