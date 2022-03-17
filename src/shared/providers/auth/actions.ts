/* eslint-disable no-shadow */
import type { IAuthUser } from './types';

export enum ActionsTypes {
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
    };

export default Action;
