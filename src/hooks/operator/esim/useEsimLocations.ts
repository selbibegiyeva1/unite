import { useQuery } from '@tanstack/react-query';
import authService, { type EsimCountry, type EsimRegion } from '../../../services/authService';

export type EsimTab = 'countries' | 'regions';

type EsimLocation = EsimCountry | EsimRegion;

async function fetchEsimLocations(tab: EsimTab): Promise<EsimLocation[]> {
  if (tab === 'countries') {
    return authService.getEsimCountries();
  }

  return authService.getEsimRegions();
}

export function useEsimLocations(tab: EsimTab) {
  return useQuery({
    queryKey: ['esim', tab],
    queryFn: () => fetchEsimLocations(tab),
  });
}

