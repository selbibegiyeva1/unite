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

export interface ProductGroupForm {
  group: string;
  short_info: string;
  image: string;
  icon: string;
  category: string;
  forms: {
    voucher_fields: Array<{
      name: string;
      type: string;
      label: string;
      options?: Array<{ name: string; value: string }>;
    }>;
  };
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
};

export default authService;
