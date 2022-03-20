import { YoutubeVideo } from 'api/videos';
import HistoryStorage from '.';

export default new HistoryStorage<YoutubeVideo>('video-history', 10);
