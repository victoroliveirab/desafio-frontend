import { ReactNode } from 'react';

export type IUxAlertTypes = 'error' | 'info' | 'success' | 'warning';

export interface IUxAlert {
  type: IUxAlertTypes;
  message: string;
  show?: boolean;
}

export interface IUxState {
  loading: boolean;
  alert: IUxAlert;
}

export interface IUxProvider {
  children: ReactNode;
}
