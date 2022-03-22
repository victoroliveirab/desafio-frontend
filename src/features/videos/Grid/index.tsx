import { useMemo } from 'react';
import CardGrid from 'components/CardGrid';
import type { YoutubeVideo } from 'api/videos';
import type { ICard } from 'components/Card';

interface IVideosGrid {
  videos: YoutubeVideo[];
}

function VideosGrid({ videos }: IVideosGrid) {
  const formattedVideos: ICard[] = useMemo(
    () =>
      videos.map((video) => ({
        data: {
          avatar: '',
          id: typeof video.id === 'string' ? video.id : video.id.videoId,
          img: '',
          subtitle: '',
          title: '',
          type: '',
          url: '',
        },
      })),
    [videos]
  );

  return <CardGrid data={formattedVideos} />;
}

export default VideosGrid;
