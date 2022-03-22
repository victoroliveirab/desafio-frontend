import { AxiosInstance } from 'axios';
import type { YoutubeApi } from './types';

const prefix = 'https://youtube.googleapis.com/youtube/v3';
const googleKey = process.env.REACT_APP_API_KEY;

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
    getUserSubscriptions: async () =>
      api.get<GetUserSubscriptions>(
        `${prefix}/subscriptions?part=snippet,contentDetails&mine=true&maxResults=12&key=${googleKey}`
      ),
  };
}
