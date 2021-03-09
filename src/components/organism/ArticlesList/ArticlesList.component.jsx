import React, { useEffect } from 'react';
import CardSkeleton from '../../molecules/CardSkeleton/Row';
import Pagination from '../../atoms/Paginator';

import ArticleCard from '../ArticleCard';
import ErrorMessage from '../../atoms/ErrorMessage';
import { useRouter } from 'next/router';
import useGetContentfulArticles from '../../../hooks/useGetContentfulArticles';
import styles from './articlesList.styles.module.scss';

const ArticlesListComponent = ({ limit = 50, className, hideAddCartButton, hidePagination }) => {
    const { getEntries, articles, fetching, error, total } = useGetContentfulArticles();

    const router = useRouter();

    const handleOnClickCard = (article_id, ev) => {
        ev.preventDefault();

        router.push({
            pathname: `/articles/${article_id}`,
        });
    };

    useEffect(() => {
        if (typeof router.query !== 'undefined') {
            let query = { ...router.query };

            if (typeof limit !== 'undefined') {
                query.limit = limit;
            }

            delete query.id;

            getEntries(query);
        }
    }, [router.query, limit]);

    return (
        <section className={styles.wrapper}>
            <div className={`${styles.articles}  ${className}`}>
                {fetching ? (
                    [1, 2, 3, 4].map((key) => <CardSkeleton key={key} className={styles['articles_card']} />)
                ) : articles.length > 0 ? (
                    articles.map((item) => {
                        return (
                            <ArticleCard
                                key={item._id}
                                img={{ url: item.mainPicture.url, alt: item.mainPicture.alt }}
                                title={item.title}
                                subtitle={`Precio ${item.priceWithSign}`}
                                description={item.description}
                                onClick={handleOnClickCard.bind(this, item.id)}
                                hideAddCartButton={hideAddCartButton}
                                className={styles['articles_card']}
                                {...item}
                            />
                        );
                    })
                ) : (
                    <span>😱 Sin productos...</span>
                )}
                {error && <ErrorMessage />}
            </div>
            {!hidePagination && <Pagination total={total} limit={limit} />}
        </section>
    );
};

export default ArticlesListComponent;
