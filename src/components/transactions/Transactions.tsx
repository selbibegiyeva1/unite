import { useState, useEffect } from 'react';
import { useTransactions } from '../../hooks/operator/transactions/useTransactions';
import Copied from './Copied';

interface Transaction {
    id: string;
    date: string;
    email: string;
    transactionId: string;
    operator: string;
    category: string;
    description: string;
    amount: string;
    status: 'success' | 'pending' | 'failed';
    link: string;
}

interface TransactionsProps {
    period?: string;
    category?: string;
    transactionId?: string;
}

function Transactions({ period, category, transactionId }: TransactionsProps = {}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const { data, isLoading, error, refetch } = useTransactions({
        page: currentPage,
        perPage: 8,
        period,
        category,
        transactionId,
    });

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [period, category, transactionId]);

    // Handle copied notification visibility and auto-hide
    useEffect(() => {
        if (showCopied) {
            // Trigger fade-in animation
            setTimeout(() => setIsVisible(true), 10);
            
            // Hide after 3 seconds
            const timer = setTimeout(() => {
                setIsVisible(false);
                // Remove from DOM after fade-out
                setTimeout(() => setShowCopied(false), 300);
            }, 3000);
            
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [showCopied]);

    const handleCopyTransactionId = async (id: string) => {
        try {
            await navigator.clipboard.writeText(id);
            setShowCopied(true);
        } catch (err) {
            console.error('Failed to copy transaction ID:', err);
        }
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await refetch();
        setIsRefreshing(false);
    };

    // Transform API data to component format
    const transactions: Transaction[] = (data?.orders_history || [])
        .filter((order) => {
            // Filter out invalid/empty orders - must have datetime and transaction_id at minimum
            // Also validate that datetime is a valid date
            if (!order || !order.datetime || !order.transaction_id) {
                return false;
            }
            const date = new Date(order.datetime);
            return !isNaN(date.getTime());
        })
        .map((order) => {
            // Format date from ISO string to readable format
            const date = new Date(order.datetime);
            const formattedDate = isNaN(date.getTime())
                ? 'Invalid Date'
                : date.toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                  });

            // Map API status to component status
            let status: 'success' | 'pending' | 'failed' = 'pending';
            if (order.status === 'PAID' || order.status === 'SUCCESS') {
                status = 'success';
            } else if (order.status === 'FAILED' || order.status === 'ERROR') {
                status = 'failed';
            }

            // Format amount
            const formattedAmount = order.amount !== undefined && order.amount !== null
                ? `+${order.amount} ТМТ`
                : '+0 ТМТ';

            return {
                id: order.transaction_id,
                date: formattedDate,
                email: order.email || '',
                transactionId: order.transaction_id,
                operator: order.operator || '',
                category: order.category || '',
                description: order.description || '',
                amount: formattedAmount,
                status,
                link: order.instruction_url || '#',
            };
        });

    const getStatusIcon = (status: Transaction['status']) => {
        if (status === 'success') {
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3333 3.2796C12.3292 2.78059 11.1974 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 9.71833 17.4845 9.44028 17.4542 9.16667M17.5 4.16667L10 11.6667L7.5 9.16667" stroke="#14C57A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        } else if (status === 'pending') {
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.4896 8.33325H14.1693M17.4896 8.33325V4.99992M17.4896 8.33325L14.7166 5.28587C12.1132 2.68238 7.89205 2.68238 5.28856 5.28587C2.68506 7.88937 2.68506 12.1105 5.28856 14.714C7.89205 17.3175 12.1132 17.3175 14.7166 14.714C15.3699 14.0607 15.8592 13.3057 16.1846 12.4999M10.0026 7.49992V10.8333L12.5026 12.0833" stroke="#FFB01D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            );
        } else {
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 7.50003L7.5 12.5M12.5 12.5L7.5 7.50003M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#ED2428" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            );
        }
    };

    const getStatusText = (status: Transaction['status']) => {
        if (status === 'success') return 'Успешно';
        if (status === 'pending') return 'В обработке';
        return 'Ошибка';
    };

    return (
        <div>
            <div className="p-5 border border-[#00000026] rounded-[16px] h-[665px] flex flex-col">
                <div className="flex items-center justify-between">
                    <p className="font-medium text-[18px]">История транзакции</p>

                    {/* Refresh */}
                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing || isLoading}
                        className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-300 hover:scale-105"
                        title="Обновить"
                    >
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect width="40" height="40" rx="8" fill="#2D85EA" />
                            <path d="M12 18H15.7535M12 18V14M12 18L15.1347 14.3431C18.0778 11.219 22.8495 11.219 25.7927 14.3431C28.7358 17.4673 28.7358 22.5327 25.7927 25.6569C22.8495 28.781 18.0778 28.781 15.1347 25.6569C14.3963 24.873 13.8431 23.9669 13.4752 23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Header row (not scrollable) */}
                <div className="mt-3.5">
                    <table className="w-full">
                        <thead>
                            <tr className="grid grid-cols-9 gap-[30px] text-center px-[13px] py-[8px] mb-4 bg-[#F5F5F9] rounded-[6px] text-[#00000099] text-[12px]">
                                <td className="text-left">Дата</td>
                                <td>Почта</td>
                                <td>ID Транзакции</td>
                                <td>Оператор</td>
                                <td>Категория</td>
                                <td>Описание</td>
                                <td>Сумма</td>
                                <td>Статус</td>
                                <td className="text-right">Ссылка</td>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/* Scroll only table body */}
                <div className="flex-1 overflow-y-auto transactions-table-scroll">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-[#00000099]">Загрузка...</p>
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-[#ED2428]">Ошибка загрузки данных</p>
                        </div>
                    ) : transactions.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-[#00000099]">Нет транзакций</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <tbody className="text-[#00000099] text-[12px]">
                                {transactions.map((transaction) => (
                                    <tr key={transaction.id} className="transaction grid grid-cols-9 gap-[30px] items-center text-center px-2.5 py-3 mb-[20px] rounded-[6px] text-black">
                                        <td className="flex itemms-right">{transaction.date}</td>
                                        <td className="truncate min-w-0">{transaction.email}</td>
                                        <td
                                            onClick={() => handleCopyTransactionId(transaction.transactionId)}
                                            className="text-[#2D85EA] cursor-pointer truncate min-w-0 hover:underline"
                                            title="Нажмите, чтобы скопировать"
                                        >
                                            {transaction.transactionId}
                                        </td>
                                        <td>{transaction.operator}</td>
                                        <td>{transaction.category}</td>
                                        <td>{transaction.description}</td>
                                        <td>{transaction.amount}</td>
                                        <td className="flex items-center gap-2 justify-center">
                                            {getStatusIcon(transaction.status)}
                                            {getStatusText(transaction.status)}
                                        </td>
                                        <td className="text-right text-[#2D85EA]">
                                            <a href={transaction.link} target="_blank" rel="noopener noreferrer">QR/Инструкция</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {data && data.total_pages > 1 && (
                <div className='flex items-center gap-2 justify-center mt-6'>
                    {Array.from({ length: data.total_pages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-9 h-9 cursor-pointer rounded-[6px] text-[13px] ${
                                currentPage === page
                                    ? 'bg-[#2D85EA] text-white'
                                    : 'border border-[#00000026]'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}

            {showCopied && <Copied isVisible={isVisible} />}
        </div>
    )
}

export default Transactions