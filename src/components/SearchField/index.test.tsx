import { RenderResult, fireEvent, render } from 'test-utils';
import SearchField from '.';

const mockOptions = [
  {
    id: '1',
    label: 'label1',
  },
  {
    id: '2',
    label: 'label2',
  },
];

describe('<SearchField />', () => {
  describe('snapshots', () => {
    test('should match snapshot', () => {
      const component = render(<SearchField callback={jest.fn()} />);
      expect(component).toMatchSnapshot();
    });
    test('should render SearchField with options', () => {
      const component = render(
        <SearchField callback={jest.fn()} options={mockOptions} />
      );
      expect(component).toMatchSnapshot();
    });
  });
  describe('autocomplete', () => {
    let component: RenderResult;
    beforeEach(() => {
      component = render(
        <SearchField autocomplete callback={jest.fn()} options={mockOptions} />
      );
    });
    test('should open autocomplete options when input clicked', () => {
      const textField = component.getByTestId('search-field');

      fireEvent.click(textField);

      expect(component.queryByTestId('search-suggestions')).not.toBeNull();
    });
    test('should open autocomplete options when value typed', () => {
      const textField = component
        .getByTestId('search-field')
        .querySelector('input') as HTMLInputElement;

      fireEvent.change(textField, { target: { value: 'l' } });

      expect(component.queryByTestId('search-suggestions')).not.toBeNull();
    });
    test('should close autocomplete options once value is equal to an option', () => {
      const textField = component
        .getByTestId('search-field')
        .querySelector('input') as HTMLInputElement;

      fireEvent.change(textField, { target: { value: 'label1' } });

      expect(component.queryByTestId('search-suggestions')).toBeNull();
    });
    test('should open autocomplete when focused and with value', () => {
      const textField = component
        .getByTestId('search-field')
        .querySelector('input') as HTMLInputElement;
      expect(component.queryByTestId('search-suggestions')).toBeNull();

      fireEvent.focus(textField);

      expect(component.queryByTestId('search-suggestions')).not.toBeNull();
    });
    test('should set value when option is clicked', () => {
      const textField = component
        .getByTestId('search-field')
        .querySelector('input') as HTMLInputElement;
      fireEvent.click(textField);
      const label2 = component.getByText('label2');

      fireEvent.click(label2);

      expect(textField.value).toBe('label2');
    });
  });
});
