import { useQuery } from '@tanstack/react-query';
import authService, { type ProductGroupForm } from '../../../services/authService';

export function useProductGroupForm(groupName: string | null) {
    return useQuery<ProductGroupForm>({
        queryKey: ['partner', 'catalog', 'product-group-form', groupName],
        queryFn: () => authService.getProductGroupForm(groupName!),
        enabled: !!groupName,
        staleTime: 5 * 60 * 1000,
    });
}
