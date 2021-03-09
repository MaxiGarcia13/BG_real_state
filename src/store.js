import { createStore, applyMiddleware, compose } from 'redux';

import loggerMiddleware from './middlewares/tools/logger';
import monitorReducerEnhancer from './middlewares/enhancers/monitorReducerEnhancer';

import rootReducers from './reducers';

const configureStore = (preloadedState) => {
    let middlewares = [];
    let middlewaresEnhancers = [];

    if (process.env.NODE_ENV === 'development') {
        middlewares.push(loggerMiddleware);
        middlewaresEnhancers.push(monitorReducerEnhancer);
    }

    const middlewareEnhancer = applyMiddleware(...middlewares);
    const enhancers = [middlewareEnhancer, ...middlewaresEnhancers];

    const composedEnhancers = compose(...enhancers);

    const store = createStore(rootReducers, preloadedState, composedEnhancers);

    return store;
};

export default configureStore;
