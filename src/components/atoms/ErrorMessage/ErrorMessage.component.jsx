import React from 'react';
import styles from './errorMessage.styles.module.scss';

const ErrorMessageComponent = () => (
    <div className={styles.error}>
        <p>🚨 Opps..., no fuiste tu fuimos nosotros, Por favor intente nuevamente</p>
    </div>
);

export default ErrorMessageComponent;
