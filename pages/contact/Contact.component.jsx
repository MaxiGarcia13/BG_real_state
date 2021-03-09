import React from 'react';
import Layout from '../../templates/Layout';
import config from '../../src/config';
import SEO from '../../src/components/atoms/SEO';
import styles from './contact.styles.module.scss';
import Input from '../../src/components/atoms/Input';
import Button from '../../src/components/atoms/Button';

const contactComponent = () => {
    return (
        <Layout>
            <SEO title={`Contact - ${config.app.name}`} />
            <div className={styles.contact}>
                <h1 className={styles.logo}>CONTACTO</h1>

                <div className={styles.contactWrapper}>
                    <div className={styles.contactForm}>
                        <form action={`mailto:${config.app.mail}`} method='POST' encType='text/plain'>
                            <div className={styles.textfild}>
                                <label htmlFor='name'>Nombre</label>
                                <Input type='text' name='Nombre' id='name' />
                            </div>
                            <div className={styles.textfild}>
                                <label htmlFor='email'>E-mail</label>
                                <Input type='email' name='E-mail' id='email' />
                            </div>
                            <div className={styles.textfild}>
                                <label htmlFor='phone'>Teléfono</label>
                                <Input type='tel' name='Teléfono' id='phone' />
                            </div>
                            <div className={styles.textfild}>
                                <label htmlFor='message'>Mensaje</label>
                                <textarea name='Mensaje' rows='5' id='message'></textarea>
                            </div>
                            <div className={styles.Button}>
                                <Button>Enviar</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default contactComponent;
