import { useQuery } from '@tanstack/react-query';
import authService, { type OrdersQueryParams, type OrdersResponse } from '../../../services/authService';

export interface UseTransactionsOptions {
  page?: number;
  perPage?: number;
  category?: string;
  period?: string;
  transactionId?: string;
}

export function useTransactions(options: UseTransactionsOptions = {}) {
  const { page = 1, perPage = 8, category, period, transactionId } = options;

  return useQuery<OrdersResponse>({
    queryKey: ['partner', 'orders', { page, perPage, category, period, transactionId }],
    queryFn: () => {
      const params: OrdersQueryParams = {
        page,
        per_page: perPage,
      };

      if (category) params.category = category;
      if (period) params.period = period;
      if (transactionId) params.transaction_id = transactionId;

      return authService.getOrders(params);
    },
    staleTime: 30 * 1000, // Cache for 30 seconds
  });
}
