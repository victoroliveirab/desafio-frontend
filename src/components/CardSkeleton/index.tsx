import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';

import styles from './styles.module.scss';

function CardSkeleton() {
  return (
    <div className={styles.container}>
      <Skeleton
        animation="wave"
        className={styles.skeleton__image}
        variant="rectangular"
      />
      <div className={styles.skeleton__info}>
        <Avatar />
        <div className={styles.skeleton__text}>
          <div className={styles.skeleton__title}>
            <Skeleton animation="wave" variant="rectangular" height="1rem" />
          </div>
          <div className={styles.skeleton__subtitle}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              height="0.875rem"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSkeleton;
