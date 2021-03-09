import Layout from '../../templates/Layout';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import CardSkeletonRowComponent from '../../src/components/molecules/CardSkeleton/Row';
import Button from '../../src/components/atoms/Button';
import ImageGallery from 'react-image-gallery';
import SEO from '../../src/components/atoms/SEO';
import Svg from '../../src/components/atoms/Svg';
import config from '../../src/config';
import styles from './home.styles.module.scss';

const ArticlesList = dynamic(import('../../src/components/organism/ArticlesList'), {
    ssr: false,
    loading: () => (
        <div className={styles.grid}>
            {[1, 2, 3, 4].map((key) => (
                <CardSkeletonRowComponent key={key} />
            ))}
        </div>
    ),
});

const IndexComponent = () => {
    const images = [
        {
            original: '/assets/gallery/0.jpg',
            thumbnail: '/assets/gallery/0.jpg',
        },
        {
            original: '/assets/gallery/1.jpg',
            thumbnail: '/assets/gallery/1.jpg',
        },
        {
            original: '/assets/gallery/2.jpg',
            thumbnail: '/assets/gallery/2.jpg',
        },
        {
            original: '/assets/gallery/3.jpg',
            thumbnail: '/assets/gallery/0.jpg',
        },
        {
            original: '/assets/gallery/4.jpg',
            thumbnail: '/assets/gallery/4.jpg',
        },
        {
            original: '/assets/gallery/5.jpg',
            thumbnail: '/assets/gallery/5.jpg',
        },
        {
            original: '/assets/gallery/6.jpg',
            thumbnail: '/assets/gallery/6.jpg',
        },
        {
            original: '/assets/gallery/7.jpg',
            thumbnail: '/assets/gallery/7.jpg',
        },
        {
            original: '/assets/gallery/8.jpg',
            thumbnail: '/assets/gallery/8.jpg',
        },
    ];
    return (
        <Layout>
            <SEO title={config.app.name} />
            <section className={styles.galleryWrapper}>
                <div className={styles.gallery}>
                    <ImageGallery
                        items={images}
                        showThumbnails={false}
                        showPlayButton={false}
                        showFullscreenButton={false}
                        showNav={false}
                        showBullets={true}
                        autoPlay={true}
                        slideDuration={500}
                    />
                </div>
            </section>
            <section className={styles.title}>
                <h1>Nuestros inmuebles</h1>
            </section>
            <ArticlesList limit={4} className={styles.articles} hidePagination />
            <section className={styles.footer}>
                <Link href='/articles'>
                    <Button className={styles.button} secondary>
                        Ver más inmuebles <Svg src='/assets/icons/chevron-right.svg' />
                    </Button>
                </Link>
            </section>
        </Layout>
    );
};

export default IndexComponent;
