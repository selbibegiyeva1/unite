import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const API_BASE = (import.meta as any).env?.VITE_API_BASE ?? "";

export const api = axios.create({
    baseURL: API_BASE, // e.g. "https://api.example.com"
    withCredentials: true, // IMPORTANT for refresh cookie
    headers: { "Content-Type": "application/json" },
});

// token getter/setter injected by AuthContext (to avoid circular imports)
let getAccessToken: (() => string | null) | null = null;
let doRefresh: (() => Promise<string | null>) | null = null;

export function attachAuthHandlers(handlers: {
    getToken: () => string | null;
    refresh: () => Promise<string | null>;
}) {
    getAccessToken = handlers.getToken;
    doRefresh = handlers.refresh;
}

// Add Authorization header
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getAccessToken?.();
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Refresh on 401 (single-flight)
let refreshingPromise: Promise<string | null> | null = null;

api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        const status = error.response?.status;
        const original = error.config as any;

        if (status !== 401 || original?._retry) {
            throw error;
        }

        original._retry = true;

        if (!doRefresh) throw error;

        try {
            if (!refreshingPromise) {
                refreshingPromise = doRefresh().finally(() => {
                    refreshingPromise = null;
                });
            }

            const newToken = await refreshingPromise;
            if (!newToken) throw error;

            original.headers = original.headers ?? {};
            original.headers.Authorization = `Bearer ${newToken}`;

            return api(original);
        } catch {
            throw error;
        }
    }
);
