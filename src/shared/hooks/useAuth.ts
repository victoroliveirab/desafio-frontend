import { useCallback, useContext, useMemo } from 'react';
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

  const actions = useMemo(
    () => ({
      setToken,
      setUser,
    }),
    [setToken, setUser]
  );

  return { state, actions };
}
