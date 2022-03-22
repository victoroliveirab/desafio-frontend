import { useMemo } from 'react';
import CardGrid from 'components/CardGrid';
import type { YoutubeVideo } from 'api/videos';
import type { ICard } from 'components/Card';
import {
  formatViewCount,
  getBestResolutionThumbUrl,
} from 'shared/helpers/videos';

interface IVideosGrid {
  videos: YoutubeVideo[];
}

function buildVideoCardSubtitle(video: YoutubeVideo) {
  const stringBuilder = [video.snippet.channelTitle];
  if (video.statistics)
    stringBuilder.push(`${formatViewCount(video.statistics.viewCount)} views`);
  return stringBuilder.join(' • ');
}

function mapper(video: YoutubeVideo) {
  const {
    snippet: { thumbnails, title },
  } = video;
  const id = typeof video.id === 'string' ? video.id : video.id.videoId;
  const img = getBestResolutionThumbUrl(thumbnails);
  const subtitle = buildVideoCardSubtitle(video);
  const type = 'video';
  const url = `/videos/${id}`;
  return {
    data: {
      avatar: '',
      id,
      img,
      subtitle,
      title,
      type,
      url,
    },
  };
}

function VideosGrid({ videos }: IVideosGrid) {
  const formattedVideos: ICard[] = useMemo(() => videos.map(mapper), [videos]);

  return <CardGrid data={formattedVideos} />;
}

export default VideosGrid;
