import { MemoryRouter } from 'react-router-dom';
import { render } from 'test-utils';
import youtubeVideo from '__mocks__/youtube-video';
import videosStorage from 'lib/history-storage/videos';
import HistoryPage from '.';

describe('<HistoryPage />', () => {
  test('should match snapshot', () => {
    const component = render(<HistoryPage />);
    expect(component).toMatchSnapshot();
  });
  test('should display videos grid when history available', () => {
    videosStorage.putNewEntry(youtubeVideo);
    const component = render(
      <MemoryRouter>
        <HistoryPage />
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });
});
