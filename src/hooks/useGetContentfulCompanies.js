import { useState, useCallback } from 'react';
import useContentfulClient from './useContentfulClient';
import useLocalStorage from './tools/useLocalStorage';
import { buildCategories } from '../utils/categories';

const KEY_LOCALSTORAGE = '__COMPANIES_CONTENTFUL_DATA';

const useGetContentfulCompanies = () => {
    const [fetching, setFetching] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState(false);

    const client = useContentfulClient();
    const storage = useLocalStorage();

    const getAllEntries = async () => {
        setFetching(true);
        setError(false);
        setCompanies([]);

        let data = async () => {};

        try {
            data = await storage.save(KEY_LOCALSTORAGE, () =>
                client.getEntries({
                    content_type: 'company',
                })
            );

            setFetching(false);

            setCompanies(buildCategories(data.items));
        } catch (error) {
            console.error(error);
            setError(true);
        }

        setFetching(false);
        return data;
    };

    return { getAllEntries: useCallback(getAllEntries, []), fetching, companies, error };
};

export default useGetContentfulCompanies;
