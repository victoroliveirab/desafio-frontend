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
