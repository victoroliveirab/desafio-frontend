import { useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const thumbnailSource = getBestResolutionThumbUrl(
    videoInfo.snippet.thumbnails
  );
  const subtitle = useMemo(() => {
    const stringBuilder = [videoInfo.snippet.channelTitle];
    if (videoInfo.statistics)
      stringBuilder.push(
        `${formatViewCount(videoInfo.statistics.viewCount)} views`
      );
    return stringBuilder.join('•');
  }, [videoInfo.snippet.channelTitle, videoInfo.statistics]);
  const watchVideo = () => {
    navigate(`/videos/${videoInfo.id}`, {
      state: {
        videoInfo,
      },
    });
  };
  return (
    <div className={styles['video-container']}>
      <div data-testid="thumbnail-wrapper" onClick={watchVideo}>
        <img
          src={thumbnailSource}
          className={styles['video-thumb']}
          alt={videoInfo.snippet.title}
        />
      </div>
      <div className={styles['video-info']}>
        <Avatar alt="channel" src={Logo} />
        <div className={styles['video-info__text']}>
          <h2>{videoInfo.snippet.title}</h2>
          <h4>{subtitle}</h4>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
