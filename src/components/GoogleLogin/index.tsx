import { useEffect } from 'react';
import Button from '@mui/material/Button';
import api, { openIdServices } from 'api';
import { persistItem, retrieveItem } from 'shared/helpers/local-storage';
import { useAuth, useGoogleAuth } from 'shared/hooks';
import type { IAuthPersisted, IAuthUser } from 'shared/providers/auth/types';
import { getOneHourLaterDate } from 'shared/helpers/datetime';
import { scopes } from './constants';
import type { OpenIdResponse } from './types';

const clientId = process.env.REACT_APP_CLIENT_ID as string;

function GoogleLogin() {
  const {
    state: { user },
    actions: { setUser },
  } = useAuth();
  const { accounts } = useGoogleAuth();

  useEffect(() => {
    const alreadyLoggedUser: IAuthPersisted | undefined = retrieveItem(
      'google-user',
      undefined
    );
    console.log(alreadyLoggedUser);
    if (!alreadyLoggedUser) return;
    const {
      expiration,
      token,
      user: userDetails,
    } = alreadyLoggedUser as IAuthPersisted;
    console.log(new Date(expiration) <= new Date());
    console.log(userDetails);
    if (new Date(expiration) <= new Date() || !userDetails || !token) return;
    setUser(userDetails);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }, [setUser]);

  const requestAccessToken = () => {
    if (accounts?.oauth2) {
      const date = getOneHourLaterDate();
      const client = accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: scopes,
        callback: (response: OpenIdResponse) => {
          const { access_token: accessToken } = response;
          api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          openIdServices.getProfileInfo().then(({ data }) => {
            const userData: IAuthUser = {
              email: data.email,
              givenName: data.given_name,
              picture: data.picture,
            };
            setUser(userData);
            persistItem('google-user', {
              user: userData,
              token: accessToken,
              expiration: date.toISOString(),
            });
          });
        },
      });
      client.requestAccessToken();
    }
  };

  return user ? (
    <></>
  ) : (
    <Button variant="contained" onClick={requestAccessToken}>
      Login
    </Button>
  );
}

export default GoogleLogin;
