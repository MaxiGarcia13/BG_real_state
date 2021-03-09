import React, { useEffect, useState } from 'react';
import Layout from '../../templates/Layout';
import config from '../../src/config';
import SEO from '../../src/components/atoms/SEO';
import Input from '../../src/components/atoms/Input';
import Button from '../../src/components/atoms/Button';
import CardSkeleton from '../../src/components/molecules/CardSkeleton/Row';
import { useShoppingCard } from '../../src/hooks/useShoppingCard';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import styles from './orderSummary.styles.module.scss';
import ErrorMessage from '../../src/components/atoms/ErrorMessage';

const ArticleCard = dynamic(() => import('../../src/components/organism/ArticleCard/Row'), {
    ssr: false,
    loading: CardSkeleton,
});

const OrderSummaryComponent = () => {
    const { state, calculateTotal, total } = useShoppingCard();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleOnClick = (article_id) => {
        router.push({
            pathname: `/articles/${article_id}`,
        });
    };

    const onSubmitForm = async (ev) => {
        ev.preventDefault();
        setError(false);
        if (loading) return false;
        setLoading(true);

        const resp = await fetch('/api/email-handler', {
            method: 'POST',
            body: JSON.stringify({
                from: config.app.mail,
                to: document.getElementById('email').value,
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value,
                articles: state.articles.map((article) => ({
                    ...article,
                    total: calculateTotal(
                        article.price,
                        article.pricePerPackage,
                        article.amount,
                        article.quantitiesPerPackage
                    ).toFixed(2),
                })),
                total: total,
            }),
        });
        setLoading(false);
        const { success } = await resp.json();
        if (success) {
            router.push('/thank-you');
        } else {
            setError(true);
        }
    };

    useEffect(() => {
        if (state.articles.length <= 0) {
            router.back();
        }
    }, [state.articles]);

    return (
        <Layout>
            <SEO title={`Resumne del pedido - ${config.app.name}`} />
            <div className={styles.contact}>
                <h1 className={styles.logo}>Resumen del pedido</h1>
                {error && <ErrorMessage />}
                <div className={styles.contactWrapper}>
                    <div className={styles.contactForm}>
                        <form method='POST' encType='text/plain' onSubmit={onSubmitForm}>
                            <div className={styles.textfild}>
                                <label htmlFor='name'>Nombre</label>
                                <Input type='text' name='Nombre' id='name' required />
                            </div>
                            <div className={styles.textfild}>
                                <label htmlFor='email'>E-mail</label>
                                <Input type='email' name='E-mail' id='email' required />
                            </div>
                            <div className={styles.textfild}>
                                <label htmlFor='phone'>Teléfono</label>
                                <Input type='tel' name='Teléfono' id='phone' />
                            </div>
                            <div className={styles.textfild}>
                                <label htmlFor='message'>Mensaje</label>
                                <textarea name='Mensaje' rows='5' id='message'></textarea>
                            </div>
                            <h2 className={styles.Subtitle}>Productos</h2>
                            {state.articles.map((article) => (
                                <ArticleCard
                                    hideIcon
                                    key={article._id}
                                    onClick={handleOnClick.bind(this, article.id)}
                                    img={{ url: article.mainPicture.url, alt: article.mainPicture.alt }}
                                    title={article.title}
                                    subTitle={`Cantidad: ${article.amount} Total: €${calculateTotal(
                                        article.price,
                                        article.pricePerPackage,
                                        article.amount,
                                        article.quantitiesPerPackage
                                    ).toFixed(2)}`}
                                    {...article}
                                />
                            ))}
                            <h3 className={styles.total}>Total del pedido: €{total.toFixed(2)}</h3>

                            <div className={styles.Button}>
                                <Button>{!loading ? 'Confirmar pedido' : 'Enviando...'}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default OrderSummaryComponent;
