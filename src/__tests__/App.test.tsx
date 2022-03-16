import { render } from './utils';
import App from 'App';

describe('<App />', () => {
  test('should match snapshot', () => {
    const component = render(<App />);

    expect(component).toMatchSnapshot();
  });
});
