import { useState } from 'react';
import Transactions from '../../components/transactions/Transactions';
import Filter from '../../components/transactions/Filter';

function TransactionsOperator() {
    document.title = 'Unite Shop - Транзакции';
    
    const [filters, setFilters] = useState<{ period: string; transactionId: string }>({
        period: 'all_time',
        transactionId: '',
    });

    const handleFiltersChange = (newFilters: { period: string; transactionId: string }) => {
        setFilters(newFilters);
    };

    return (
        <div className='px-6 mt-[28px] pb-[100px]'>
            <div className='w-[1680px] m-auto'>
                <p className='text-[36px] font-bold mb-5'>Транзакции</p>
                <div className='mb-5'>
                    <Filter onFiltersChange={handleFiltersChange} />
                </div>
                <Transactions period={filters.period} transactionId={filters.transactionId || undefined} />
            </div>
        </div>
    )
}

export default TransactionsOperator