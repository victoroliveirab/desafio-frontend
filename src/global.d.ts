export interface IGoogle {
  accounts: any;
}

// TODO: add google object properties
declare global {
  interface Window {
    google: IGoogle;
  }
}
