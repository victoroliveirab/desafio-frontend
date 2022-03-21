import { useEffect, useState } from 'react';
import { SearchField, VideosList } from 'components';
import { videosServices } from 'api';
import type { YoutubeVideo } from 'api/videos';

import styles from './styles.module.css';

function VideosPage() {
  const [keyword, setKeyword] = useState('');
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);

  useEffect(() => {
    if (keyword.length < 3) return;
    videosServices.getByKeyword(keyword).then(({ data }) => {
      setVideos(data.items);
    });
  }, [keyword]);

  return (
    <div>
      <div className={styles['videos-searchfield']}>
        <SearchField callback={setKeyword} />
      </div>
      <VideosList videos={videos} />
    </div>
  );
}

export default VideosPage;
