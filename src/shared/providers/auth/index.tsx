import { createContext, Dispatch, useReducer } from 'react';
import GoogleLogin from 'components/GoogleLogin';
import initialState from './state';
import reducer from './reducer';
import type { IAuthProvider, IAuthState } from './types';
import Action from './actions';

const AuthStateContext = createContext<IAuthState>(initialState);
AuthStateContext.displayName = 'AuthStateContext';

const AuthDispatchContext = createContext<Dispatch<Action>>(() => undefined);
AuthDispatchContext.displayName = 'AuthDispatchContext';

function AuthProvider({ children }: IAuthProvider) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        <GoogleLogin />
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

export { AuthStateContext, AuthDispatchContext };

export default AuthProvider;
