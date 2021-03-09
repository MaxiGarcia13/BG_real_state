import { useCallback } from 'react';
import useTimeDifference from './useTimeDifference';

/**
 * This book was created to save in sessionstorage the response of some promise.
 */
const useSessionStorege = () => {
    const timeDifference = useTimeDifference();
    /**
     *
     * @param {String} key Key in localstorage
     * @param {Promise} callback Action to execute
     * @param {Number} maxTs timestamp to remove in localstorage in minutes
     */
    const save = async (key = '', callback = new Promise(), maxTs = 60) => {
        let response = sessionStorage.getItem(key);

        if (response) {
            const { data, ts } = JSON.parse(response);
            const diff = timeDifference.minutes(ts);

            if (diff > maxTs) {
                deleteData(key);
                return save(key, callback);
            } else {
                return data;
            }
        } else {
            response = await callback();
            sessionStorage.setItem(key, JSON.stringify({ data: response, ts: Date.now() }));
            return response;
        }
    };

    /**
     *
     * @param {String} key Key in localstorage
     */
    const deleteData = (key = '') => sessionStorage.removeItem(key);

    return {
        save: useCallback(save, []),
        delete: useCallback(deleteData, []),
    };
};

export default useSessionStorege;
