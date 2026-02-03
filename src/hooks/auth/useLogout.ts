import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';

export function useLogout() {
    const { logout } = useAuth();
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await logout();
            // Clear cached user/partner data so next login shows correct user in Navbar/Sidebar
            queryClient.removeQueries({ queryKey: ['user', 'info'] });
            queryClient.removeQueries({ queryKey: ['partner', 'main-info'] });
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

