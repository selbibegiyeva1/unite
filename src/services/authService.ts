import axios, { AxiosError } from 'axios';
import apiConfig from '../config/api';

const apiClient = axios.create({
  baseURL: apiConfig.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
}

export interface RefreshResponse {
  message: string;
  accessToken: string;
}

export interface UserInfo {
  id: string;
  username: string;
  email: string;
  full_name: string;
  role: string;
}

export interface UserInfoResponse {
  user: UserInfo;
  company: {
    id: string;
    display_name: string;
    billing_mode: string;
    logo: string;
  };
}

export interface PartnerMainInfoResponse {
  balance: number;
  currency: string;
}

export interface ProductGroup {
  group_name: string;
  category: string;
  icon_url: string;
}

export interface ProductIdOption {
  value: number;
  product: string;
  price: number;
  region: string;
  name_prefix: string;
  type: 'VOUCHER' | 'TOPUP';
}

export interface ProductGroupForm {
  group: string;
  short_info: string;
  image: string;
  icon: string;
  category: string;
  forms?: {
    voucher_fields?: Array<{
      name: string;
      type: string;
      label: string;
      options?: Array<{ name: string; value: string } | ProductIdOption>;
    }>;
    topup_fields?: Array<{
      name: string;
      type: string;
      label: string;
      options?: Array<{ name: string; value: string } | ProductIdOption>;
    }>;
  };
}

export interface SteamRateResponse {
  topup_amount_usd: number;
}

export interface SteamInfoResponse {
  steam_min_amount_tmt: number;
  steam_max_amount_tmt: number;
}

export interface PaymentResponse {
  status: boolean;
  voucher: string;
  comment: string;
}

export interface SteamPaymentRequest {
  steam_username: string;
  amount_tmt: number;
  email: string;
}

export interface VoucherPaymentRequest {
  product_id: number;
  email: string;
}

export interface TopupPaymentRequest {
  product_id: number;
  [key: string]: string | number; // Dynamic fields
}

export interface EsimPaymentRequest {
  tariff_name: string;
  client_email: string;
  client_phone: string;
}

export interface OrderHistoryItem {
  datetime: string;
  email: string;
  transaction_id: string;
  operator: string;
  category: string;
  description: string;
  status: string;
  amount: number;
  instruction_url: string;
}

export interface OrdersResponse {
  total_pages: number;
  orders_history: OrderHistoryItem[];
}

export interface OrdersQueryParams {
  page?: number;
  per_page?: number;
  category?: string;
  period?: string;
  transaction_id?: string;
}

export interface TopupHistoryItem {
  datetime: string;
  transaction_id: string;
  balance_before: number;
  balance_after: number;
  amount: number;
}

export interface TopupHistoryResponse {
  total_pages: number;
  topup_history: TopupHistoryItem[];
}

export interface TopupHistoryQueryParams {
  page?: number;
  per_page?: number;
  period?: string;
}

export interface EsimCountry {
  country_code: string;
  country_name: {
    en: string;
    ru: string;
    tm: string;
  };
  tariff_count: number;
  flag_url: string;
}

export interface EsimRegion {
  region_name: {
    en: string;
    ru: string;
    tm: string;
  };
  tariff_count: number;
  region_url: string;
}

export interface EsimTariff {
  name: string;
  price_tmt: number;
  days: number;
  traffic: number;
  flag_url: string;
  operator: string;
  is_unlimited: boolean;
  operator_icon: string;
}

export interface EsimTariffsResponse {
  country_name: {
    en: string | null;
    ru: string | null;
    tm: string | null;
  } | null;
  country_code: string | string[];
  flag_url: string | null;
  // NOTE: backend uses a typo: "tarrifs" instead of "tariffs"
  // Keep the same key here so Axios maps the response correctly.
  tarrifs: EsimTariff[];
}

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // If error is 403 and we haven't already tried to refresh
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const response = await axios.post<RefreshResponse>(
          `${apiConfig.BASE_URL}${apiConfig.ENDPOINTS.AUTH.REFRESH}`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('accessToken');
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      apiConfig.ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  },

  async logout(): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(
      apiConfig.ENDPOINTS.AUTH.LOGOUT
    );
    return response.data;
  },

  async refreshToken(): Promise<RefreshResponse> {
    const response = await axios.post<RefreshResponse>(
      `${apiConfig.BASE_URL}${apiConfig.ENDPOINTS.AUTH.REFRESH}`,
      {},
      { withCredentials: true }
    );
    return response.data;
  },

  async getUserInfo(): Promise<UserInfoResponse> {
    const response = await apiClient.get<UserInfoResponse>(
      apiConfig.ENDPOINTS.USER.INFO
    );
    return response.data;
  },

  async getPartnerMainInfo(): Promise<PartnerMainInfoResponse> {
    const response = await apiClient.get<PartnerMainInfoResponse>(
      apiConfig.ENDPOINTS.PARTNER.MAIN_INFO
    );
    return response.data;
  },

  async getProductGroups(): Promise<ProductGroup[]> {
    const response = await apiClient.get<ProductGroup[]>(
      apiConfig.ENDPOINTS.PARTNER.PRODUCT_GROUPS
    );
    return response.data;
  },

  async getProductGroupForm(groupName: string): Promise<ProductGroupForm> {
    const response = await apiClient.get<ProductGroupForm>(
      apiConfig.ENDPOINTS.PARTNER.PRODUCT_GROUP_FORM,
      {
        params: { group: groupName },
      }
    );
    return response.data;
  },

  async getSteamRate(amountTmt: number): Promise<SteamRateResponse> {
    const response = await apiClient.get<SteamRateResponse>(
      '/partner/steam/rate',
      {
        params: { amount_tmt: amountTmt },
      }
    );
    return response.data;
  },

  async getSteamInfo(): Promise<SteamInfoResponse> {
    const response = await apiClient.get<SteamInfoResponse>(
      '/partner/steam/info'
    );
    return response.data;
  },

  async paySteam(payload: SteamPaymentRequest): Promise<PaymentResponse> {
    const response = await apiClient.post<PaymentResponse>(
      '/products/steam/pay',
      payload
    );
    return response.data;
  },

  async buyVoucher(payload: VoucherPaymentRequest): Promise<PaymentResponse> {
    const response = await apiClient.post<PaymentResponse>(
      '/products/voucher/buy',
      payload
    );
    return response.data;
  },

  async buyTopup(payload: TopupPaymentRequest): Promise<PaymentResponse> {
    const response = await apiClient.post<PaymentResponse>(
      '/products/topup/buy',
      payload
    );
    return response.data;
  },

  async buyEsim(payload: EsimPaymentRequest): Promise<PaymentResponse> {
    const response = await apiClient.post<PaymentResponse>(
      '/products/esim/buy',
      payload
    );
    return response.data;
  },

  async getOrders(params?: OrdersQueryParams): Promise<OrdersResponse> {
    const response = await apiClient.get<OrdersResponse>(
      apiConfig.ENDPOINTS.PARTNER.ORDERS,
      {
        params,
      }
    );
    return response.data;
  },

  async getTopupHistory(params?: TopupHistoryQueryParams): Promise<TopupHistoryResponse> {
    const response = await apiClient.get<TopupHistoryResponse>(
      apiConfig.ENDPOINTS.PARTNER.TOPUP_HISTORY,
      {
        params,
      }
    );
    return response.data;
  },

  async getEsimCountries(): Promise<EsimCountry[]> {
    const response = await apiClient.get<EsimCountry[]>(
      apiConfig.ENDPOINTS.PARTNER.ESIM_COUNTRIES
    );
    return response.data;
  },

  async getEsimRegions(): Promise<EsimRegion[]> {
    const response = await apiClient.get<EsimRegion[]>(
      apiConfig.ENDPOINTS.PARTNER.ESIM_REGIONS
    );
    return response.data;
  },

  /**
   * Get tariffs either by country code or by region name.
   * - For countries: type = 'countries', code = country_code (e.g. 'HK')
   * - For regions:  type = 'regions',  code = region name in EN (e.g. 'africa')
   */
  async getEsimTariffs(
    type: 'countries' | 'regions',
    code: string
  ): Promise<EsimTariffsResponse> {
    const params =
      type === 'countries'
        ? { country_code: code }
        : { region: code };

    const response = await apiClient.get<EsimTariffsResponse>(
      apiConfig.ENDPOINTS.PARTNER.ESIM_COUNTRIES_TARIFFS,
      { params }
    );
    return response.data;
  },
};

export default authService;
