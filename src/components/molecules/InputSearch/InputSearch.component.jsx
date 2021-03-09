import React, { forwardRef } from 'react';
import Input from '../../atoms/Input';
import Svg from '../../atoms/Svg';
import styles from './inputSearch.styles.module.scss';

const InputSerach = ({ style, inputRef, ...props }, ref) => {
    return (
        <div ref={ref} className={styles.wrapper} style={style}>
            <Input ref={inputRef} className={styles.input} {...props} />
            <Svg src='/assets/icons/search.svg' className={styles.icon} />
        </div>
    );
};

export default forwardRef(InputSerach);
