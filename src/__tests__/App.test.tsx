import App from 'App';
import { render } from './utils';

describe('<App />', () => {
  test('should match snapshot', () => {
    const component = render(<App />);

    expect(component).toMatchSnapshot();
  });
});
