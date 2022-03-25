import { AxiosInstance } from 'axios';
import buildQuery from 'shared/helpers/api/youtube';
import type { YoutubeApi, YoutubeUploadVideo } from './types';

const prefix = 'https://youtube.googleapis.com/youtube/v3';

export interface VideoThumbnail {
  width: number;
  height: number;
  url: string;
}

export interface VideoThumbnails {
  [size: string]: VideoThumbnail;
}

export interface VideoSnippet {
  categoryId?: string;
  channelId: string;
  channelTitle: string;
  defaultAudioLanguage?: string;
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

export interface YoutubeCategory {
  id: string;
  snippet: {
    title: string;
  };
}

export type GetCategories = YoutubeApi<YoutubeCategory>;
export type GetMostPopular = YoutubeApi<YoutubeVideo>;
export type GetByPageToken = YoutubeApi<YoutubeVideo>;
export type GetByKeyword = YoutubeApi<YoutubeVideo>;
export type GetByChannelId = YoutubeApi<YoutubeVideo>;
export type GetById = YoutubeApi<YoutubeVideo>;
export type UploadVideo = YoutubeUploadVideo;

export default function videosService(api: AxiosInstance) {
  return {
    getMostPopular: async (pageToken?: string) =>
      api.get<GetMostPopular>(
        `${prefix}/videos?${buildQuery({
          chart: 'mostPopular',
          pageSize: 12,
          pageToken,
          part: ['contentDetails', 'snippet', 'statistics'],
        })}`
      ),
    getByKeyword: async (keyword: string, pageToken?: string) =>
      api.get<GetByKeyword>(
        `${prefix}/search?${buildQuery({
          keyword,
          pageSize: 12,
          pageToken,
          part: ['snippet'],
          type: 'video',
        })}`
      ),
    getByChannelId: async (channelId: string, pageToken?: string) =>
      api.get<GetByChannelId>(
        `${prefix}/activities?${buildQuery({
          channelId,
          pageSize: 12,
          pageToken,
          part: ['contentDetails', 'snippet'],
        })}`
      ),
    getById: async (id: string) =>
      api.get<GetById>(
        `${prefix}/videos?${buildQuery({
          id: [id],
          part: ['contentDetails', 'snippet', 'statistics'],
        })}`
      ),
    getCategories: async () =>
      api.get<GetCategories>(
        `https://www.googleapis.com/youtube/v3/videoCategories?${buildQuery({
          part: ['snippet'],
          regionCode: 'US',
        })}`
      ),
    uploadVideo: async (video: File) => {
      const formData = new FormData();
      formData.append('file', video);
      return api.post<UploadVideo>(
        'https://www.googleapis.com/upload/youtube/v3/videos',
        formData
      );
    },
    uploadVideoInfo: async (
      id: string,
      title: string,
      description: string,
      categoryId: string
    ) =>
      api.put(
        `https://www.googleapis.com/youtube/v3/videos?${buildQuery({
          part: ['snippet'],
        })}`,
        {
          id,
          snippet: {
            title,
            description,
            categoryId,
          },
        }
      ),
  };
}
