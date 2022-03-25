import { render } from 'test-utils';
import SearchField from '.';

describe('<SearchField />', () => {
  test('Should match snapshot', () => {
    const component = render(<SearchField callback={jest.fn()} />);
    expect(component).toMatchSnapshot();
  });
});
