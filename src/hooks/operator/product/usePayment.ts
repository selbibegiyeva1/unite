import { useState, useCallback } from 'react';
import authService, { type ProductGroupForm, type TopupPaymentRequest } from '../../../services/authService';

interface UsePaymentOptions {
  productForm: ProductGroupForm | undefined;
  activeTab: 'popolnenie' | 'voucher';
  formValues: Record<string, string>;
  selectedNominal: number | null;
}

export function usePayment({
  productForm,
  activeTab,
  formValues,
  selectedNominal,
}: UsePaymentOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPayment = useCallback(async (): Promise<boolean> => {
    if (!productForm) {
      setError('Product information is not available');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const isSteam = productForm.group === 'Steam';
      const isSteamPopolnenie = isSteam && activeTab === 'popolnenie';

      let response;

      if (isSteamPopolnenie) {
        // Steam payment: v1/products/steam/pay
        // Note: Steam Пополнение does NOT require a nominal
        const payload = {
          steam_username: formValues.login || '',
          amount_tmt: parseFloat(formValues.amount || '0'),
          email: formValues.email || '',
        };

        response = await authService.paySteam(payload);
      } else if (activeTab === 'voucher') {
        // Voucher payment: v1/products/voucher/buy
        if (!selectedNominal) {
          throw new Error('Nominal is required');
        }

        const payload = {
          product_id: selectedNominal,
          email: formValues.email || '',
        };

        response = await authService.buyVoucher(payload);
      } else {
        // Topup payment: v1/products/topup/buy
        if (!selectedNominal) {
          throw new Error('Nominal is required');
        }

        // Get dynamic fields from the form (excluding region and product_id)
        const fields = productForm.forms?.topup_fields || [];
        const formFields = fields.filter(
          field => field.name !== 'region' && field.name !== 'product_id'
        );

        // Build payload with dynamic fields
        const payload: TopupPaymentRequest = {
          product_id: selectedNominal,
        } as TopupPaymentRequest;

        // Add all dynamic form fields using their name as key
        formFields.forEach((field) => {
          const value = formValues[field.name];
          if (value) {
            payload[field.name] = value;
          }
        });

        response = await authService.buyTopup(payload);
      }

      // Redirect to the voucher URL
      if (response.voucher) {
        window.location.href = response.voucher;
        return true;
      } else {
        throw new Error('No redirect URL received from server');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Payment failed';
      setError(errorMessage);
      console.error('Payment error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [productForm, activeTab, formValues, selectedNominal]);

  return {
    processPayment,
    isLoading,
    error,
  };
}
