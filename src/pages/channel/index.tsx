import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { videosServices } from 'api';
import { InfiniteScroll } from 'components';
import { VideosGrid } from 'features/videos';
import type { YoutubeVideo } from 'api/videos';

function ChannelPage() {
  const [intersecting, setIntersecting] = useState(false);
  const [nextPageToken, setNextPageToken] = useState('');
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const { channelId } = useParams();

  useEffect(() => {
    if (!channelId) return;
    videosServices.getByChannelId(channelId).then(({ data }) => {
      setVideos(data.items);
      setNextPageToken(data.nextPageToken);
    });
  }, [channelId]);

  return (
    <>
      Channel
      <InfiniteScroll callback={setIntersecting}>
        <VideosGrid videos={videos} />
      </InfiniteScroll>
    </>
  );
}

export default ChannelPage;
