import type { YoutubeQuery } from 'api/types';

export default function buildQuery({
  chart,
  channelId,
  id,
  keyword,
  mine,
  pageSize,
  pageToken,
  part,
  regionCode,
  type,
}: YoutubeQuery) {
  const query: string[] = [];
  if (chart) query.push(`chart=${chart}`);
  if (channelId) query.push(`channelId=${channelId}`);
  if (id) query.push(`id=${id.join(',')}`);
  if (keyword) query.push(`q=${keyword}`);
  if (mine) query.push(`mine=${mine}`);
  if (pageSize) query.push(`maxResults=${pageSize}`);
  if (pageToken) query.push(`pageToken=${pageToken}`);
  if (part) query.push(`part=${part.join(',')}`);
  if (regionCode) query.push(`regionCode=${regionCode}`);
  if (type) query.push(`type=${type}`);
  query.push(`key=${process.env.REACT_APP_API_KEY}`);

  return query.join('&');
}
