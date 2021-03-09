import { useCallback } from 'react';

const useTimeDifference = () => {
    const days = (date1 = Date.now(), date2 = Date.now()) => {
        const difference = new Date(date2).getTime() - new Date(date1).getTime();

        return Math.floor(difference / 1000 / 60 / 60 / 24);
    };

    const hours = (date1 = Date.now(), date2 = Date.now()) => {
        const difference = new Date(date2).getTime() - new Date(date1).getTime();

        return Math.floor(difference / 1000 / 60 / 60);
    };

    const minutes = (date1 = Date.now(), date2 = Date.now()) => {
        const difference = new Date(date2).getTime() - new Date(date1).getTime();
        return Math.floor(difference / 1000 / 60);
    };

    const seconds = (date1 = Date.now(), date2 = Date.now()) => {
        const difference = new Date(date2).getTime() - new Date(date1).getTime();
        return Math.floor(difference / 1000);
    };

    return {
        days: useCallback(days, []),
        hours: useCallback(hours, []),
        minutes: useCallback(minutes, []),
        seconds: useCallback(seconds, []),
    };
};

export default useTimeDifference;
