import React, { useState, useMemo, useEffect } from 'react';
import InputCounter from '../InputCounter';
import SubmitButton from '../../atoms/SubmitButton';
import { useShoppingCard } from '../../../hooks/useShoppingCard';
import styles from './addToCart.styles.module.scss';
import { useRouter } from 'next/router';

const AddToCartComponent = ({ article, className }) => {
    const { addArticle, isMatchById, subtractArticle } = useShoppingCard();
    const stateDuration = 1000;

    const [inProgress, setInProgress] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const isSelected = useMemo(() => {
        return isMatchById(article._id);
    }, [article._id, isMatchById]);

    const handleAddToShoppingCart = (ev) => {
        ev.preventDefault();

        addArticle({
            ...article,
            amount: 1,
        });

        setInProgress(true);

        setTimeout(() => {
            setInProgress(false);
            setSuccess(true);
        }, stateDuration);

        ev.stopPropagation();
    };

    const handleSubtract = (ev) => {
        ev.preventDefault();

        subtractArticle(article._id);

        setInProgress(true);

        setTimeout(() => {
            setInProgress(false);
            setSuccess(true);
        }, stateDuration);

        ev.stopPropagation();
    };

    return (
        <section className={`${styles.wrapper} ${className}`}>
            {/* <InputCounter value={value} onChange={handleSetValue} className={styles.wrapper_input} /> */}
            {isSelected ? (
                <SubmitButton
                    stateDuration={stateDuration}
                    onClick={handleSubtract}
                    className={styles.wrapper_button}
                    success={success}
                    handleSuccess={setSuccess}
                    inProgress={inProgress}
                    error={error}
                    handleError={setError}
                    secondary
                >
                    No estoy interesado
                </SubmitButton>
            ) : (
                <SubmitButton
                    stateDuration={stateDuration}
                    onClick={handleAddToShoppingCart}
                    className={styles.wrapper_button}
                    success={success}
                    handleSuccess={setSuccess}
                    inProgress={inProgress}
                    error={error}
                    handleError={setError}
                >
                    Estoy interesado
                </SubmitButton>
            )}
        </section>
    );
};

export default AddToCartComponent;
