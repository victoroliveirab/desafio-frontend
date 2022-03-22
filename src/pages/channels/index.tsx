import { useEffect, useState } from 'react';
import { channelsServices } from 'api';
import type { YoutubeChannel } from 'api/channels';
import { ChannelsGrid } from 'features/channels';

function ChannelsPage() {
  const [channels, setChannels] = useState<YoutubeChannel[]>([]);
  const [nextPageToken, setNextPageToken] = useState('');
  useEffect(() => {
    channelsServices.getUserSubscriptions().then(({ data }) => {
      setChannels(data.items);
      setNextPageToken(data.nextPageToken);
    });
  }, []);
  return (
    <div>
      Channels
      <ChannelsGrid channels={channels} />
    </div>
  );
}

export default ChannelsPage;
