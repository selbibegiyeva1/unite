import { useState, useEffect } from "react"
import { usePurchaseHistory } from "../../../hooks/director/transactions/usePurchaseHistory"
import { type PeriodValue } from "./Day"
import { useTranslation } from "../../../hooks/useTranslation"

interface PurchaseRow {
    id: string
    date: string
    email: string
    transactionId: string
    operator: string
    category: string
    description: string
    status: string
    statusText: string
    amount: string
}

interface DirectorPurchaseProps {
    period?: PeriodValue
}

function DirectorPurchase({ period: periodValue = "all" }: DirectorPurchaseProps) {
    const { t } = useTranslation()
    const [currentPage, setCurrentPage] = useState(1)
    const [isRefreshing, setIsRefreshing] = useState(false)

    // Map period value: "all" -> "all_time", others pass through
    const period = periodValue === "all" ? "all_time" : periodValue

    const { data, isLoading, error, refetch } = usePurchaseHistory({
        page: currentPage,
        perPage: 50,
        period,
    })

    // Reset to page 1 when period changes
    useEffect(() => {
        setCurrentPage(1)
    }, [periodValue])

    const handleRefresh = async () => {
        setIsRefreshing(true)
        await refetch()
        setIsRefreshing(false)
    }

    // Transform API data to component format
    const rows: PurchaseRow[] = (data?.orders_history || [])
        .filter((item) => {
            // Filter out invalid items - must have datetime and transaction_id
            if (!item || !item.datetime || !item.transaction_id) {
                return false
            }
            const date = new Date(item.datetime)
            return !isNaN(date.getTime())
        })
        .map((item) => {
            // Format date from ISO string to readable format
            const date = new Date(item.datetime)
            const formattedDate = isNaN(date.getTime())
                ? 'Invalid Date'
                : date.toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                })

            // Format amounts with TMT currency
            const formatAmount = (value: number) =>
                new Intl.NumberFormat('ru-RU').format(value) + ' TMT'

            // Map status to readable format using translations
            const getStatusText = (status: string) => {
                const statusMap = t.directorTransactions.statuses as Record<string, string>
                return statusMap[status] ?? status
            }

            return {
                id: item.transaction_id,
                date: formattedDate,
                email: item.email || '',
                transactionId: item.transaction_id,
                operator: item.operator || '',
                category: item.category || '',
                description: item.description || '',
                status: item.status,
                statusText: getStatusText(item.status),
                amount: formatAmount(item.amount),
            }
        })

    // Get status icon based on status value
    const getStatusIcon = (status: string) => {
        if (status === 'PAID' || status === 'SUCCESS') {
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3333 3.2796C12.3292 2.78059 11.1974 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 9.71833 17.4845 9.44028 17.4542 9.16667M17.5 4.16667L10 11.6667L7.5 9.16667" stroke="#14C57A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        } else if (status === 'CANCELED' || status === 'FAILED' || status === 'ERROR') {
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 7.50003L7.5 12.5M12.5 12.5L7.5 7.50003M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#ED2428" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        } else if (status === 'PENDING' || status === 'PAYMENT_PENDING') {
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.4896 8.33325H14.1693M17.4896 8.33325V4.99992M17.4896 8.33325L14.7166 5.28587C12.1132 2.68238 7.89205 2.68238 5.28856 5.28587C2.68506 7.88937 2.68506 12.1105 5.28856 14.714C7.89205 17.3175 12.1132 17.3175 14.7166 14.714C15.3699 14.0607 15.8592 13.3057 16.1846 12.4999M10.0026 7.49992V10.8333L12.5026 12.0833" stroke="#FFB01D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        } else if (status === 'CREATED') {
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5Z" stroke="#2D85EA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 6.66667V10M10 13.3333H10.0083" stroke="#2D85EA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        }
        return null
    }

    return (
        <div className="p-5 border border-[#00000026] rounded-[16px] h-[665px] flex flex-col">
            <div className="flex items-center justify-between">
                <p className="font-medium text-[18px]">{t.directorTransactions.purchaseTitle}</p>

                <button
                    onClick={handleRefresh}
                    disabled={isRefreshing || isLoading}
                    className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-300 hover:scale-105"
                    title={t.directorTransactions.refreshTitle}
                    type="button"
                >
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width="40" height="40" rx="8" fill="#2D85EA" />
                        <path
                            d="M12 18H15.7535M12 18V14M12 18L15.1347 14.3431C18.0778 11.219 22.8495 11.219 25.7927 14.3431C28.7358 17.4673 28.7358 22.5327 25.7927 25.6569C22.8495 28.781 18.0778 28.781 15.1347 25.6569C14.3963 24.873 13.8431 23.9669 13.4752 23"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>

            <div
                className="flex-1 min-h-0 overflow-y-auto overflow-x-auto transactions-table-scroll mt-3.5"
            >
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-[#00000099]">{t.directorTransactions.loading}</p>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-[#ED2428]">{t.directorTransactions.loadError}</p>
                    </div>
                ) : rows.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-[#00000099]">{t.directorTransactions.empty}</p>
                    </div>
                ) : (
                    <table className="w-full max-1lg:min-w-[1200px]">
                        <thead>
                            <tr className="grid grid-cols-8 gap-[30px] text-center px-[13px] py-[8px] mb-4 bg-[#F5F5F9] rounded-[6px] text-[#00000099] text-[12px]">
                                <td className="text-left">{t.directorTransactions.date}</td>
                                <td>{t.directorTransactions.email}</td>
                                <td>{t.directorTransactions.transactionId}</td>
                                <td>{t.directorTransactions.operator}</td>
                                <td>{t.directorTransactions.category}</td>
                                <td>{t.directorTransactions.description}</td>
                                <td>{t.directorTransactions.status}</td>
                                <td className="text-right">{t.directorTransactions.amount}</td>
                            </tr>
                        </thead>
                        <tbody className="text-[#00000099] text-[12px]">
                            {rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="grid grid-cols-8 gap-[30px] items-center text-center px-2.5 py-3 mb-[12px] rounded-[6px] text-black"
                                >
                                    <td className="text-left">{row.date}</td>
                                    <td className="truncate min-w-0 text-[#2D85EA] cursor-default">
                                        {row.email}
                                    </td>
                                    <td className="truncate min-w-0 text-[#2D85EA] cursor-default">
                                        {row.transactionId}
                                    </td>
                                    <td>{row.operator}</td>
                                    <td>{row.category}</td>
                                    <td className="min-w-0">{row.description}</td>
                                    <td>
                                        <div className="flex items-center gap-2 justify-center">
                                            {getStatusIcon(row.status)}
                                            <span>{row.statusText}</span>
                                        </div>
                                    </td>
                                    <td className="text-right font-medium">{row.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {data && data.total_pages > 1 && (
                <div className='flex items-center gap-2 justify-center mt-6'>
                    {Array.from({ length: data.total_pages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-9 h-9 cursor-pointer rounded-[6px] text-[13px] ${currentPage === page
                                ? 'bg-[#2D85EA] text-white'
                                : 'border border-[#00000026]'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DirectorPurchase
