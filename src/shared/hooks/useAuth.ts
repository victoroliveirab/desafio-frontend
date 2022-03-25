import { useCallback, useContext, useMemo } from 'react';
import { clearItem } from 'shared/helpers/local-storage';
import { AuthStateContext, AuthDispatchContext } from 'shared/providers/auth';
import { ActionsTypes } from 'shared/providers/auth/actions';
import type { IAuthUser } from 'shared/providers/auth/types';

export function useAuthState() {
  const state = useContext(AuthStateContext);
  return state;
}

export default function useAuth() {
  const state = useAuthState();
  const dispatch = useContext(AuthDispatchContext);

  const setToken = useCallback(
    (payload: string) => {
      dispatch({
        type: ActionsTypes.SET_TOKEN,
        payload,
      });
    },
    [dispatch]
  );

  const setUser = useCallback(
    (payload: IAuthUser) => {
      dispatch({
        type: ActionsTypes.SET_USER,
        payload,
      });
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    clearItem('google-user');
    dispatch({
      type: ActionsTypes.CLEAR,
    });
  }, [dispatch]);

  const actions = useMemo(
    () => ({
      logout,
      setToken,
      setUser,
    }),
    [logout, setToken, setUser]
  );

  return { state, actions };
}
