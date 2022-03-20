import { useEffect, useState } from 'react';
import { videosServices } from 'api';
import { VideoCard } from 'components';
import type { YoutubeVideo } from 'api/videos';

import styles from './styles.module.css';

function HomePage() {
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  useEffect(() => {
    videosServices.getMostPopular().then(({ data }) => setVideos(data.items));
  }, []);
  return (
    <>
      <div className={styles['videos-list']}>
        {videos.map((video) => (
          <VideoCard key={video.id} videoInfo={video} />
        ))}
      </div>
      <p className="text-center">All rights reserved</p>
    </>
  );
}

export default HomePage;
