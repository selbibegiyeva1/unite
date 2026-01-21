const API_HOST = import.meta.env.VITE_API_BASE;

export const API_BASE_URL = `${API_HOST}/v1`;

export default {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/partner/login',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
    },
    USER: {
      INFO: '/user/info',
    },
  },
};
