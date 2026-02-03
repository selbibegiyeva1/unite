import { useQuery } from '@tanstack/react-query';
import authService, { type TopupHistoryQueryParams, type TopupHistoryResponse } from '../../../services/authService';

export interface UseTopupHistoryOptions {
  page?: number;
  perPage?: number;
  period?: string;
}

export function useTopupHistory(options: UseTopupHistoryOptions = {}) {
  const { page = 1, perPage = 50, period } = options;

  return useQuery<TopupHistoryResponse>({
    queryKey: ['partner', 'topup-history', { page, perPage, period }],
    queryFn: () => {
      const params: TopupHistoryQueryParams = {
        page,
        per_page: perPage,
      };

      // Only send period if it's not 'all', 'all_time', or empty
      if (period && period !== 'all' && period !== 'all_time') {
        params.period = period;
      }

      return authService.getTopupHistory(params);
    },
    staleTime: 30 * 1000, // Cache for 30 seconds
  });
}
