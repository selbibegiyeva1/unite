import { useQuery } from '@tanstack/react-query';
import authService, {
  type CashbackHistoryQueryParams,
  type CashbackHistoryResponse,
} from '../../../services/authService';

export interface UseCashbackHistoryOptions {
  page?: number;
  perPage?: number;
  period?: string;
}

export function useCashbackHistory(options: UseCashbackHistoryOptions = {}) {
  const { page = 1, perPage = 50, period } = options;

  return useQuery<CashbackHistoryResponse>({
    queryKey: ['partner', 'cashback-history', { page, perPage, period }],
    queryFn: () => {
      const params: CashbackHistoryQueryParams = {
        page,
        per_page: perPage,
      };

      // Only send period if it's not 'all', 'all_time' or empty
      if (period && period !== 'all' && period !== 'all_time') {
        params.period = period;
      }

      return authService.getCashbackHistory(params);
    },
    staleTime: 30 * 1000,
  });
}

