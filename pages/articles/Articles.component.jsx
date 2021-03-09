import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '../../templates/Layout';
import FiltesrSkeleton from '../../src/components/molecules/FiltersSkeleton';
import CardSkeleton from '../../src/components/molecules/CardSkeleton/Column';
import config from '../../src/config';
import styles from './articles.styles.module.scss';
import SEO from '../../src/components/atoms/SEO';

const ArticlesList = dynamic(() => import('../../src/components/organism/ArticlesList'), {
    ssr: false,
    loading: () => <CardSkeleton />,
});

const Filters = dynamic(() => import('../../src/components/organism/Filters'), {
    ssr: false,
    loading: () => <FiltesrSkeleton />,
});

const ArticlesComponent = () => {
    return (
        <Layout className={styles.wrapper}>
            <SEO title={`Productos - ${config.app.name}`} />
            <aside className={styles.filters}>
                <Filters />
            </aside>
            <ArticlesList className={styles.articles} />
        </Layout>
    );
};

export default ArticlesComponent;
