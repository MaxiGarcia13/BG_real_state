import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import Button from '../Button';
import styles from './pagination.styles.module.scss';

const showButton = (current, skip, length, maxButton) => {
    if (current === length - 1 || current === 0) {
        return true;
    }

    const offset = 3;
    const min = skip <= 0 ? 0 : skip - 1;

    const max = min + maxButton - offset;

    if (current >= min && current <= max) {
        return true;
    }

    return false;
};

const PaginationComponent = ({ total, limit }) => {
    const router = useRouter();

    const pages = useMemo(() => {
        const pages = [];
        const length = Math.round(total / limit);

        const maxButton = 5;

        const skip = +router.query.skip;

        for (let index = 0; index < length; index++) {
            if (index === length - 1 && skip < length - 3) {
                pages.push({
                    value: '...',
                    skip: null,
                    show: true,
                });
            }

            pages.push({
                value: index + 1,
                skip: index,
                show: showButton(index, skip, length, maxButton),
            });

            if (index === 0 && skip > maxButton - 3) {
                pages.push({
                    value: '...',
                    skip: null,
                    show: true,
                });
            }
        }

        return pages;
    }, [limit, total, router.query]);

    const handleOnClick = (skip) => {
        if (typeof skip === 'number') {
            const buildedQuery = { ...router.query, skip };

            router.push({ pathname: router.pathname, query: buildedQuery });
        }
    };

    return total <= limit ? null : (
        <section className={styles.wrapper}>
            {pages.map(
                (page, index) =>
                    page.show && (
                        <Button
                            key={index}
                            className={`${styles.button} ${
                                typeof page.skip === 'number' &&
                                +router.query.skip === +page.skip &&
                                styles['button--active']
                            }`}
                            onClick={handleOnClick.bind(this, page.skip)}
                            iconButton
                            secondary
                        >
                            {page.value}
                        </Button>
                    )
            )}
        </section>
    );
};

export default PaginationComponent;
