import { useMemo } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDirectorMainInfo } from "../../../hooks/director/home/useDirectorMainInfo";
import { useTranslation } from "../../../hooks/useTranslation";
import { type PeriodValue } from "../transactions/Day";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const periodToApi = (p: PeriodValue): string => (p === "all" ? "all_time" : p);

const BAR_COLOR = "#0D9488";

function formatChartLabel(raw: string, locale: string): string {
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return d.toLocaleDateString(locale, { day: "numeric", month: "short" });
}

interface TransProps {
    period?: PeriodValue;
}

function Trans({ period = "all" }: TransProps) {
    const { t, lang } = useTranslation();
    const { data, isLoading, error } = useDirectorMainInfo({
        category: "ALL",
        period: periodToApi(period),
    });
    const locale = lang === "ru" ? "ru-RU" : "tk-TM";

    const chartData = useMemo(() => {
        const info = data?.dashboard_info ?? [];
        const labels = info.map((item) =>
            formatChartLabel(item.label ?? item.date ?? "", locale)
        );
        const values = info.map((item) => item.transaction_count);
        return {
            labels,
            datasets: [
                {
                    label: t.homeDirector.transactionCount,
                    data: values,
                    backgroundColor: BAR_COLOR,
                    borderColor: BAR_COLOR,
                    borderWidth: 0,
                },
            ],
        };
    }, [data, t.homeDirector.transactionCount, locale]);

    const options: ChartOptions<"bar"> = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const raw = data?.dashboard_info?.[ctx.dataIndex];
                            const dateStr = raw
                                ? formatChartLabel(raw.label ?? raw.date ?? "", locale)
                                : ctx.label;
                            const value = new Intl.NumberFormat(locale).format(
                                ctx.parsed.y ?? 0
                            );
                            return [`${dateStr}`, `${value} ${t.homeDirector.pieces}`];
                        },
                    },
                },
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        maxRotation: 0,
                        autoSkip: true,
                        font: { size: 11 },
                    },
                },
                y: {
                    beginAtZero: true,
                    grid: { color: "#00000014" },
                    ticks: {
                        callback: (value) => {
                            const v = Number(value);
                            if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
                            return String(value);
                        },
                    },
                },
            },
        }),
        [data, locale, t.homeDirector.pieces]
    );

    if (error) {
        return (
            <div className="p-6.5 border border-[#00000026] rounded-[16px] min-h-[280px] flex items-center justify-center">
                <p className="text-[#ED2428] text-[14px]">{t.homeDirector.loadError}</p>
            </div>
        );
    }

    return (
        <div className="p-6.5 border border-[#00000026] rounded-[16px]">
            <p className="font-medium text-[18px] mb-4">{t.homeDirector.transactionCount}</p>
            {isLoading ? (
                <div className="h-[280px] flex items-center justify-center text-[#00000099] text-[14px]">
                    {t.homeDirector.loading}
                </div>
            ) : (
                <div className="h-[317px]">
                    <Bar data={chartData} options={options} />
                </div>
            )}
        </div>
    );
}

export default Trans;
