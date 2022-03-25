import type { IAuthUser, IAuthPersisted } from 'shared/providers/auth/types';
import { retrieveItem } from '../local-storage';

export function getAlreadyLoggedUser(): {
  token: string;
  user: IAuthUser;
} | null {
  const alreadyLoggedUser = retrieveItem('google-user', undefined);
  if (!alreadyLoggedUser) return null;
  const currentUser = alreadyLoggedUser as IAuthPersisted;
  const { expiration, token, user } = currentUser;
  if (new Date(expiration) <= new Date() || !user || !token) return null;
  return {
    token,
    user,
  };
}
