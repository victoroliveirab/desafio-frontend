import type {
  GoogleLoginResponse,
  GoogleNotification,
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
  };
}
declare global {
  interface Window {
    google: IGoogle;
    ptLoginCallback: (payload: GoogleLoginResponse) => void;
    ptNotifyCallback: (payload: GoogleNotification) => void;
  }
}
