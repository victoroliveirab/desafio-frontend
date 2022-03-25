import { useParams } from 'react-router-dom';
import Link from '@mui/material/Link';
import { videosServices } from 'api';
import { VideosGrid } from 'features/videos';
import InfiniteScrollYoutubeProvider from 'shared/providers/infinite-scroll-youtube';
import type { YoutubeVideo } from 'api/videos';
import { useInfiniteScrollGrid } from 'shared/hooks';

function ChannelNotFound() {
  return (
    <div className="text-center">
      <p>Channel not found</p>
      <Link href="/channels">&larr; Back to channels</Link>
    </div>
  );
}

function ChannelPage() {
  const {
    state: { data },
  } = useInfiniteScrollGrid();
  const videos = Array.isArray(data) ? (data as YoutubeVideo[]) : undefined;

  if (!videos) return <></>;

  if (videos.length === 0) {
    return <ChannelNotFound />;
  }

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
      noStartEmpty
      service={() => videosServices.getByChannelId(channelId)}
    >
      <ChannelPage />
    </InfiniteScrollYoutubeProvider>
  );
}

export default ChannelPageWrapper;
