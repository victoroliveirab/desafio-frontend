import { createContext, Dispatch, useReducer } from 'react';
import Alert from 'components/Alert';
import initialState from './state';
import reducer from './reducer';
import type { IUxState, IUxProvider } from './types';
import Action from './actions';

const UxStateContext = createContext<IUxState>(initialState);
UxStateContext.displayName = 'UxStateContext';

const UxDispatchContext = createContext<Dispatch<Action>>(() => undefined);
UxDispatchContext.displayName = 'UxDispatchContext';

function UxProvider({ children }: IUxProvider) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UxStateContext.Provider value={state}>
      <UxDispatchContext.Provider value={dispatch}>
        <Alert />
        {children}
      </UxDispatchContext.Provider>
    </UxStateContext.Provider>
  );
}

export { UxStateContext, UxDispatchContext };

export default UxProvider;
