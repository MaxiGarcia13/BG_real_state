import React, { useMemo, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import Layout from '../../templates/Layout';
import SEO from '../../src/components/atoms/SEO';
import LinkWithSvg from '../../src/components/atoms/LinkWithSvg';
import AddToCart from '../../src/components/molecules/AddToCart';
import config from '../../src/config';
import { useRouter } from 'next/router';
import { useQuery } from '../../src/hooks/useGetContentfulArticles';
import useContentfulClient from '../../src/hooks/useContentfulClient';
import { buildArticle } from '../../src/utils/articles';
import dynamic from 'next/dynamic';
import styles from './articles.styles.module.scss';

const ArticlesList = dynamic(() => import('../../src/components/organism/ArticlesList'), {
    ssr: false,
});

const ArticleComponent = ({ article }) => {
    const router = useRouter();

    const images = useMemo(
        () =>
            article.pictures.map((img) => ({
                original: img.url,
                thumbnail: img.url,
            })),
        [article.pictures]
    );

    const goBack = () => router.back();

    useEffect(() => {
        window.scrollTo(0, 100);
    }, [router]);

    return (
        <Layout>
            <SEO
                title={`${article.title} - ${config.app.name}`}
                description={article.description}
                img={article.mainPicture.url}
            />
            <div className={styles.nav}>
                <LinkWithSvg
                    label='Volver a los resultados'
                    iconLeftSrc='/assets/icons/chevron-left.svg'
                    onClick={goBack}
                />
            </div>
            <div className={styles.article}>
                <section className={styles.gallery}>
                    <ImageGallery
                        items={images}
                        showThumbnails={images.length > 1}
                        showFullscreenButton={true}
                        showPlayButton={false}
                        showNav={false}
                        showBullets={false}
                        autoPlay={false}
                        slideDuration={200}
                    />
                </section>

                <section className={styles.body}>
                    <h1>{article.title}</h1>

                    <em>
                        <span>{article.priceWithSign}</span>
                    </em>
                    <div className={styles.action}>
                        <AddToCart article={article} className={styles['action_input-counter']} />
                    </div>
                    <div>
                        <h3>Características</h3>
                        <ul>
                            <li>
                                <b> ID: </b> {article.id}
                            </li>
                            <li>
                                <b> Lugar: </b> {article.location}
                            </li>
                            <li>
                                <b>Cosecha: </b>
                                {article.year}
                            </li>
                            <li>
                                <b> Tipo: </b> {article.type}
                            </li>
                            {typeof article.quantitiesPerPackage !== 'undefined' && (
                                <li>
                                    <b> Productos por caja: </b> {article.quantitiesPerPackage}
                                </li>
                            )}
                            <li>
                                <b> Unidad: </b> {article.unit}
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>Sobre este producto</h3>
                        <p>{article.description}</p>
                    </div>
                </section>
            </div>
            <div className={styles['more-articles']}>
                <h2>Mas inmuebles</h2>
                <ArticlesList limit={4} hideAddCartButton hidePagination />
            </div>
        </Layout>
    );
};

export async function getServerSideProps({ query }) {
    const client = useContentfulClient();

    const data = await client.getEntries(useQuery(query));

    if (typeof data.items[0] !== 'undefined') {
        const article = buildArticle(data.items[0].fields, data.items[0].sys.id);

        return {
            props: { data, article, notFound: false },
        };
    } else {
        return {
            props: { notFound: true },
        };
    }
}

export default ArticleComponent;
