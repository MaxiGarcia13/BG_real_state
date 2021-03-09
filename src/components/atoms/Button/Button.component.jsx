import React, { forwardRef } from 'react';
import styles from './button.styles.module.scss';

const ButtonComponent = ({ children, className, onClick, secondary, iconButton, ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={`
                ${styles.button}
                ${className}
                ${secondary && styles.secondary}
                ${iconButton && styles.iconButton}
            `}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default forwardRef(ButtonComponent);
