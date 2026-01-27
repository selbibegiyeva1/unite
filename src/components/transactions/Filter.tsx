import { useTransactionFilters } from '../../hooks/operator/transactions/useTransactionFilters';

interface FilterProps {
    onFiltersChange: (filters: { period: string; category: string; transactionId: string }) => void;
}

function Filter({ onFiltersChange }: FilterProps) {
    const { filters, setPeriod, setCategory, setTransactionId, handleSearch, handleReset } = useTransactionFilters();

    const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const period = e.target.value as 'all_time' | 'day' | 'week' | 'month' | 'year';
        setPeriod(period);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const category = e.target.value as 'ALL' | 'ESIM' | 'VOUCHER' | 'STEAM' | 'TOPUP';
        setCategory(category);
    };

    const handleTransactionIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTransactionId(e.target.value);
    };

    const onSearch = () => {
        handleSearch();
        onFiltersChange({
            period: filters.period,
            category: filters.category,
            transactionId: filters.transactionId,
        });
    };

    const onReset = () => {
        handleReset();
        onFiltersChange({
            period: 'all_time',
            category: 'ALL',
            transactionId: '',
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <div className="mt-5 px-5 py-[32px] border border-[#00000026] rounded-[16px]">
            <p className="font-medium text-[18px] mb-5">Фильтры</p>
            <div className="flex items-end gap-4">
                <div>
                    <span className='font-medium text-[15px] pb-[8px] flex'>Дата</span>
                    <div className="relative">
                        <select
                            value={filters.period}
                            onChange={handlePeriodChange}
                            className="w-[320px] text-[14px] font-medium border border-[#00000026] rounded-[8px] px-4 py-[8.5px] outline-0 appearance-none cursor-pointer"
                        >
                            <option value="all_time">Всё</option>
                            <option value="day">День</option>
                            <option value="week">Неделя</option>
                            <option value="month">Месяц</option>
                            <option value="year">Год</option>
                        </select>
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.87883 5.29289L0.293044 1.70711C-0.336921 1.07714 0.109246 0 1.00015 0H8.17172C9.06263 0 9.50879 1.07714 8.87883 1.70711L5.29304 5.29289C4.90252 5.68342 4.26935 5.68342 3.87883 5.29289Z" fill="black" />
                        </svg>
                    </div>
                </div>
                <div>
                    <span className='font-medium text-[15px] pb-[8px] flex'>Категория</span>
                    <div className="relative">
                        <select
                            value={filters.category}
                            onChange={handleCategoryChange}
                            className="w-[320px] text-[14px] font-medium border border-[#00000026] rounded-[8px] px-4 py-[8.5px] outline-0 appearance-none cursor-pointer"
                        >
                            <option value="ALL">Всё</option>
                            <option value="ESIM">eSIM</option>
                            <option value="VOUCHER">Цифровые товары</option>
                            <option value="STEAM">Steam</option>
                            <option value="TOPUP">Пополнение</option>
                        </select>
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.87883 5.29289L0.293044 1.70711C-0.336921 1.07714 0.109246 0 1.00015 0H8.17172C9.06263 0 9.50879 1.07714 8.87883 1.70711L5.29304 5.29289C4.90252 5.68342 4.26935 5.68342 3.87883 5.29289Z" fill="black" />
                        </svg>
                    </div>
                </div>
                <div className="w-[240px] flex items-center gap-2 text-[14px] font-medium border border-[#00000026] rounded-[8px] px-4 py-[8.5px] outline-0 appearance-none cursor-pointer">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.1524 11.1572L15.8281 15.833M7.91146 12.4997C10.4428 12.4997 12.4948 10.4476 12.4948 7.91634C12.4948 5.38504 10.4428 3.33301 7.91146 3.33301C5.38015 3.33301 3.32812 5.38504 3.32812 7.91634C3.32812 10.4476 5.38015 12.4997 7.91146 12.4997Z" stroke="black" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <input
                        type="text"
                        value={filters.transactionId}
                        onChange={handleTransactionIdChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Введите ID транзакции"
                        className="w-full cursor-pointer outline-0 text-[14px] font-medium"
                    />
                </div>
                <button
                    onClick={onSearch}
                    className="bg-[#2D85EA] text-white text-[15px] font-medium rounded-[8px] px-3 py-[8.75px] w-[120px] cursor-pointer"
                >
                    Поиск
                </button>
                <button
                    onClick={onReset}
                    className="text-[15px] font-medium text-[#2D85EA] h-[40px] cursor-pointer"
                >
                    Сбросить
                </button>
            </div>
        </div>
    )
}

export default Filter