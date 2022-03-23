import { useCallback, useContext, useMemo } from 'react';
import { UxDispatchContext, UxStateContext } from 'shared/providers/ux';
import { ActionsTypes } from 'shared/providers/ux/actions';
import type { IUxAlert } from 'shared/providers/ux/types';

export function useUxState() {
  const state = useContext(UxStateContext);
  if (!state)
    throw new Error(
      'useUxState must be used within an UxStateContext provider'
    );

  return state;
}

export default function useUx() {
  const state = useUxState();
  const dispatch = useContext(UxDispatchContext);

  if (!dispatch)
    throw new Error('useUx must be used within an UxDispatchContext provider');

  const setAlert = useCallback(
    (payload: IUxAlert) => {
      dispatch({
        type: ActionsTypes.SHOW_ALERT,
        payload,
      });
    },
    [dispatch]
  );

  const clearAlert = useCallback(() => {
    dispatch({
      type: ActionsTypes.HIDE_ALERT,
    });
  }, [dispatch]);

  const actions = useMemo(
    () => ({
      clearAlert,
      setAlert,
    }),
    [clearAlert, setAlert]
  );

  return { state, actions };
}
