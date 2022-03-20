import { AxiosInstance } from 'axios';

const prefix = 'https://openidconnect.googleapis.com/v1';

export default function openIdService(api: AxiosInstance) {
  return {
    getProfileInfo: async () => api.get(`${prefix}/userinfo?openid,profile`),
  };
}
