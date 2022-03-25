import { MemoryRouter } from 'react-router-dom';
import { render } from 'test-utils';
import cardInfo from '__mocks__/card';
import Card from '.';

describe('<Card />', () => {
  test('Should match snapshot', () => {
    const component = render(
      <MemoryRouter>
        <Card data={cardInfo.data} />
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });
});
