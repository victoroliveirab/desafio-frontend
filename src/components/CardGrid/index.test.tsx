import { render } from 'test-utils';
import CardGrid from '.';

describe('<CardGrid />', () => {
  test('Should match snapshot', () => {
    const component = render(<CardGrid data={[]} />);
    expect(component).toMatchSnapshot();
  });
});
