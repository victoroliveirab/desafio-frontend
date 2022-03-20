import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useViewport } from 'shared/hooks';
import { YoutubeVideo } from 'api/videos';
import historyStorage from 'lib/history';

type LocationState = {
  videoInfo: YoutubeVideo;
};

export default function VideoPage() {
  const { videoId } = useParams();
  const location = useLocation();
  const { width } = useViewport();

  const { videoInfo } = location.state as LocationState;

  useEffect(() => {
    if (videoId === videoInfo.id) {
      console.log(videoInfo);
      // historyStorage.putNewEntry({
      //   id,
      //   title,
      // })
    }
  }, [videoId, videoInfo]);

  return (
    <iframe
      id="ytplayer"
      title={videoId}
      width={width - 40}
      height={0.75 * (width - 40)}
      src={`https://www.youtube.com/embed/${videoId}`}
      allowFullScreen
      style={{ border: 0 }}
    />
  );
}
