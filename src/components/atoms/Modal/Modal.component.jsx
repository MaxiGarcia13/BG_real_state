import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.styles.module.scss';

const ModalComponent = ({ children, className }) => {
    const [container, setContainer] = useState(null);
    const id = '__next_modal';

    useEffect(() => {
        let div = document.getElementById(id);

        if (!div) {
            div = document.createElement('div');
            div.id = id;
            div.className = `${styles.modal} ${className}`;
        }

        document.body.appendChild(div);
        setContainer(div);
        return () => {
            document.body.removeChild(div);
        };
    }, []);

    return !container || createPortal(children, container);
};

export default ModalComponent;
