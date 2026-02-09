import { useQuery } from '@tanstack/react-query';
import authService, {
  type PayoutHistoryQueryParams,
  type PayoutHistoryResponse,
} from '../../../services/authService';

export interface UsePayoutHistoryOptions {
  page?: number;
  perPage?: number;
  period?: string;
}

export function usePayoutHistory(options: UsePayoutHistoryOptions = {}) {
  const { page = 1, perPage = 50, period } = options;

  return useQuery<PayoutHistoryResponse>({
    queryKey: ['partner', 'payout-history', { page, perPage, period }],
    queryFn: () => {
      const params: PayoutHistoryQueryParams = {
        page,
        per_page: perPage,
      };

      // Only send period if it's not 'all', 'all_time' or empty
      if (period && period !== 'all' && period !== 'all_time') {
        params.period = period;
      }

      return authService.getPayoutHistory(params);
    },
    staleTime: 30 * 1000,
  });
}

