import Avatar from '@mui/material/Avatar';
import { YoutubeVideo } from 'api/videos';
import {
  formatViewCount,
  getBestResolutionThumbUrl,
} from 'shared/helpers/videos';
import Logo from 'assets/images/logo.svg';
import styles from './styles.module.css';

interface IVideoCard {
  videoInfo: YoutubeVideo;
}

function VideoCard({ videoInfo }: IVideoCard) {
  const thumbnailSource = getBestResolutionThumbUrl(
    videoInfo.snippet.thumbnails
  );
  const views = `${formatViewCount(videoInfo.statistics.viewCount)} views`;
  return (
    <div className={styles['video-container']}>
      <img
        src={thumbnailSource}
        className={styles['video-thumb']}
        alt={videoInfo.snippet.title}
      />
      <div className={styles['video-info']}>
        <Avatar alt="channel" src={Logo} />
        <div className={styles['video-info__text']}>
          <h2>{videoInfo.snippet.title}</h2>
          <h4>{`${videoInfo.snippet.channelTitle} • ${views}`}</h4>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
