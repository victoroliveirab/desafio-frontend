import { YoutubeVideo } from 'api/videos';
import { VideoCard } from 'components';

import styles from './styles.module.css';

interface IVideosList {
  videos: YoutubeVideo[];
}

function VideosList({ videos }: IVideosList) {
  return (
    <div className={styles['videos-list']}>
      {videos.map((video) => {
        const id = typeof video.id === 'string' ? video.id : video.id.videoId;
        return <VideoCard key={id} videoInfo={video} />;
      })}
    </div>
  );
}

export default VideosList;
