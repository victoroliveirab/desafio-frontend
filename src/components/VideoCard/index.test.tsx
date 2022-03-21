import { fireEvent, render, RenderResult } from 'test-utils';
import videoInfo from '__mocks__/youtube-video';
import VideoCard from '.';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockUseNavigate,
}));

let component: RenderResult;

describe('<VideoCard />', () => {
  beforeEach(() => {
    component = render(<VideoCard videoInfo={videoInfo} />);
  });
  test('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
  test('should navigate when thumbnail is clicked', () => {
    const thumbnailWrapper = component.getByTestId('thumbnail-wrapper');

    fireEvent.click(thumbnailWrapper);

    expect(mockUseNavigate).toBeCalled();
  });
});
