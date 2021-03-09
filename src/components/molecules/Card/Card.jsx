import React from 'react';
import styles from './card.styles.module.scss';

const Card = ({ children, className, onClick, notSelectable }) => {
    return (
        <article className={`${styles.card} ${notSelectable && styles.notSelectable} ${className}`} onClick={onClick}>
            {children}
        </article>
    );
};

export default Card;
