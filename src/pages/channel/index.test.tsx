import { render } from 'test-utils';
import mockData from '__mocks__/json/get-by-channel-id.json';
import ChannelPage from '.';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    channelId: 'UCKxn56z2qU-LJi3KRgMiaUg',
  }),
}));

describe('<ChannelPage />', () => {
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });
  test('should match snapshot', () => {
    jest.mock('api', () => ({
      __esModule: true,
      videosService: () => ({
        getByChannelId: () => mockData,
      }),
    }));
    const component = render(<ChannelPage />);
    expect(component).toMatchSnapshot();
  });
});
