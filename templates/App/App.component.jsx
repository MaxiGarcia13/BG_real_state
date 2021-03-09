import Head from 'next/head';
import { Provider } from 'react-redux';
import config from '../../src/config';
import configureStore from '../../src/store';

const store = configureStore();
const AppComponent = ({ children }) => {
    return (
        <>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
                />
                <meta name='keywords' content={config.app.keywords} />
                <link rel='shortcut icon' type='image/x-icon' href={config.app.icon} />
                <link rel='icon' type='image/vnd.microsoft.icon' href={config.app.icon} />
                <link rel='shortcut icon' type='image/x-icon' href={config.app.icon}></link>
                <link rel='icon' href={config.app.icon} />
                <link rel='preconnect' href='https://fonts.gstatic.com' />
                <link
                    href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap'
                    rel='stylesheet'
                />
            </Head>
            <Provider store={store}>{children}</Provider>
        </>
    );
};

export default AppComponent;
