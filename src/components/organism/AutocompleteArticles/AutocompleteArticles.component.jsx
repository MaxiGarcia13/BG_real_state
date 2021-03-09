import React, { useRef, useState, useEffect, useCallback } from 'react';
import AutoCompleteInput from '../../molecules/AutoCompleteInput';
import CardSkeleton from '../../molecules/CardSkeleton/Row';
import ArticleCard from '../ArticleCard/Row';
import ErrorMessage from '../../atoms/ErrorMessage';
import { useRouter } from 'next/router';
import useGetContentfulArticles from '../../../hooks/useGetContentfulArticles';
import useDebounce from '../../../hooks/tools/useDebounce';
import styles from './autocompleteArticles.styles.module.scss';
import dynamic from 'next/dynamic';

const Card = dynamic(() => import('../../molecules/Card'), { ssr: false, loading: CardSkeleton });

const AutoCompleteArticlesComponent = ({ className }) => {
    const form = useRef(null);
    const router = useRouter();
    const [value, setValue] = useState('');
    const { getEntries, fetching, articles, error, reset } = useGetContentfulArticles();
    const debounce = useDebounce();

    const getArticles = useCallback(() => {
        return getEntries({ searchText: value, limit: 10 });
    }, [value]);

    const handleOnSubmit = (ev) => {
        ev.preventDefault();

        if (value.length === 0) {
            return false;
        }

        router.push({
            pathname: '/articles',
            query: {
                searchText: value,
            },
        });

        ev.stopPropagation();
    };

    const handleOnChange = (e) => {
        setValue(e.target.value);

        reset();
        if (e.target.value.length > 0) {
            debounce.execute(getArticles, 800);
        }
    };

    const handleOnClick = (article_id) => {
        router.push({
            pathname: `/articles/${article_id}`,
        });
    };

    useEffect(() => {
        if (typeof router.query.searchText !== 'undefined') {
            setValue(router.query.searchText);
        }
    }, [router.query.searchText]);

    return (
        <form
            ref={form}
            className={className}
            onSubmit={(e) => {
                e.preventDefault();
                return false;
            }}
        >
            <AutoCompleteInput
                type='text'
                placeholder='Buscar ...'
                name='searchText'
                action={handleOnSubmit}
                value={value}
                onChange={handleOnChange}
                autoComplete='off'
            >
                {error && <ErrorMessage />}
                {fetching ? (
                    <CardSkeleton />
                ) : articles.length > 0 ? (
                    articles.map((article) => (
                        <ArticleCard
                            key={article._id}
                            onClick={handleOnClick.bind(this, article.id)}
                            img={{ url: article.mainPicture.url, alt: article.mainPicture.alt }}
                            title={article.title}
                            subTitle={article.priceWithSign}
                            srcIcon='/assets/icons/chevron-right.svg'
                            {...article}
                        />
                    ))
                ) : (
                    !error && (
                        <Card className={styles.empty} notSelectable>
                            <p>🔍 Inmuebles</p>
                        </Card>
                    )
                )}
            </AutoCompleteInput>
        </form>
    );
};

export default AutoCompleteArticlesComponent;
