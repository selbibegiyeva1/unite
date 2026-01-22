import { useQuery } from '@tanstack/react-query';
import authService, { type SteamInfoResponse } from '../../../services/authService';

export function useSteamInfo() {
  return useQuery<SteamInfoResponse>({
    queryKey: ['partner', 'steam', 'info'],
    queryFn: authService.getSteamInfo,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}
