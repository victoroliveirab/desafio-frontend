import type { ICard } from 'components/Card';
import Card from 'components/Card';
import styles from './styles.module.scss';

export interface ICardGrid {
  data: ICard[];
}

function CardGrid({ data }: ICardGrid) {
  return (
    <div className={styles.grid}>
      {data.map((element) => (
        <Card key={element.data.id} data={element.data} />
      ))}
    </div>
  );
}

export default CardGrid;
