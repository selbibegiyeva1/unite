import { useQuery } from '@tanstack/react-query';
import authService, { type UserInfoResponse } from '../../services/authService';

export function useUserInfo() {
    return useQuery<UserInfoResponse>({
        queryKey: ['user', 'info'],
        queryFn: authService.getUserInfo,
        staleTime: 5 * 60 * 1000,
    });
}

