import type { ReactNode } from 'react';
import type { AxiosResponse } from 'axios';
import type { YoutubeApi } from 'api/types';

export interface IInfiniteScrollYoutube {
  state: {
    data: unknown[];
  };
  actions: {
    clearToken: () => void;
  };
}

export interface IInfiniteScrollYoutubeProvider<T> {
  children: ReactNode;
  service?: (pageToken?: string) => Promise<AxiosResponse<YoutubeApi<T>>>;
}

export type IId =
  | {
      id: string;
    }
  | {
      id: {
        videoId: string;
      };
    };
