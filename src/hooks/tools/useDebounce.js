import { useCallback } from 'react';
/**
 * Hook tu use for a will be called after it stops taking pattern actions for ms milliseconds. Purpose of this is to prevent calling until the actions are settled off.
 */
const useDebounce = () => {
    let timer = null;

    /**
     *
     * @param {Function} callback Action to execute
     * @param {Number} timeMls Fefines how many milliseconds should elapse since the last time
     */
    const execute = (callback = () => {}, timeMls = 800) => {
        stop();

        if (typeof callback === 'function') {
            timer = setTimeout(() => {
                callback();
            }, timeMls);
        }
    };

    const stop = () => {
        clearTimeout(timer);
    };

    return {
        execute: useCallback(execute, []),
        stop: useCallback(stop, []),
    };
};

export default useDebounce;
