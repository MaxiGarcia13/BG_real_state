import React from 'react';
import dynamic from 'next/dynamic';
import CardSkeleton from '../../../molecules/CardSkeleton/Row';
import AddToCart from '../../../molecules/AddToCart';
import styles from './articlesCardColumn.styles.module.scss';

const Card = dynamic(() => import('../../../molecules/Card'), {
    ssr: false,
    loading: () => <CardSkeleton />,
});

const ArticleCardComponent = ({
    className,
    img = {},
    _id,
    title,
    subtitle,
    description,
    onClick,
    hideAddCartButton,
    ...props
}) => {
    return (
        <Card className={`${styles.card} ${className}`} onClick={onClick}>
            <div className={styles.header}>
                <img src={img.url} alt={img.alt} />
            </div>
            <section className={styles.body}>
                <h3>{title}</h3>
                <em>
                    <span>{props.priceWithSign}</span>
                </em>
            </section>
            {!hideAddCartButton && (
                <AddToCart
                    article={{
                        title,
                        _id: _id,
                        id: props.id,
                        price: props.price,
                        mainPicture: props.mainPicture,
                        priceWithSign: props.priceWithSign,
                        pricePerPackage: props.pricePerPackage,
                        unit: props.unit,
                        quantitiesPerPackage: props.quantitiesPerPackage,
                    }}
                />
            )}
        </Card>
    );
};

export default ArticleCardComponent;
