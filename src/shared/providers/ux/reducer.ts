import Action, { ActionsTypes } from './actions';
import type { IUxState } from './types';

export default function reducer(state: IUxState, action: Action) {
  switch (action.type) {
    case ActionsTypes.SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case ActionsTypes.SHOW_ALERT: {
      return {
        ...state,
        alert: {
          ...action.payload,
          show: true,
        },
      };
    }
    case ActionsTypes.HIDE_ALERT: {
      return {
        ...state,
        alert: {
          ...state.alert,
          show: false,
        },
      };
    }
    default: {
      return state;
    }
  }
}
