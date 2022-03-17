import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { useAuthState } from 'shared/hooks';
import ChannelsPage from './channels';
import HistoryPage from './history';
import HomePage from './home';
import UploadPage from './upload';
import VideosPage from './videos';

function PrivatePage({ children }: { children: JSX.Element }) {
  const { user } = useAuthState();
  const location = useLocation();
  if (!user) return <Navigate to="/" state={{ from: location }} replace />;
  return children;
}

function Pages() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/channels" element={<ChannelsPage />} />
        <Route
          path="/history"
          element={
            <PrivatePage>
              <HistoryPage />
            </PrivatePage>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivatePage>
              <UploadPage />
            </PrivatePage>
          }
        />
        <Route path="/videos" element={<VideosPage />} />
      </Routes>
    </main>
  );
}

export default Pages;
