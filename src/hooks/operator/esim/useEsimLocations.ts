import { useQuery } from '@tanstack/react-query';
import authService, {
  type EsimCountry,
  type EsimRegion,
  type EsimTariffsResponse,
} from '../../../services/authService';

export type EsimTab = 'countries' | 'regions';

type EsimLocation = EsimCountry | EsimRegion;

async function fetchEsimLocations(tab: EsimTab): Promise<EsimLocation[]> {
  if (tab === 'countries') {
    return authService.getEsimCountries();
  }

  return authService.getEsimRegions();
}

async function fetchEsimTariffs(
  tab: EsimTab,
  codeForApi: string
): Promise<EsimTariffsResponse> {
  return authService.getEsimTariffs(tab, codeForApi);
}

export function useEsimLocations(tab: EsimTab) {
  return useQuery({
    queryKey: ['esim', tab],
    queryFn: () => fetchEsimLocations(tab),
  });
}

/**
 * Hook to load eSIM tariffs for either a specific country or a region.
 * For countries we pass the `country_code` from the countries endpoint,
 * for regions we pass the `region_name.en` as `country_code` (API requirement).
 *
 * The backend may sometimes return a single object or an array of objects,
 * so the consumer should handle both shapes.
 */
export function useEsimTariffs(tab: EsimTab, codeForApi: string | null) {
  return useQuery<EsimTariffsResponse | EsimTariffsResponse[]>({
    queryKey: ['esim', 'tariffs', tab, codeForApi],
    queryFn: () => {
      if (!codeForApi) {
        // This should never be called when `enabled` is false,
        // but TypeScript requires a non-null value in the queryFn.
        throw new Error('Country code for tariffs is not provided');
      }

      return fetchEsimTariffs(tab, codeForApi);
    },
    enabled: !!codeForApi,
  });
}

