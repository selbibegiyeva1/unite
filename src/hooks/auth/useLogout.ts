import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export function useLogout() {
    const { logout } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await logout();
        } catch (err: any) {
            const message = err?.response?.data?.message ?? 'Ошибка при выходе из аккаунта';
            setError(message);
            // optional: rethrow if caller wants to handle
        } finally {
            setIsLoading(false);
        }
    };

    const clearError = () => setError(null);

    return {
        isLoading,
        error,
        handleLogout,
        clearError,
    };
}

