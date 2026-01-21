import { useQuery } from '@tanstack/react-query';
import authService, { type ProductGroup } from '../../../services/authService';

export function useProductGroups() {
    return useQuery<ProductGroup[]>({
        queryKey: ['partner', 'catalog', 'product-groups'],
        queryFn: authService.getProductGroups,
        staleTime: 5 * 60 * 1000,
    });
}

