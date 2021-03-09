import { useState, useCallback } from 'react';
import useContentfulClient from './useContentfulClient';
import useLocalStorage from './tools/useLocalStorage';
import { buildCategories } from '../utils/categories';

const KEY_LOCALSTORAGE = '__CATEGORIES_CONTENTFUL_DATA';

const useGetContentfulCategories = () => {
    const [fetching, setFetching] = useState(false);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);

    const client = useContentfulClient();
    const storage = useLocalStorage();

    const getAllEntries = async () => {
        setFetching(true);
        setError(false);
        setCategories([]);

        let data = async () => {};

        try {
            data = await storage.save(KEY_LOCALSTORAGE, () =>
                client.getEntries({
                    content_type: 'category',
                })
            );

            setFetching(false);

            setCategories(buildCategories(data.items));
        } catch (error) {
            console.error(error);
            setError(true);
        }

        setFetching(false);
        return data;
    };

    return { getAllEntries: useCallback(getAllEntries, []), fetching, categories, error };
};

export default useGetContentfulCategories;
