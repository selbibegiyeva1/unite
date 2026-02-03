import { useQuery } from '@tanstack/react-query';
import authService, { type OrdersQueryParams, type OrdersResponse } from '../../../services/authService';

export interface UsePurchaseHistoryOptions {
  page?: number;
  perPage?: number;
  period?: string;
}

export function usePurchaseHistory(options: UsePurchaseHistoryOptions = {}) {
  const { page = 1, perPage = 50, period } = options;

  return useQuery<OrdersResponse>({
    queryKey: ['partner', 'purchase-history', { page, perPage, period }],
    queryFn: () => {
      const params: OrdersQueryParams = {
        page,
        per_page: perPage,
      };

      // Only send period if it's not 'all' or 'all_time' or empty
      if (period && period !== 'all' && period !== 'all_time') {
        params.period = period;
      }

      return authService.getOrders(params);
    },
    staleTime: 30 * 1000, // Cache for 30 seconds
  });
}
