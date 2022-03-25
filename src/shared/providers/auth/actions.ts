/* eslint-disable no-shadow */
import type { IAuthUser } from './types';

export enum ActionsTypes {
  CLEAR,
  SET_TOKEN,
  SET_USER,
}

type Action =
  | {
      type: ActionsTypes.SET_TOKEN;
      payload: string;
    }
  | {
      type: ActionsTypes.SET_USER;
      payload: IAuthUser;
    }
  | {
      type: ActionsTypes.CLEAR;
    };

export default Action;
