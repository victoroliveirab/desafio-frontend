import { useParams } from 'react-router-dom';
import { useViewport } from 'shared/hooks';

export default function VideoPage() {
  const { videoId } = useParams();
  const { width } = useViewport();
  return (
    <div>
      <iframe
        id="ytplayer"
        title={videoId}
        width={width - 40}
        height={0.75 * (width - 40)}
        src={`https://www.youtube.com/embed/${videoId}`}
        allowFullScreen
        style={{ border: 0 }}
      />
    </div>
  );
}
