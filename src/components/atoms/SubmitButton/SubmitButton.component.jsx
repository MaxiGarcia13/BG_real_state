import React, { useEffect, useRef, useMemo } from 'react';
import Button from '../Button';
import Svg from '../Svg';
import Loading from '../Loading';
import styles from './submitButton.styles.module.scss';

const SubmitButtonComponent = ({
    children,
    stateDuration = 1500,
    onClick,
    success,
    error,
    inProgress,
    handleSuccess,
    handleError,
    secondary,
}) => {
    const btnElement = useRef(null);

    const pendingClassName = styles['loading-btn--pending'];
    const successClassName = styles['loading-btn--success'];
    const failClassName = styles['loading-btn--fail'];

    const value = useMemo(() => {
        if (success) {
            return <Svg src='/assets/icons/check.svg' className={styles['loading-btn--svg']} />;
        } else if (inProgress) {
            return <Loading />;
        } else if (error) {
            return <Svg src='/assets/icons/alert-triangle.svg' className={styles['loading-btn--svg']} />;
        } else {
            return children;
        }
    }, [success, inProgress, error]);

    const handleOnclick = async (ev) => {
        ev.preventDefault();

        if (typeof onClick === 'function') {
            onClick(ev);
        }

        ev.stopPropagation();
    };

    useEffect(() => {
        if (success) {
            const elem = btnElement.current;

            elem.classList.add(successClassName);

            setTimeout(() => {
                elem.classList.remove(successClassName);
                if (typeof handleSuccess === 'function') {
                    handleSuccess(false);
                }
            }, stateDuration);
        }
    }, [success]);

    useEffect(() => {
        if (error) {
            const elem = btnElement.current;

            elem.classList.add(failClassName);

            setTimeout(() => {
                elem.classList.remove(failClassName);
                if (typeof handleError === 'function') {
                    handleError(false);
                }
            }, stateDuration);
        }
    }, [error]);

    useEffect(() => {
        const elem = btnElement.current;

        if (inProgress) {
            elem.classList.add(pendingClassName);
        } else {
            elem.classList.remove(pendingClassName);
        }
    }, [inProgress]);

    return (
        <Button
            ref={btnElement}
            onClick={handleOnclick}
            className={`${styles['loading-btn']} ${secondary && styles['loading-btn--secondary']}`}
        >
            {value}
        </Button>
    );
};

export default SubmitButtonComponent;
