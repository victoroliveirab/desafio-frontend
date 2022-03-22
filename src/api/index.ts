import axios from 'axios';
import channelsService from './channels';
import openIdService from './openid';
import videosService from './videos';

const api = axios.create();

export const channelsServices = channelsService(api);
export const openIdServices = openIdService(api);
export const videosServices = videosService(api);

export default api;
