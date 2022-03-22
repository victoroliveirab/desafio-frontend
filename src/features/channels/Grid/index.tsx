import { useMemo } from 'react';
import CardGrid from 'components/CardGrid';
import type { YoutubeChannel } from 'api/channels';
import type { ICard } from 'components/Card';

interface IChannelsGrid {
  channels: YoutubeChannel[];
}

function mapper(channel: YoutubeChannel) {
  const {
    id,
    snippet: {
      thumbnails: {
        high: { url: img },
      },
      title,
    },
  } = channel;
  const url = `/channels/${id}`;
  return {
    data: {
      avatar: '',
      id,
      img,
      title,
      type: 'channel',
      url,
    },
  };
}

function ChannelsGrid({ channels }: IChannelsGrid) {
  const formattedChannels: ICard[] = useMemo(
    () => channels.map(mapper),
    [channels]
  );
  return <CardGrid data={formattedChannels} />;
}

export default ChannelsGrid;
