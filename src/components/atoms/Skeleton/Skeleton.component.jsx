import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styles from './skeleton.styles.module.scss';

const SkeletonComponent = ({ height = '30px', width = '100%' }) => (
    <SkeletonTheme color={styles.backgroudLoading} highlightColor={styles.backgroudLoadingHighlight}>
        <p>
            <Skeleton height={height} width={width} />
        </p>
    </SkeletonTheme>
);

export default SkeletonComponent;
