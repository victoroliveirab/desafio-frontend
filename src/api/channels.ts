import { AxiosInstance } from 'axios';
import buildQuery from 'shared/helpers/api/youtube';
import type { YoutubeApi } from './types';

const prefix = 'https://youtube.googleapis.com/youtube/v3';

export interface ChannelSnippet {
  publishedAt: string;
  title: string;
  description: string;
  resourceId: {
    channelId: string;
  };
  thumbnails: {
    [size: string]: {
      url: string;
    };
  };
}

export interface ChannelContentDetails {
  totalItemCount: string;
  newItemCount: string;
}

export interface YoutubeChannel {
  id: string;
  snippet: ChannelSnippet;
  contentDetails: ChannelContentDetails;
}

export type GetUserSubscriptions = YoutubeApi<YoutubeChannel>;

export default function channelsService(api: AxiosInstance) {
  return {
    getUserSubscriptions: async (pageToken?: string) =>
      api.get<GetUserSubscriptions>(
        `${prefix}/subscriptions?${buildQuery({
          mine: true,
          pageSize: 12,
          pageToken,
          part: ['contentDetails', 'snippet'],
        })}`
      ),
  };
}
