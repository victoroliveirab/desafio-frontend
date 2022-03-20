import { VideoThumbnails } from 'api/videos';

export function getBestResolutionThumbUrl(thumbnails: VideoThumbnails) {
  const options = Object.entries(thumbnails);
  if (options.length === 0) return '';
  const [, { url }] = Object.entries(thumbnails).reduce((bestThumb, thumb) => {
    const [, { width: maxWidth }] = bestThumb;
    const [, { width }] = thumb;
    return maxWidth > width ? bestThumb : thumb;
  });
  return url;
}

export function formatViewCount(viewCount: string) {
  const magnitude = viewCount.length;
  if (magnitude < 4) return viewCount;
  if (magnitude < 7) return `${Math.floor(+viewCount / 1000)}K`;
  return `${Math.floor(+viewCount / 100_000) / 10}M`;
}
