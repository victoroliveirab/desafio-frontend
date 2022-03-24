import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

export interface ICard {
  data: {
    avatar: string;
    id: string;
    img: string;
    subtitle?: string;
    title: string;
    type: string;
    url: string;
  };
}

function Card({ data }: ICard) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div
        className={styles['thumb-wrapper']}
        onClick={() => {
          navigate(data.url, {
            state: data,
          });
        }}
      >
        <img src={data.img} alt={data.title} className={styles.thumb} />
      </div>
      <div className={styles.info}>
        <Avatar alt={data.type} src={data.avatar} />
        <div className={styles.info__text}>
          <h2>{data.title}</h2>
          <h4>{data.subtitle}</h4>
        </div>
      </div>
    </div>
  );
}

export default Card;
