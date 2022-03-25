import { VideosGrid } from 'features/videos';
import videosStorage from 'lib/history-storage/videos';

function HistoryPage() {
  const hasVideos = videosStorage.entries.length > 0;
  return hasVideos ? (
    <VideosGrid videos={videosStorage.entries} />
  ) : (
    <p className="text-center">
      You haven&apos;t watched a video for a while. Why don&apos;t you pick
      something up and chill?
    </p>
  );
}

export default HistoryPage;
