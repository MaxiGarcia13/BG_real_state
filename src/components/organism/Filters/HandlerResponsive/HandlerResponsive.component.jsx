import React, { useState, useEffect } from 'react';
import Form from '../Form';
import PhoneForm from '../PhoneForm';
import styles from '../filters.styles.module.scss';

let checkIfIsPhone = () => {
    const minWidth = +styles.tabletWidth.replace('px', '');
    return document.body.clientWidth < minWidth;
};

const HandlerResponsiveFiltersComponent = () => {
    const [isPhone, setIsPhone] = useState(checkIfIsPhone());

    useEffect(() => {
        const watchResizeAndChangeBoundingClientReact = () => {
            setIsPhone(checkIfIsPhone());
        };

        window.addEventListener('resize', watchResizeAndChangeBoundingClientReact);

        return () => {
            window.removeEventListener('resize', watchResizeAndChangeBoundingClientReact);
        };
    }, []);

    return isPhone ? <PhoneForm /> : <Form className={styles.desktop} />;
};

export default HandlerResponsiveFiltersComponent;
