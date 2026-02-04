import { useQuery } from '@tanstack/react-query';
import authService, { type PartnerMainInfoQueryParams, type PartnerMainInfoResponse } from '../../../services/authService';

export interface UseDirectorMainInfoOptions {
  category?: string;
  period?: string;
}

export function useDirectorMainInfo(options: UseDirectorMainInfoOptions = {}) {
  const { category, period } = options;

  return useQuery<PartnerMainInfoResponse>({
    queryKey: ['partner', 'director-main-info', { category, period }],
    queryFn: () => {
      const params: PartnerMainInfoQueryParams = {};

      // Always send category when provided (API requires category=ALL for dashboard)
      if (category) {
        params.category = category;
      }

      // Only send period if it's not 'all_time' or empty
      if (period && period !== 'all_time') {
        params.period = period;
      }

      return authService.getPartnerMainInfo(params);
    },
    staleTime: 30 * 1000, // Cache for 30 seconds
  });
}
