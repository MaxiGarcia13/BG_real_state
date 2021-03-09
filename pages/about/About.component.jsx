import Layout from '../../templates/Layout';
import SEO from '../../src/components/atoms/SEO';
import config from '../../src/config';
import styles from './about.styles.module.scss';
const AboutComponent = () => {
    return (
        <Layout>
            <SEO title={`Sobre nosotros - ${config.app.name}`}></SEO>
            <div className={styles.wrapper}>
                <h1 className={styles.title}> NUESTRA HISTORIA </h1>
                <h2 className={styles.subtitle}> Nuestra misión es "Crear, Vivir y Explorar nuevas experiencias"</h2>
                <div className={styles.backgroud}>
                    <img src='/assets/images/bodegas.jpg' alt='Ejemplos de bodegas' />
                </div>
                <p>
                    Nuestra empresa fué fundada en el año 2021, como consecuencia de querer generar nuevas experiencias
                    a nuestros clientes en Europa.
                </p>
                <p>
                    Somos una empresa de espíritu joven y dinámico con una clara vocación hacia la tradición y a la
                    constante evolución. Ofrecemos un tratamiento personalizado a nuestros clientes activos y
                    potenciales, lo que nos permite detectar con facilidad la realidad de mercado y adaptarnos
                    constantemente.
                </p>
                <p>
                    Estamos especializados en la comercialización de productos argentinos, que abastecemos a través de
                    nuestra red de distribución. Toda nuestra actividad comercial está homologada con las normas
                    europeas vigentes, garantizando un alto nivel de calidad en los servicios que prestamos.
                </p>
                <p>
                    Poseemos una fuerte orientación a nuestros clientes, transformando sus necesidades en soluciones
                    concretas y eficaces para el desarrollo de su negocio. Nuestra filosofía de trabajo se basa en una
                    estrecha cooperación y relación de confianza con nuestros clientes a largo plazo, haciendo nuestras
                    sus necesidades y sus éxitos.
                </p>
            </div>
        </Layout>
    );
};
export default AboutComponent;
