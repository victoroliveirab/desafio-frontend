import { YoutubeVideo } from 'api/videos';
import HistoryStorage from '.';

export default new HistoryStorage<YoutubeVideo>(
  'video-history',
  (item) => {
    if (typeof item.id === 'string') return item.id;
    return item.id.videoId;
  },
  10
);
