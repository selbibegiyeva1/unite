import { useMemo, useState, useEffect } from "react";
import { useDirectorMainInfo } from "../../../hooks/director/home/useDirectorMainInfo";
import { useTranslation } from "../../../hooks/useTranslation";
import { type PeriodValue } from "../transactions/Day";
import Copied from "../../operator/transactions/Copied";

const periodToApi = (p: PeriodValue): string => (p === "all" ? "all_time" : p);

interface TopClientsProps {
    period?: PeriodValue;
}

function TopClients({ period = "all" }: TopClientsProps) {
    const { t, lang } = useTranslation();
    const [showCopied, setShowCopied] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const { data, isLoading, error } = useDirectorMainInfo({
        category: "ALL",
        period: periodToApi(period),
    });

    const locale = lang === "ru" ? "ru-RU" : "tk-TM";

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

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setShowCopied(true);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const rows = useMemo(() => {
        if (!data?.top_5_clients) return [];

        const middleTruncate = (value: string, max = 36) => {
            if (value.length <= max) return value;
            const keep = max - 3;
            const left = Math.ceil(keep / 2);
            const right = keep - left;
            return value.slice(0, left) + "..." + value.slice(-right);
        };

        return data.top_5_clients.map((item) => ({
            email: item.email,
            displayEmail: middleTruncate(item.email),
            revenue:
                new Intl.NumberFormat(locale, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format(item.revenue_tmt) + " TMT",
        }));
    }, [data?.top_5_clients, locale]);

    if (error) {
        return (
            <div className="p-6.5 border border-[#00000026] rounded-[16px] min-h-[280px] flex items-center justify-center">
                <p className="text-[#ED2428] text-[14px]">{t.homeDirector.loadError}</p>
            </div>
        );
    }

    return (
        <div className="p-6.5 border border-[#00000026] rounded-[16px] h-full flex flex-col">
            <p className="font-medium text-[18px] mb-4">{t.homeDirector.topClientsTitle}</p>

            <div>
                {/* Header */}
                <div className="flex items-center bg-[#F5F7FB] px-2.5 py-[8.5px] text-[15px] rounded-[4px] font-bold text-[#000000]">
                    <div className="flex-1 min-w-0">{t.homeDirector.topClientsEmail}</div>
                    <div className="w-[120px] max-sm:w-[100px] text-right shrink-0">
                        {t.homeDirector.topClientsTurnover}
                    </div>
                </div>

                {/* Body */}
                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center text-[14px] h-[280px] text-[#00000099] px-4 py-4">
                        {t.homeDirector.loading}
                    </div>
                ) : rows.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-[14px] h-[280px] text-[#00000099] px-4 py-4">
                        {t.directorTransactions.empty}
                    </div>
                ) : (
                    <div className="mt-4 flex flex-col gap-3.5">
                        {rows.map((row, index) => (
                            <div
                                key={row.email + index}
                                className="flex items-center justify-between gap-5 font-medium py-[11.5px] text-[14px] text-[#000000]"
                            >
                                <div
                                    onClick={() => handleCopy(row.email)}
                                    className="text-[#2D85EA] cursor-pointer truncate underline"
                                    title={t.transactions.copyHint || row.email}
                                >
                                    {row.displayEmail ?? row.email}
                                </div>
                                <div className="text-right whitespace-nowrap shrink-0">
                                    {row.revenue}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showCopied && <Copied isVisible={isVisible} />}
        </div>
    );
}

export default TopClients;
