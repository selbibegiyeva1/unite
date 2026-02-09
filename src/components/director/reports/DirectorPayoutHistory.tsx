import { useState, useEffect } from "react";
import { usePayoutHistory } from "../../../hooks/director/reports/usePayoutHistory";
import { type PeriodValue } from "../transactions/Day";
import { useTranslation } from "../../../hooks/useTranslation";

interface PayoutRow {
    id: string;
    date: string;
    transactionId: string;
    method: string;
    description: string;
    amount: string;
}

interface DirectorPayoutHistoryProps {
    period?: PeriodValue;
}

function DirectorPayoutHistory({ period: periodValue = "all" }: DirectorPayoutHistoryProps) {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const period = periodValue === "all" ? "all_time" : periodValue;

    const { data, isLoading, error, refetch } = usePayoutHistory({
        page: currentPage,
        perPage: 50,
        period,
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [periodValue]);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await refetch();
        setIsRefreshing(false);
    };

    const rows: PayoutRow[] = (data?.reward_history || [])
        .filter((item) => {
            if (!item || !item.datetime || !item.transaction_id) {
                return false;
            }
            const date = new Date(item.datetime);
            return !isNaN(date.getTime());
        })
        .map((item) => {
            const date = new Date(item.datetime);
            const formattedDate = isNaN(date.getTime())
                ? "Invalid Date"
                : date.toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                  });

            const formatAmount = (value: number) =>
                new Intl.NumberFormat("ru-RU").format(value) + " TMT";

            return {
                id: item.transaction_id,
                date: formattedDate,
                transactionId: item.transaction_id,
                method: item.type,
                description: item.description,
                amount: formatAmount(item.amount),
            };
        });

    return (
        <div className="p-5 border border-[#00000026] rounded-[16px] h-[665px] flex flex-col">
            <div className="flex items-center justify-between">
                <p className="font-medium text-[18px]">{t.directorReports.payoutTitle}</p>

                <button
                    onClick={handleRefresh}
                    disabled={isRefreshing || isLoading}
                    className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-300 hover:scale-105"
                    title={t.directorReports.refreshTitle}
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
                        <p className="text-[#00000099]">{t.directorReports.loading}</p>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-[#ED2428]">{t.directorReports.loadError}</p>
                    </div>
                ) : rows.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-[#00000099]">{t.directorReports.empty}</p>
                    </div>
                ) : (
                    <table className="w-full max-1lg:min-w-[1000px]">
                        <thead>
                            <tr className="grid grid-cols-5 gap-[30px] text-center px-[13px] py-[8px] mb-4 bg-[#F5F5F9] rounded-[6px] text-[#00000099] text-[12px]">
                                <td className="text-left">{t.directorReports.date}</td>
                                <td>{t.directorReports.transactionId}</td>
                                <td>{t.directorReports.method}</td>
                                <td>{t.directorReports.description}</td>
                                <td className="text-right">{t.directorReports.amount}</td>
                            </tr>
                        </thead>
                        <tbody className="text-[#00000099] text-[12px]">
                            {rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="grid grid-cols-5 gap-[30px] items-center text-center px-2.5 py-3 mb-[12px] rounded-[6px] text-black"
                                >
                                    <td className="text-left">{row.date}</td>
                                    <td className="truncate min-w-0 text-[#2D85EA] cursor-default">
                                        {row.transactionId}
                                    </td>
                                    <td>{row.method}</td>
                                    <td className="min-w-0">{row.description}</td>
                                    <td className="text-right font-medium">{row.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {data && data.total_pages > 1 && (
                <div className="flex items-center gap-2 justify-center mt-6">
                    {Array.from({ length: data.total_pages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-9 h-9 cursor-pointer rounded-[6px] text-[13px] ${
                                currentPage === page
                                    ? "bg-[#2D85EA] text-white"
                                    : "border border-[#00000026]"
                            }`}
                            type="button"
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DirectorPayoutHistory;

