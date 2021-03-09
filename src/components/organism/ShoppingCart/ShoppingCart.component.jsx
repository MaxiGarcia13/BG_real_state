import React, { useState, useRef, useEffect } from 'react';
import Svg from '../../atoms/Svg';
import Button from '../../atoms/Button';
import Modal from '../../atoms/Modal';
import CardSkeleton from '../../molecules/CardSkeleton/Row';
import { useRouter } from 'next/router';
import { useShoppingCard } from '../../../hooks/useShoppingCard';
import styles from './shoppingCart.styles.module.scss';
import dynamic from 'next/dynamic';

const Card = dynamic(() => import('../../molecules/Card'), { ssr: false, loading: CardSkeleton });
const ArticleCard = dynamic(() => import('../ArticleCard/Row'), { ssr: false, loading: CardSkeleton });

const ShoppingCartComponent = () => {
    const expandedContainerRef = useRef(null);
    const buttonRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [formStyle, setFormStyle] = useState({});

    const { state, total, calculateTotal, subtractArticle } = useShoppingCard();
    const router = useRouter();

    const show = () => {
        setIsOpen(true);
        setBoundingCLientReact();
    };

    const close = () => setIsOpen(false);

    const handleClickOutside = (event) => {
        if (expandedContainerRef.current && !expandedContainerRef.current.contains(event.target)) {
            close();
        }
    };

    const setBoundingCLientReact = () => {
        const boundingClient = buttonRef.current.getBoundingClientRect();

        setFormStyle({
            marginTop: `${boundingClient.top}px`,
            marginLeft: `${boundingClient.left - 440}px`,
        });
    };

    const handleOnClick = (article_id) => {
        close();

        router.push({
            pathname: `/articles/${article_id}`,
        });
    };

    const submit = () => {
        close();
        router.push({
            pathname: `/order-summary`,
        });
    };

    const handleSubtractAticle = (article_id, event) => {
        event.preventDefault();
        subtractArticle(article_id);
        event.stopPropagation();
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('resize', setBoundingCLientReact);

        return () => {
            window.removeEventListener('resize', setBoundingCLientReact);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <Button ref={buttonRef} className={styles.button} onClick={show}>
                <Svg src='/assets/icons/shopping-bag.svg' />
                <div className={styles.badge}>{state.articles.length}</div>
            </Button>
            {isOpen && (
                <Modal>
                    <div ref={expandedContainerRef} className={styles.form} style={formStyle}>
                        <h2 className={styles.title}>Carrito de compra</h2>
                        <div className={styles.list}>
                            {state.articles.length > 0 ? (
                                state.articles.map((article) => (
                                    <ArticleCard
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
                                        srcIcon='/assets/icons/trash.svg'
                                        actionIcon={handleSubtractAticle.bind(this, article._id)}
                                        {...article}
                                    />
                                ))
                            ) : (
                                <Card> 😱 No hay productos seleccionados...</Card>
                            )}
                        </div>
                        <h3 className={styles.total}> Total: €{total.toFixed(2)}</h3>
                        <div className={styles.footer}>
                            <Button className={styles.submit} onClick={close} secondary>
                                Cerrar
                            </Button>
                            <Button className={styles.submit} onClick={submit}>
                                Pedir
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default ShoppingCartComponent;
