import Action, { ActionsTypes } from './actions';
import type { IAuthState } from './types';

export default function reducer(state: IAuthState, action: Action) {
  switch (action.type) {
    case ActionsTypes.SET_TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case ActionsTypes.SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case ActionsTypes.CLEAR: {
      return {
        user: undefined,
        token: undefined,
      };
    }
    default: {
      return state;
    }
  }
}
