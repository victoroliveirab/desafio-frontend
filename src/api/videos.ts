import { AxiosInstance } from 'axios';
import type { YoutubeApi } from './types';

const prefix = 'https://youtube.googleapis.com/youtube/v3';
const googleKey = process.env.REACT_APP_API_KEY;

export interface VideoThumbnail {
  width: number;
  height: number;
  url: string;
}

export interface VideoThumbnails {
  [size: string]: VideoThumbnail;
}

export interface VideoSnippet {
  categoryId: string;
  channelId: string;
  channelTitle: string;
  defaultAudioLanguage: string;
  description: string;
  liveBroadcastContent: string;
  publishedAt: string;
  thumbnails: VideoThumbnails;
  title: string;
}

export interface VideoContentDetails {
  caption: 'true' | 'false';
  definition: string;
  duration: string;
}

export interface VideoStatistics {
  commentCount: string;
  likeCount: string;
  viewCount: string;
}

export type YoutubeVideoId =
  | {
      kind: string;
      videoId: string;
    }
  | string;

export interface YoutubeVideo {
  id: YoutubeVideoId;
  contentDetails?: VideoContentDetails;
  snippet: VideoSnippet;
  statistics?: VideoStatistics;
}

export type GetMostPopular = YoutubeApi<YoutubeVideo>;
export type GetByPageToken = YoutubeApi<YoutubeVideo>;
export type GetByKeyword = YoutubeApi<YoutubeVideo>;

const mostPopularQuery =
  'part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&maxResults=12';

export default function videosService(api: AxiosInstance) {
  return {
    getMostPopular: async () =>
      api.get<GetMostPopular>(
        `${prefix}/videos?key=${googleKey}&${mostPopularQuery}`
      ),
    getByPageToken: async (pageToken: string) =>
      api.get<GetByPageToken>(
        `${prefix}/videos?key=${googleKey}&${mostPopularQuery}&pageToken=${pageToken}`
      ),
    getByKeyword: async (keyword: string) =>
      api.get<GetByKeyword>(
        `${prefix}/search?&key=${googleKey}&part=snippet&maxResults=12&type=video&q=${keyword}`
      ),
  };
}
