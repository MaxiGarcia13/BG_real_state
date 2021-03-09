import { useState, useCallback } from 'react';
import useContentfulClient from './useContentfulClient';
import { buildArticles } from '../utils/articles';
import useSessionStorege from './tools/useSessionStorege';

const useGetContentfulArticles = () => {
    const [fetching, setFetching] = useState(false);
    const [articles, setArticles] = useState([]);
    const [total, setTotal] = useState(0);

    const [error, setError] = useState(false);

    const client = useContentfulClient();

    const storage = useSessionStorege();

    /**
     *
     * @param {Object} query Query to filter
     * @param {String} query.searchText Query to filter by text
     * @param {String} query.id Get by id
     *
     */
    const getEntries = async (query) => {
        setFetching(true);
        setError(false);
        setArticles([]);

        let data = async () => {};

        try {
            data = await storage.save(window.location.href, () => client.getEntries(useQuery(query)), 5);
            console.log(data);
            setFetching(false);

            setArticles(buildArticles(data.items));
            setTotal(+data.total);
        } catch (error) {
            console.error(error);
            setError(true);
        }

        setFetching(false);
        return data;
    };

    const reset = () => {
        setFetching(false);
        setError(false);
        setArticles([]);
    };

    return {
        fetching,
        articles,
        error,
        total,
        getEntries: useCallback(getEntries, []),
        reset,
    };
};

export const useQuery = ({ skip = 0, limit = 50, ...query }) => {
    let buildedQuery = {
        limit,
        skip,
        'fields.enabled': true,
        content_type: 'estate',
    };

    Object.keys(query).forEach((key) => {
        const value = query[key];
        const categoryKey = 'fields.categories.sys.id[in]';
        const companyKey = 'fields.company.sys.id[in]';

        if (key.includes('company')) {
            buildedQuery[companyKey] = buildedQuery[companyKey] ? `${buildedQuery[companyKey]},${value}` : value;
        } else if (key.includes('category')) {
            buildedQuery[categoryKey] = buildedQuery[categoryKey] ? `${buildedQuery[categoryKey]},${value}` : value;
        } else if (key === 'searchText') {
            buildedQuery.query = value;
        } else if (key === 'id') {
            buildedQuery['fields.id'] = value;
        } else {
            buildedQuery[key] = value;
        }
    });

    return buildedQuery;
};

export default useGetContentfulArticles;
