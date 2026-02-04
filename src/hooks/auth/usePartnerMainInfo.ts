import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import authService, { type PartnerMainInfoResponse } from '../../services/authService';

export function usePartnerMainInfo(): UseQueryResult<PartnerMainInfoResponse, Error> {
    return useQuery({
        queryKey: ['partner', 'main-info'],
        queryFn: () => authService.getPartnerMainInfo(),
        staleTime: 30 * 1000,
    });
}

