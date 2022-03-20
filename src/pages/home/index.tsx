import { useEffect, useRef, useState } from 'react';
import { videosServices } from 'api';
import { VideoCard } from 'components';
import type { YoutubeVideo } from 'api/videos';
import { useIntersectionDom } from 'shared/hooks';

import styles from './styles.module.css';

const MAX_ELEMENTS = 96;

function HomePage() {
  const refBottom = useRef<HTMLParagraphElement | null>(null);

  const intersecting = useIntersectionDom(refBottom);
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [requestInProgress, setRequestInProgress] = useState(false);

  useEffect(() => {
    setRequestInProgress(true);
    videosServices.getMostPopular().then(({ data }) => {
      setVideos(data.items);
      setNextPageToken(data.nextPageToken);
      setTimeout(() => setRequestInProgress(false), 100); // TODO: set proper throttle function
    });
  }, []);

  useEffect(() => {
    if (!intersecting || !nextPageToken || requestInProgress) return;
    if (videos.length >= MAX_ELEMENTS) return;
    setRequestInProgress(true);
    videosServices.getByPageToken(nextPageToken).then(({ data }) => {
      setVideos((currentVideos) => currentVideos.concat(data.items));
      setNextPageToken(data.nextPageToken);
      setTimeout(() => setRequestInProgress(false), 100); // TODO: set proper throttle function
    });
  }, [intersecting, nextPageToken, requestInProgress, videos]);

  return (
    <>
      <div className={styles['videos-list']}>
        {videos.map((video) => (
          <VideoCard key={video.id} videoInfo={video} />
        ))}
      </div>
      <p ref={refBottom} className="text-center">
        All rights reserved
      </p>
    </>
  );
}

export default HomePage;
