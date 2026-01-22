import { useEffect, useRef } from 'react';
import authService from '../../../services/authService';

interface UseSteamRateOptions {
  amount: string;
  enabled: boolean;
  onSuccess: (topupAmountUsd: number) => void;
}

export function useSteamRate({ amount, enabled, onSuccess }: UseSteamRateOptions) {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Don't call API if disabled, amount is empty, or not a valid number
    if (!enabled || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return;
    }

    // Debounce the API call by 500ms
    timeoutRef.current = setTimeout(async () => {
      try {
        const amountTmt = parseFloat(amount);
        const response = await authService.getSteamRate(amountTmt);
        onSuccess(response.topup_amount_usd);
      } catch (error) {
        console.error('Failed to fetch Steam rate:', error);
        // Optionally handle error (e.g., show error message)
      }
    }, 500);

    // Cleanup timeout on unmount or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [amount, enabled, onSuccess]);
}
