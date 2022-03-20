import { YoutubeVideo } from 'api/videos';
import { VideoCard } from 'components';

import styles from './styles.module.css';

interface IVideosList {
  videos: YoutubeVideo[];
}

function VideosList({ videos }: IVideosList) {
  return (
    <div className={styles['videos-list']}>
      {videos.map((video) => (
        <VideoCard key={video.id} videoInfo={video} />
      ))}
    </div>
  );
}

export default VideosList;
