import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api, attachAuthHandlers } from "../api/axios";

type Role = "OPERATOR" | "DIRECTOR" | "ADMIN" | string;

export type User = {
    id: string;
    username: string;
    email?: string | null;
    full_name?: string | null;
    role: Role;
};

export type Company = {
    id: string;
    display_name: string;
    billing_mode?: string;
    logo?: string;
};

type UserInfoResponse = {
    user: User;
    company?: Company;
};

type AuthContextValue = {
    user: User | null;
    company: Company | null;
    accessToken: string | null;
    isLoading: boolean;
    error: string | null;

    signIn: (params: { username: string; password: string }) => Promise<void>;
    signOut: () => Promise<void>;
    refresh: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const ACCESS_TOKEN_KEY = "accessToken";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [company, setCompany] = useState<Company | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem(ACCESS_TOKEN_KEY));
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const setToken = useCallback((token: string | null) => {
        setAccessToken(token);
        if (token) localStorage.setItem(ACCESS_TOKEN_KEY, token);
        else localStorage.removeItem(ACCESS_TOKEN_KEY);
    }, []);

    const loadUserInfo = useCallback(async (token: string) => {
        const { data } = await api.get<UserInfoResponse>("/v1/user/info", {
            headers: { Authorization: `Bearer ${token}` },
        });

        setUser(data.user);
        setCompany(data.company ?? null);
    }, []);

    const refresh = useCallback(async (): Promise<string | null> => {
        try {
            const { data } = await api.post<{ message: string; accessToken: string }>("/v1/auth/refresh");
            setToken(data.accessToken);
            await loadUserInfo(data.accessToken);
            return data.accessToken;
        } catch {
            setToken(null);
            setUser(null);
            setCompany(null);
            return null;
        }
    }, [loadUserInfo, setToken]);

    // Inject handlers into axios instance (so interceptors can read token + refresh)
    useEffect(() => {
        attachAuthHandlers({
            getToken: () => accessToken,
            refresh,
        });
    }, [accessToken, refresh]);

    const signIn = useCallback(
        async ({ username, password }: { username: string; password: string }) => {
            setError(null);
            const { data } = await api.post<{ message: string; accessToken: string }>("/v1/auth/partner/login", {
                username,
                password,
            });

            setToken(data.accessToken);
            await loadUserInfo(data.accessToken);
        },
        [loadUserInfo, setToken]
    );

    const signOut = useCallback(async () => {
        setError(null);
        try {
            await api.post("/v1/auth/logout"); // Authorization header comes from interceptor
        } catch {
            // ignore API failure; we still clear local state
        } finally {
            setToken(null);
            setUser(null);
            setCompany(null);
        }
    }, [setToken]);

    // Bootstrap session:
    // - If token exists -> try user info
    // - Else try refresh (cookie)
    useEffect(() => {
        let cancelled = false;

        (async () => {
            setIsLoading(true);
            setError(null);

            try {
                if (accessToken) {
                    await loadUserInfo(accessToken);
                } else {
                    await refresh();
                }
            } catch (e: any) {
                if (!cancelled) {
                    setError(e?.message ?? null);
                    setToken(null);
                    setUser(null);
                    setCompany(null);
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            company,
            accessToken,
            isLoading,
            error,
            signIn,
            signOut,
            refresh,
        }),
        [user, company, accessToken, isLoading, error, signIn, signOut, refresh]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider />");
    return ctx;
}
