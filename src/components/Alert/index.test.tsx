import { waitFor } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import { UxDispatchContext, UxStateContext } from 'shared/providers/ux';
import type { IUxState } from 'shared/providers/ux/types';
import { RenderResult, fireEvent, render } from 'test-utils';
import Alert from '.';

const mockInitialState: IUxState = {
  alert: { message: 'Test message', type: 'success', show: true },
  loading: false,
};

const mockCloseAlert = jest.fn();
let component: RenderResult;

jest.mock('shared/hooks/useUx', () => () => ({
  state: mockInitialState,
  actions: {
    clearAlert: mockCloseAlert,
  },
}));

describe('<Alert />', () => {
  beforeEach(() => {
    component = render(
      <UxStateContext.Provider value={mockInitialState}>
        <UxDispatchContext.Provider value={jest.fn()}>
          <Alert timeout={50} />
        </UxDispatchContext.Provider>
      </UxStateContext.Provider>
    );
  });
  test('should show alert', () => {
    expect(component.queryByText('Test message')).not.toBeNull();
  });
  test('should be able to close alert', () => {
    const closeIcon = component.getByTestId('CloseIcon');

    fireEvent.click(closeIcon);

    expect(mockCloseAlert).toBeCalled();
  });
  test('should be able to wait alert to be closed', async () => {
    await waitFor(() => {
      expect(mockCloseAlert).toBeCalled();
    });
  });
});
