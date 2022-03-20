export type GoogleLoginResponse = {
  clientId: string;
  credential: string;
  select_by: string;
};

export type GoogleNotification = {
  g: 'display' | 'dismissed' | 'skipped';
  h?: boolean; // if g is display, represents shown
  i: string; // if g is dismissed, represensts action
  j: string; // if g is display and h is false, represents reason
  l: string; // if g is skipped, represents reason
};

export type OpenIdResponse = {
  access_token: string;
  authuser: string;
  expires_in: number;
  hd: string;
  prompt: string;
  scope: string;
  token_type: string;
};
