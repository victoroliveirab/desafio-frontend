import { MemoryRouter } from 'react-router-dom';
import { render } from 'test-utils';
import cardInfo from '__mocks__/card';
import CardGrid from '.';

describe('<CardGrid />', () => {
  test('Should match snapshot', () => {
    const component = render(
      <MemoryRouter>
        <CardGrid data={[cardInfo]} />
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });
});
