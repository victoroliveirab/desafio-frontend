import { useEffect, useState } from 'react';
import { SearchField } from 'components';
import { VideosGrid } from 'features/videos';
import { videosServices } from 'api';
import InfiniteScrollYoutubeProvider from 'shared/providers/infinite-scroll-youtube';
import { useInfiniteScrollGrid } from 'shared/hooks';
import type { YoutubeVideo } from 'api/videos';

import styles from './styles.module.css';

// TODO: define callback type
function VideosPage({ callback }: any) {
  const {
    state: { data },
    actions: { clearToken },
  } = useInfiniteScrollGrid();
  const [keyword, setKeyword] = useState('');
  const [refresh, setRefresh] = useState(false);
  const videos = data as YoutubeVideo[];

  useEffect(() => {
    if (!refresh || keyword.length < 3) return;
    clearToken();
    setRefresh(false);
    callback(
      () => (pageToken?: string) =>
        videosServices.getByKeyword(keyword, pageToken)
    );
  }, [callback, clearToken, keyword, refresh]);

  return (
    <>
      <div className={styles['videos-searchfield']}>
        <SearchField
          callback={(input) => {
            if (input !== keyword) {
              setKeyword(input);
              setRefresh(true);
            }
          }}
        />
      </div>
      <VideosGrid videos={videos} />
    </>
  );
}
function VideosPageWrapper() {
  const [service, setService] = useState();
  return (
    <InfiniteScrollYoutubeProvider service={service}>
      <VideosPage callback={setService} />
    </InfiniteScrollYoutubeProvider>
  );
}

export default VideosPageWrapper;
