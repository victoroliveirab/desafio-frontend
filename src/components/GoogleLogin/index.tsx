import { useCallback, useEffect, useState } from 'react';
import { userFromJwt } from 'shared/helpers/jwt';
import { useAuth, useGoogleAuth } from 'shared/hooks';
import type { GoogleLoginResponse, GoogleNotification } from './types';

const clientId = process.env.REACT_APP_CLIENT_ID as string;

function shouldShowSignInButton(payload: GoogleNotification) {
  return (
    ['suppressed_by_user', 'opt_out_or_no_session'].includes(payload.j) ||
    ['user_cancel', 'tap_outside'].includes(payload.l)
  );
}

function GoogleLogin() {
  const {
    state: { user },
    actions: { setToken, setUser },
  } = useAuth();
  const [showSignInButton, setShowSignInButton] = useState(false);
  const { accounts } = useGoogleAuth();

  const handleSuccessLogin = useCallback(
    ({ credential }: GoogleLoginResponse) => {
      setToken(`Bearer ${credential}`);
      const userDetails = userFromJwt(credential);
      setUser({
        givenName: userDetails.given_name,
        picture: userDetails.picture,
        email: userDetails.email,
      });
    },
    [setToken, setUser]
  );

  const handleNotification = (payload: GoogleNotification) => {
    if (shouldShowSignInButton(payload)) setShowSignInButton(true);
  };

  useEffect(() => {
    window.ptLoginCallback = handleSuccessLogin;
    window.ptNotifyCallback = handleNotification;
  }, [handleSuccessLogin]);

  useEffect(() => {
    if (showSignInButton) {
      accounts?.id.renderButton(
        document.getElementById('g_id_signin') as HTMLElement,
        {
          theme: 'outline',
          size: 'large',
        }
      );
    }
  }, [accounts?.id, showSignInButton]);

  return (
    <>
      {!user && (
        <>
          {!showSignInButton ? (
            <div
              id="g_id_onload"
              data-client_id={clientId}
              data-context="signin"
              data-ux_mode="popup"
              data-callback="ptLoginCallback"
              data-auto_select="true"
              data-cancel_on_tap_outside="false"
              data-moment_callback="ptNotifyCallback"
            />
          ) : (
            <div
              id="g_id_signin"
              style={{
                marginTop: -3,
              }}
            />
          )}
        </>
      )}
    </>
  );
}

export default GoogleLogin;
