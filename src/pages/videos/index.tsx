import { useEffect, useState } from 'react';
import { InfiniteScroll, SearchField, VideosList } from 'components';
import { videosServices } from 'api';
import type { YoutubeVideo } from 'api/videos';
import { useThrottle } from 'shared/hooks';

import styles from './styles.module.css';

function VideosPage() {
  const [available, trigger] = useThrottle({
    delay: 500,
  });
  const [intersecting, setIntersecting] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [nextPageToken, setNextPageToken] = useState('');
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);

  useEffect(() => {
    if (keyword.length < 3 || nextPageToken || !available) return;
    videosServices.getByKeyword(keyword).then(({ data }) => {
      trigger();
      setNextPageToken(data.nextPageToken);
      setVideos(data.items);
    });
  }, [available, keyword, nextPageToken, trigger]);

  useEffect(() => {
    if (!intersecting || !nextPageToken || !available) return;
    videosServices.getByKeyword(keyword, nextPageToken).then(({ data }) => {
      trigger();
      setNextPageToken(data.nextPageToken);
      setVideos((currentVideos) => currentVideos.concat(data.items));
    });
  }, [available, keyword, intersecting, nextPageToken, trigger]);

  return (
    <>
      <div className={styles['videos-searchfield']}>
        <SearchField
          callback={(input) => {
            if (input !== keyword) {
              setKeyword(input);
              setNextPageToken('');
            }
          }}
        />
      </div>
      <InfiniteScroll callback={setIntersecting}>
        <VideosList videos={videos} />
      </InfiniteScroll>
    </>
  );
}

export default VideosPage;
