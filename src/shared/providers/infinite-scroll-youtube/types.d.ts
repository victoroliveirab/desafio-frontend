import type { ReactNode } from 'react';
import type { AxiosResponse } from 'axios';
import type { YoutubeApi } from 'api/types';
import { YoutubeVideoId } from 'api/videos';

export interface IInfiniteScrollYoutube {
  state: {
    data: unknown[];
  };
  actions: {
    clearToken: () => void;
  };
}

export type IWithId = {
  id: YoutubeVideoId;
};

export type InfiniteScrollYoutubeProviderService<T extends IWithId> = (
  pageToken?: string
) => Promise<AxiosResponse<YoutubeApi<T>>>;

export interface IInfiniteScrollYoutubeProvider<T> {
  children: ReactNode;
  service?: InfiniteScrollYoutubeProviderService<T>;
}
