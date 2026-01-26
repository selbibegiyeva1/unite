import { useState, useCallback } from 'react';

export type PeriodValue = 'all_time' | 'day' | 'week' | 'month' | 'year';

export interface TransactionFilters {
  period: PeriodValue;
  transactionId: string;
}

export interface UseTransactionFiltersReturn {
  filters: TransactionFilters;
  setPeriod: (period: PeriodValue) => void;
  setTransactionId: (transactionId: string) => void;
  handleSearch: () => void;
  handleReset: () => void;
  appliedFilters: TransactionFilters;
}

const DEFAULT_FILTERS: TransactionFilters = {
  period: 'all_time',
  transactionId: '',
};

export function useTransactionFilters(): UseTransactionFiltersReturn {
  const [filters, setFilters] = useState<TransactionFilters>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<TransactionFilters>(DEFAULT_FILTERS);

  const setPeriod = useCallback((period: PeriodValue) => {
    setFilters((prev) => ({ ...prev, period }));
  }, []);

  const setTransactionId = useCallback((transactionId: string) => {
    setFilters((prev) => ({ ...prev, transactionId }));
  }, []);

  const handleSearch = useCallback(() => {
    setAppliedFilters(filters);
  }, [filters]);

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
  }, []);

  return {
    filters,
    setPeriod,
    setTransactionId,
    handleSearch,
    handleReset,
    appliedFilters,
  };
}
