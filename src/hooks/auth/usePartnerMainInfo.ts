import { useQuery } from '@tanstack/react-query';
import authService, { type PartnerMainInfoResponse } from '../../services/authService';

export function usePartnerMainInfo() {
    return useQuery<PartnerMainInfoResponse>({
        queryKey: ['partner', 'main-info'],
        queryFn: authService.getPartnerMainInfo,
        staleTime: 30 * 1000,
    });
}

