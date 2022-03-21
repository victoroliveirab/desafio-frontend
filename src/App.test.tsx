import App from 'App';
import { render } from 'test-utils';

describe('<App />', () => {
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
    const component = render(<App />);

    expect(component).toMatchSnapshot();
  });
});
