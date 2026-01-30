import { useState } from 'react';
import Transactions from '../../components/operator/transactions/Transactions';
import Filter from '../../components/operator/transactions/Filter';
import { useTranslation } from '../../hooks/useTranslation';

function TransactionsOperator() {
    const { t } = useTranslation();
    document.title = t.transactions.page.pageTitle;
    
    const [filters, setFilters] = useState<{ period: string; category: string; transactionId: string }>({
        period: 'all_time',
        category: 'ALL',
        transactionId: '',
    });

    const handleFiltersChange = (newFilters: { period: string; category: string; transactionId: string }) => {
        setFilters(newFilters);
    };

    return (
        <div className='px-20 max-1lg:px-15 max-md:px-8 max-sm:px-4 mt-[28px] pb-[100px]'>
            <div className='max-w-[1680px] m-auto'>
                <p className='text-[36px] font-bold mb-5'>{t.transactions.page.heading}</p>
                <div className='mb-5'>
                    <Filter onFiltersChange={handleFiltersChange} />
                </div>
                <Transactions 
                    period={filters.period} 
                    category={filters.category !== 'ALL' ? filters.category : undefined}
                    transactionId={filters.transactionId || undefined} 
                />
            </div>
        </div>
    )
}

export default TransactionsOperator