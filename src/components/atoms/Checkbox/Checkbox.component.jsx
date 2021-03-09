import React, { forwardRef } from 'react';
import Svg from '../Svg';
import styles from './checkbox.styles.module.scss';

const CheckboxComponent = ({ id = `input-${Math.random()}`, label, name, value, defaultChecked, onKeyUp }, ref) => {
    const handleOnkeyUp = (ev) => {
        ev.preventDefault();
        if (typeof onKeyUp !== 'undefined') {
            onKeyUp();
        }

        if (ev.keyCode === 13) {
            document.getElementById(id).checked = !document.getElementById(id).checked;
        }

        ev.stopPropagation();
    };

    return (
        <label className={styles.checkbox} onKeyUp={handleOnkeyUp} tabIndex={0}>
            <span className={styles.checkbox__input}>
                <input ref={ref} type='checkbox' name={name} id={id} value={value} defaultChecked={defaultChecked} />
                <span className={styles.checkbox__control}>
                    <Svg src={'/assets/icons/check.svg'} className={styles.svg} />
                </span>
            </span>
            <span className={styles.checkbox__label}>{label}</span>
        </label>
    );
};

export default forwardRef(CheckboxComponent);
