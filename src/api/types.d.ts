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
