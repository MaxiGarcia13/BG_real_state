import React, { forwardRef } from 'react';
import styles from './Input.styles.module.scss';

const InputComponent = ({ className, id, type, placeholder, onKeyDown, onFocus, onBlur, ...props }, ref) => (
    <input
        ref={ref}
        id={id}
        className={`${styles.input} ${className}`}
        placeholder={placeholder}
        type={type}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        style={props.style}
        {...props}
    />
);

export default forwardRef(InputComponent);
