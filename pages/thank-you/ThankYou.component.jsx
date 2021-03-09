import React, { useEffect } from 'react';
import Layout from '../../templates/Layout';
import config from '../../src/config';
import SEO from '../../src/components/atoms/SEO';
import Svg from '../../src/components/atoms/Svg';
import Button from '../../src/components/atoms/Button';
import { useShoppingCard } from '../../src/hooks/useShoppingCard';
import styles from './thankYou.styles.module.scss';
import { useRouter } from 'next/router';

const ThankYOuComponent = () => {
    const { removeArticles } = useShoppingCard();
    const router = useRouter();
    const goArticles = () => router.push('/articles');

    useEffect(() => {
        removeArticles();
    }, []);

    return (
        <Layout className={styles.wrapper}>
            <SEO title={`Muchas gracias - ${config.app.name}`} />
            <div className>
                <Svg src='/assets/images/successful_purchase.svg' />

                <p>Gracias por realizar el pedido, Nos comunicaremos en seguida con los datos que has ingresados.</p>
                <div className={styles.action}>
                    <Button onClick={goArticles} secondary>
                        Seguir comprando
                    </Button>
                </div>
            </div>
        </Layout>
    );
};
export default ThankYOuComponent;
