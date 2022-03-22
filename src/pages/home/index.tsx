import { useEffect, useState } from 'react';
import { videosServices } from 'api';
import { InfiniteScroll } from 'components';
import { VideosGrid } from 'features/videos';
import type { YoutubeVideo } from 'api/videos';

const MAX_ELEMENTS = 96;

function HomePage() {
  const [intersecting, setIntersecting] = useState(false);
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [requestInProgress, setRequestInProgress] = useState(false);

  useEffect(() => {
    setRequestInProgress(true);
    videosServices.getMostPopular().then(({ data }) => {
      setVideos(data.items);
      setNextPageToken(data.nextPageToken);
      setTimeout(() => setRequestInProgress(false), 100); // TODO: set proper throttle function
    });
  }, []);

  useEffect(() => {
    if (!intersecting || !nextPageToken || requestInProgress) return;
    if (videos.length >= MAX_ELEMENTS) return;
    setRequestInProgress(true);
    videosServices.getMostPopular(nextPageToken).then(({ data }) => {
      setVideos((currentVideos) => currentVideos.concat(data.items));
      setNextPageToken(data.nextPageToken);
      setTimeout(() => setRequestInProgress(false), 100); // TODO: set proper throttle function
    });
  }, [intersecting, nextPageToken, requestInProgress, videos]);

  return (
    <>
      <InfiniteScroll callback={setIntersecting}>
        <VideosGrid videos={videos} />
      </InfiniteScroll>
      <p className="text-center">All rights reserved</p>
    </>
  );
}

export default HomePage;
