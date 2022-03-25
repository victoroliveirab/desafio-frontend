import { useEffect } from 'react';
import { videosServices } from 'api';
import { VideosGrid } from 'features/videos';
import InfiniteScrollYoutubeProvider from 'shared/providers/infinite-scroll-youtube';
import { useInfiniteScrollGrid, useServiceState } from 'shared/hooks';
import type { GetMostPopular, YoutubeVideo } from 'api/videos';
import type { ApiServiceState } from 'api/types';
import CardGridSkeleton from 'components/CardGridSkeleton';

const MAX_ELEMENTS = 96;

interface IHomePage {
  callback: (param?: ApiServiceState<GetMostPopular>) => void;
}

const getMostPopular =
  videosServices.getMostPopular as ApiServiceState<GetMostPopular>;

function HomePage({ callback }: IHomePage) {
  const {
    state: { data },
  } = useInfiniteScrollGrid();
  const videos = data as YoutubeVideo[];

  useEffect(() => {
    if (data.length >= MAX_ELEMENTS) callback();
    else callback(getMostPopular);
  }, [callback, data]);

  return (
    <>
      {videos.length > 0 ? (
        <VideosGrid videos={videos} />
      ) : (
        <CardGridSkeleton cards={12} />
      )}
      <p className="text-center">All rights reserved</p>
    </>
  );
}

function HomePageWrapper() {
  const [service, setService] = useServiceState<GetMostPopular>();
  return (
    <InfiniteScrollYoutubeProvider service={service}>
      <HomePage callback={setService} />
    </InfiniteScrollYoutubeProvider>
  );
}

export default HomePageWrapper;
