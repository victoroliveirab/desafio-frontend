import { MemoryRouter } from 'react-router-dom';
import { RenderResult, fireEvent, render } from 'test-utils';
import cardInfo from '__mocks__/card';
import Card from '.';

let component: RenderResult;

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('<Card />', () => {
  beforeEach(() => {
    component = render(
      <MemoryRouter>
        <Card data={cardInfo.data} />
      </MemoryRouter>
    );
  });
  test('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
  test('should navigate when thumbnail clicked', () => {
    const thumbWrapper = component.getByTestId('thumb-wrapper');

    fireEvent.click(thumbWrapper);

    expect(mockNavigate).toBeCalledWith(cardInfo.data.url, {
      state: cardInfo.data,
    });
  });
});
