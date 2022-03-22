import Button from '@mui/material/Button';
import api, { openIdServices } from 'api';
import { useAuth, useGoogleAuth } from 'shared/hooks';
import type { IAuthUser } from 'shared/providers/auth/types';
import { scopes } from './constants';
import type { OpenIdResponse } from './types';

const clientId = process.env.REACT_APP_CLIENT_ID as string;

function GoogleLogin() {
  const {
    state: { user },
    actions: { setUser },
  } = useAuth();
  const { accounts } = useGoogleAuth();

  const requestAccessToken = () => {
    if (accounts?.oauth2) {
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
