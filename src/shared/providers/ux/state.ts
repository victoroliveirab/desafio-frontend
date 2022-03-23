import type { IUxState } from './types';

const initialState: IUxState = {
  alert: {
    type: 'success',
    message: '',
    show: false,
  },
  loading: false,
};

export default initialState;
