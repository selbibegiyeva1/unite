import { useEffect, useRef, useState } from 'react';
import { useTransactionFilters } from '../../../hooks/operator/transactions/useTransactionFilters';
import { useTranslation } from '../../../hooks/useTranslation';

type PeriodValue = 'all_time' | 'day' | 'week' | 'month' | 'year';
type CategoryValue = 'ALL' | 'ESIM' | 'VOUCHER' | 'STEAM' | 'TOPUP';

interface FilterProps {
    onFiltersChange: (filters: { period: string; category: string; transactionId: string }) => void;
}

const ChevronIcon = () => (
    <svg className="shrink-0" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.87883 5.29289L0.293044 1.70711C-0.336921 1.07714 0.109246 0 1.00015 0H8.17172C9.06263 0 9.50879 1.07714 8.87883 1.70711L5.29304 5.29289C4.90252 5.68342 4.26935 5.68342 3.87883 5.29289Z" fill="black" />
    </svg>
);

function Filter({ onFiltersChange }: FilterProps) {
    const { filters, setPeriod, setCategory, setTransactionId, handleSearch, handleReset } = useTransactionFilters();
    const { t } = useTranslation();
    const [dateOpen, setDateOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const dateRef = useRef<HTMLDivElement | null>(null);
    const categoryRef = useRef<HTMLDivElement | null>(null);

    const periodOptions: { value: PeriodValue; label: string }[] = [
        { value: 'all_time', label: t.transactions.filters.dateAll },
        { value: 'day', label: t.transactions.filters.dateDay },
        { value: 'week', label: t.transactions.filters.dateWeek },
        { value: 'month', label: t.transactions.filters.dateMonth },
        { value: 'year', label: t.transactions.filters.dateYear },
    ];
    const categoryOptions: { value: CategoryValue; label: string }[] = [
        { value: 'ALL', label: t.transactions.filters.categoryAll },
        { value: 'ESIM', label: t.transactions.filters.categoryEsim },
        { value: 'VOUCHER', label: t.transactions.filters.categoryVoucher },
        { value: 'STEAM', label: t.transactions.filters.categorySteam },
        { value: 'TOPUP', label: t.transactions.filters.categoryTopup },
    ];

    useEffect(() => {
        if (!dateOpen) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setDateOpen(false); };
        const onClick = (e: MouseEvent) => { if (dateRef.current && !dateRef.current.contains(e.target as Node)) setDateOpen(false); };
        document.addEventListener('keydown', onKey);
        document.addEventListener('mousedown', onClick);
        return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick); };
    }, [dateOpen]);

    useEffect(() => {
        if (!categoryOpen) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setCategoryOpen(false); };
        const onClick = (e: MouseEvent) => { if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) setCategoryOpen(false); };
        document.addEventListener('keydown', onKey);
        document.addEventListener('mousedown', onClick);
        return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick); };
    }, [categoryOpen]);

    const dateLabel = periodOptions.find((o) => o.value === filters.period)?.label ?? t.transactions.filters.dateAll;
    const categoryLabel = categoryOptions.find((o) => o.value === filters.category)?.label ?? t.transactions.filters.categoryAll;

    const handlePeriodSelect = (period: PeriodValue) => {
        setPeriod(period);
        setDateOpen(false);
    };
    const handleCategorySelect = (category: CategoryValue) => {
        setCategory(category);
        setCategoryOpen(false);
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
            <p className="font-medium text-[18px] mb-5">{t.transactions.filters.title}</p>
            <div className="flex items-end gap-4 max-0lg:flex-col max-0lg:items-start">
                <div className="flex items-end gap-4 max-1md:grid max-1md:grid-cols-1 max-1md:w-full">
                    <div className="max-1md:w-full">
                        <span className='font-medium text-[15px] pb-[8px] flex'>{t.transactions.filters.dateLabel}</span>
                        <div ref={dateRef} className="relative w-[320px] max-2lg:w-[236px] max-1lg:w-[146px] max-1md:w-full">
                            <button
                                type="button"
                                onClick={() => setDateOpen((prev) => !prev)}
                                className="flex items-center justify-between w-full text-[14px] font-medium border border-[#00000026] rounded-[8px] px-4 py-[8.5px] outline-0 cursor-pointer hover:bg-[#0000000d] transition-colors text-left"
                            >
                                <span>{dateLabel}</span>
                                <ChevronIcon />
                            </button>
                            <div
                                className={`absolute left-0 right-0 mt-2 rounded-[10px] border border-[#0000001A] bg-white shadow-sm z-50 transition-all duration-200 ${
                                    dateOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
                                }`}
                            >
                                <div className="max-h-[240px] overflow-y-auto py-[13px] px-2.5">
                                    {periodOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => handlePeriodSelect(option.value)}
                                            className={`w-full text-left px-[10px] py-[8.5px] rounded-[8px] text-[12px] font-medium cursor-pointer transition-colors ${
                                                option.value === filters.period ? 'bg-[#EEF3FF]' : 'bg-white'
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="max-1md:w-full">
                        <span className='font-medium text-[15px] pb-[8px] flex'>{t.transactions.filters.categoryLabel}</span>
                        <div ref={categoryRef} className="relative w-[320px] max-2lg:w-[236px] max-1lg:w-[146px] max-1md:w-full">
                            <button
                                type="button"
                                onClick={() => setCategoryOpen((prev) => !prev)}
                                className="flex items-center justify-between w-full text-[14px] font-medium border border-[#00000026] rounded-[8px] px-4 py-[8.5px] outline-0 cursor-pointer hover:bg-[#0000000d] transition-colors text-left"
                            >
                                <span>{categoryLabel}</span>
                                <ChevronIcon />
                            </button>
                            <div
                                className={`absolute left-0 right-0 mt-2 rounded-[10px] border border-[#0000001A] bg-white shadow-sm z-50 transition-all duration-200 ${
                                    categoryOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
                                }`}
                            >
                                <div className="max-h-[240px] overflow-y-auto py-[13px] px-2.5">
                                    {categoryOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => handleCategorySelect(option.value)}
                                            className={`w-full text-left px-[10px] py-[8.5px] rounded-[8px] text-[12px] font-medium cursor-pointer transition-colors ${
                                                option.value === filters.category ? 'bg-[#EEF3FF]' : 'bg-white'
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[240px] max-2lg:w-[236px] max-1lg:w-[146px] max-1md:w-full flex items-center gap-2 text-[14px] font-medium border border-[#00000026] rounded-[8px] px-4 py-[8.5px] outline-0 appearance-none cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.1524 11.1572L15.8281 15.833M7.91146 12.4997C10.4428 12.4997 12.4948 10.4476 12.4948 7.91634C12.4948 5.38504 10.4428 3.33301 7.91146 3.33301C5.38015 3.33301 3.32812 5.38504 3.32812 7.91634C3.32812 10.4476 5.38015 12.4997 7.91146 12.4997Z" stroke="black" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <input
                            type="text"
                            value={filters.transactionId}
                            onChange={handleTransactionIdChange}
                            onKeyPress={handleKeyPress}
                            placeholder={t.transactions.filters.idPlaceholder}
                            className="w-full cursor-pointer outline-0 text-[14px] font-medium"
                        />
                    </div>
                </div>
                <div className="flex items-end gap-4">
                    <button
                        onClick={onSearch}
                        className="bg-[#2D85EA] text-white text-[15px] font-medium rounded-[8px] px-3 py-[8.75px] w-[120px] cursor-pointer"
                    >
                        {t.transactions.filters.search}
                    </button>
                    <button
                        onClick={onReset}
                        className="text-[15px] font-medium text-[#2D85EA] h-[40px] cursor-pointer"
                    >
                        {t.transactions.filters.reset}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Filter