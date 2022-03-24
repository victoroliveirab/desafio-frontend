import { useParams } from 'react-router-dom';
import { videosServices } from 'api';
import { VideosGrid } from 'features/videos';
import InfiniteScrollYoutubeProvider from 'shared/providers/infinite-scroll-youtube';
import type { YoutubeVideo } from 'api/videos';
import { useInfiniteScrollGrid } from 'shared/hooks';

function ChannelPage() {
  const {
    state: { data },
  } = useInfiniteScrollGrid();
  const videos = data as YoutubeVideo[];

  return (
    <InfiniteScrollYoutubeProvider>
      <VideosGrid videos={videos} />
    </InfiniteScrollYoutubeProvider>
  );
}

function ChannelPageWrapper() {
  const { channelId } = useParams();
  if (!channelId) return <></>;
  return (
    <InfiniteScrollYoutubeProvider
      service={() => videosServices.getByChannelId(channelId)}
    >
      <ChannelPage />
    </InfiniteScrollYoutubeProvider>
  );
}

export default ChannelPageWrapper;
