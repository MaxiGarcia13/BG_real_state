import React, { useCallback, useEffect, useRef } from 'react';
import Checkbox from '../../../atoms/Checkbox';
import FiltersSkeleton from '../../../molecules/FiltersSkeleton';
import ErrorMessage from '../../../atoms/ErrorMessage';
import Button from '../../../atoms/Button';
import { useRouter } from 'next/router';
import useGetContentfulCategories from '../../../../hooks/useGetContentfulCategories';
import useGetContentfulCompanies from '../../../../hooks/useGetContentfulCompanies';
import styles from '../filters.styles.module.scss';

const FiltersFormComponent = ({ className, onFilter }) => {
    const formRef = useRef(null);

    const router = useRouter();

    const categories = useGetContentfulCategories();
    const companies = useGetContentfulCompanies();

    const dynamicCheckbox = useCallback(
        ({ id, name, label, value }) => {
            const isChecked = typeof router.query[name] !== 'undefined';
            if (formRef.current.elements[name]) {
                formRef.current.elements[name].checked = isChecked;
            }

            return <Checkbox key={id} id={id} name={name} label={label} value={value} defaultChecked={isChecked} />;
        },
        [router.query]
    );

    const handleOnSubmit = (ev) => {
        ev.preventDefault();

        let query = {};

        if (typeof router.query.searchText !== 'undefined') {
            query.searchText = router.query.searchText;
        }

        Object.keys(formRef.current.elements).forEach((key, index) => {
            if (typeof formRef.current.elements[index] !== 'undefined' && formRef.current.elements[index].checked) {
                query[formRef.current.elements[key].name] = formRef.current.elements[key].value;
            }
        });

        if (typeof onFilter === 'function') {
            onFilter(ev);
        }

        router.push({
            pathname: '/articles',
            query,
        });
    };

    useEffect(() => {
        categories.getAllEntries();
        companies.getAllEntries();
    }, []);

    return (
        <form ref={formRef} method='GET' onSubmit={handleOnSubmit} className={className}>
            {categories.fetching ? (
                <FiltersSkeleton count={1} />
            ) : (
                <>
                    <h4 className={styles.title}>Bodega</h4>
                    {companies.error && <ErrorMessage />}
                    {companies.companies.map((item) => {
                        return dynamicCheckbox({
                            id: item._id,
                            name: `company-${item.name}`,
                            label: item.name,
                            value: item._id,
                        });
                    })}
                </>
            )}

            {categories.fetching ? (
                <FiltersSkeleton count={1} />
            ) : (
                <>
                    <h4 className={styles.title}>Categorias</h4>
                    {categories.error && <ErrorMessage />}
                    {categories.categories.map((item) =>
                        dynamicCheckbox({
                            id: item._id,
                            name: `category-${item.name}`,
                            label: item.name,
                            value: item._id,
                        })
                    )}
                </>
            )}

            <Button className={styles.button} onClick={handleOnSubmit} secondary>
                Filtrar
            </Button>
        </form>
    );
};

export default FiltersFormComponent;
