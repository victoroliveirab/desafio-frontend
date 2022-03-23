import type { IUxAlertTypes } from './types';

/* eslint-disable no-shadow */
export enum ActionsTypes {
  HIDE_ALERT,
  SET_LOADING,
  SHOW_ALERT,
}

type Action =
  | {
      type: ActionsTypes.SET_LOADING;
      payload: boolean;
    }
  | {
      type: ActionsTypes.SHOW_ALERT;
      payload: {
        type: IUxAlertTypes;
        message: string;
      };
    }
  | {
      type: ActionsTypes.HIDE_ALERT;
    };

export default Action;
