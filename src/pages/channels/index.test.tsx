import { render } from 'test-utils';
import mockData from '__mocks__/json/get-user-subscriptions.json';
import ChannelsPage from '.';

describe('<ChannelsPage />', () => {
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
      channelsServices: () => ({
        getUserSubscriptions: () => mockData,
      }),
    }));
    const component = render(<ChannelsPage />);
    expect(component).toMatchSnapshot();
  });
});
