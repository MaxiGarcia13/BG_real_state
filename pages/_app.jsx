import React from 'react';
import App from '../templates/App';
import 'regenerator-runtime/runtime';
import '../src/styles/base.scss';

const AppComponent = ({ Component, pageProps }) => {
    return (
        <App>
            <Component {...pageProps} />
        </App>
    );
};

export default AppComponent;
