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
    PARTNER: {
      MAIN_INFO: '/partner/info/main',
      PRODUCT_GROUPS: '/partner/catalog/product/groups',
      PRODUCT_GROUP_FORM: '/partner/catalog/product/group/form',
      ORDERS: '/partner/info/orders',
      ESIM_COUNTRIES: '/partner/esim/countries',
      ESIM_REGIONS: '/partner/esim/regions',
    },
  },
};
