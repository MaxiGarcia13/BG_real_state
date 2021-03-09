import React, { useState } from 'react';
import Form from '../Form';
import Button from '../../../atoms/Button';
import Svg from '../../../atoms/Svg';
import Modal from '../../../atoms/Modal';
import styles from '../filters.styles.module.scss';

const PhoneFormComponent = () => {
    const [openForm, setOpenForm] = useState(false);
    const handleOnfilter = () => setOpenForm(false);

    const title = (
        <span className={styles.phone__title}>
            <Svg src={'/assets/icons/filter.svg'} /> Filtrar
        </span>
    );

    return (
        <div className={styles.phone}>
            <Button onClick={() => setOpenForm(true)} secondary>
                {title}
            </Button>
            {openForm && (
                <Modal>
                    <div className={styles.modalForm}>
                        <h1>{title}</h1>
                        <Form onFilter={handleOnfilter} />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default PhoneFormComponent;
