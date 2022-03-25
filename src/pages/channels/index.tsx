import { channelsServices } from 'api';
import type { YoutubeChannel } from 'api/channels';
import { ChannelsGrid } from 'features/channels';
import InfiniteScrollGridProvider from 'shared/providers/infinite-scroll-youtube';
import { useInfiniteScrollGrid } from 'shared/hooks';

function ChannelsPage() {
  const {
    state: { data },
  } = useInfiniteScrollGrid();
  const channels = data as YoutubeChannel[];
  return (
    <div>
      <h2 className="text-center">Your channels</h2>
      <ChannelsGrid channels={channels} />
    </div>
  );
}

function WrapperChannelsPage() {
  return (
    <InfiniteScrollGridProvider service={channelsServices.getUserSubscriptions}>
      <ChannelsPage />
    </InfiniteScrollGridProvider>
  );
}

export default WrapperChannelsPage;
