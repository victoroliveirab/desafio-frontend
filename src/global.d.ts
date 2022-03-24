import type {
  GoogleLoginResponse,
  GoogleNotification,
  InitTokenClientParams,
} from 'components/GoogleLogin/types';

export interface IGoogle {
  accounts: {
    id: {
      initialize(options: {
        client_id: string;
        callback(payload: GoogleLoginResponse): void;
      }): void;
      prompt(): void;
      renderButton(
        element: HTMLElement,
        options?: {
          theme?: string;
          size?: string;
        }
      );
    };
    oauth2: {
      initTokenClient(params: InitTokenClientParams): {
        requestAccessToken: () => void;
      };
    };
  };
}
declare global {
  interface Window {
    google: IGoogle;
    ptLoginCallback: (payload: GoogleLoginResponse) => void;
    ptNotifyCallback: (payload: GoogleNotification) => void;
  }
}
