import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { videosServices } from 'api';
import { useViewport } from 'shared/hooks';
import videosStorage from 'lib/history-storage/videos';

export default function VideoPage() {
  const { videoId } = useParams();
  const { width } = useViewport();

  useEffect(() => {
    if (!videoId) return;
    videosServices.getById(videoId).then(({ data }) => {
      const [item] = data.items;
      videosStorage.putNewEntry(item);
    });
  }, [videoId]);

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
