import styles from './footer.styles.module.scss';
import Brand from '../../atoms/Brand';
import Svg from '../../atoms/Svg';
import config from '../../../config';

const currentYear = new Date().getFullYear();
const hostName = window.location.host;

const FooterComponent = () => {
    return (
        <footer className={styles.wrapper}>
            <div className={styles.header}>
                <Brand />
            </div>
            <div className={styles.body}>
                <div className={styles.navBar}>
                    <a href={`tel:${config.app.phone}`}>
                        <Svg src='/assets/icons/phone.svg' /> {`${config.app.phone}`}
                    </a>
                    <a href={`mailto:${config.app.mail}`}>
                        <Svg src='/assets/icons/mail.svg' />
                        {`${config.app.mail}`}
                    </a>
                    <a href={config.app.location.url} target='_blank' rel='noopener noreferrer'>
                        <Svg src='/assets/icons/map-pin.svg' />
                        {`${config.app.location.name}`}
                    </a>
                </div>
                <div className={styles.copyright}>
                    © 2020-{currentYear}, <span>{` ${hostName}`}</span>. o afiliados. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;
