import { useEffect, useState } from 'react';
import { SearchField } from 'components';
import { VideosGrid } from 'features/videos';
import { videosServices } from 'api';
import InfiniteScrollYoutubeProvider from 'shared/providers/infinite-scroll-youtube';
import { useInfiniteScrollGrid, useServiceState } from 'shared/hooks';
import searchHistory from 'lib/history-storage/search';
import type { ApiServiceState } from 'api/types';
import type { GetByKeyword, YoutubeVideo } from 'api/videos';

import styles from './styles.module.scss';

interface IVideosPage {
  callback: (param: ApiServiceState<GetByKeyword>) => void;
}

function VideosPage({ callback }: IVideosPage) {
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
    const now = new Date().toISOString();
    searchHistory.putNewEntry({
      id: keyword,
      date: now,
      term: keyword,
    });
    callback((pageToken?: string) =>
      videosServices.getByKeyword(keyword, pageToken)
    );
  }, [callback, clearToken, keyword, refresh]);

  return (
    <>
      <div className={styles.searchfield}>
        <SearchField
          autocomplete
          options={searchHistory.entries.map((entry) => ({
            ...entry,
            label: entry.term,
          }))}
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
  const [service, setService] = useServiceState<GetByKeyword>();
  return (
    <InfiniteScrollYoutubeProvider service={service}>
      <VideosPage callback={setService} />
    </InfiniteScrollYoutubeProvider>
  );
}

export default VideosPageWrapper;
