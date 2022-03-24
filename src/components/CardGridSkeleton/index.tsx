import CardSkeleton from 'components/CardSkeleton';
import styles from './styles.module.scss';

interface ICardGridSkeleton {
  cards: number;
}

function generateArray(length: number) {
  return Array(length)
    .fill(0)
    .map((_, id) => ({
      id,
    }));
}

function CardGridSkeleton({ cards }: ICardGridSkeleton) {
  return (
    <div className={styles.grid}>
      {generateArray(cards).map(({ id }) => (
        <CardSkeleton key={id} />
      ))}
    </div>
  );
}

export default CardGridSkeleton;
