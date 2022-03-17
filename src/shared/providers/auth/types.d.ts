import { ReactNode } from 'react';

export interface IAuthUser {
  givenName: string;
  picture: string;
  email: string;
}

export interface IAuthState {
  user?: IAuthUser;
  token?: string;
}

export interface IAuthProvider {
  children: ReactNode;
}
