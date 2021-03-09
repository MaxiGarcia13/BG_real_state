import React, { forwardRef, useRef, useEffect } from 'react';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import styles from './inputCounter.styles.module.scss';
import SvgComponent from '../../atoms/Svg';

const InputCounterComponent = ({ placeholder = '0', value, onChange, className }, ref) => {
    const inputRef = useRef(null);

    const handleOnclick = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
    };

    const handleOnChange = (type) => {
        const curretValue = value || 0;

        if (typeof onChange === 'function') {
            if (type === 'sum') {
                onChange(curretValue + 1);
            } else if (type === 'subtract' && curretValue > 0) {
                onChange(curretValue - 1);
            }
        }
    };

    const handleOnChangeInput = (ev) => {
        if (typeof onChange === 'function') {
            onChange(ev.target.value);
        }
    };

    const handleOnFocusInput = (ev) => {
        if (+ev.target.value === 0) {
            handleOnChangeInput({ ...ev, target: { value: '' } });
        }
    };

    const handleOnBlurInput = (ev) => {
        if (ev.target.value === '') {
            handleOnChangeInput({ ...ev, target: { value: 0 } });
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = value;

            inputRef.current.addEventListener('change', handleOnChangeInput);
            inputRef.current.addEventListener('focus', handleOnFocusInput);
            inputRef.current.addEventListener('blur', handleOnBlurInput);
        }

        return () => {
            inputRef.current.removeEventListener('change', handleOnChangeInput);
            inputRef.current.removeEventListener('focus', handleOnFocusInput);
            inputRef.current.removeEventListener('blur', handleOnBlurInput);
        };
    }, [value]);

    return (
        <section ref={ref} className={`${styles.wrapper} ${className}`} onClick={handleOnclick}>
            <Button
                onClick={handleOnChange.bind(this, 'subtract')}
                className={`${styles.wrapper_button} ${styles['wrapper_button--left']}`}
                secondary
            >
                <SvgComponent src='/assets/icons/chevron-left.svg' />
            </Button>
            <Input ref={inputRef} placeholder={placeholder} type='number' className={styles.wrapper_input} />
            <Button
                onClick={handleOnChange.bind(this, 'sum')}
                className={`${styles.wrapper_button} ${styles['wrapper_button--right']}`}
                secondary
            >
                <SvgComponent src='/assets/icons/chevron-right.svg' />
            </Button>
        </section>
    );
};

export default forwardRef(InputCounterComponent);
