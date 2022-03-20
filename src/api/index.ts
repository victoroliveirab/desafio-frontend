import axios from 'axios';
import openIdService from './openid';

const api = axios.create();

export const openIdServices = openIdService(api);

export default api;
