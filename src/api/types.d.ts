export type YoutubeApi<T> = {
  kind: string;
  etag: string;
  items: T[];
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

export interface YoutubeQuery {
  chart?: string;
  channelId?: string;
  id?: string[];
  keyword?: string;
  mine?: boolean;
  pageSize?: number;
  pageToken?: string;
  part: string[];
  regionCode?: string;
  type?: 'channel' | 'playlist' | 'video';
}
