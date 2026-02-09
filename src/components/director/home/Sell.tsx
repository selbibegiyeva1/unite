import { useMemo, useEffect, useState } from "react";
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

const BAR_COLOR = "#2D85EA";

function formatChartLabel(raw: string, locale: string): string {
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return d.toLocaleDateString(locale, { day: "numeric", month: "short" });
}

interface SellProps {
    period?: PeriodValue;
}

function Sell({ period = "all" }: SellProps) {
    const { t, lang } = useTranslation();
    const [mode, setMode] = useState<"revenue" | "transactions">("revenue");
    const { data, isLoading, error } = useDirectorMainInfo({
        category: "ALL",
        period: periodToApi(period),
    });
    const locale = lang === "ru" ? "ru-RU" : "tk-TM";

    // Ensure tooltip is hidden on mount
    useEffect(() => {
        const tooltipEl = document.getElementById('chart-tooltip-sell');
        if (tooltipEl) {
            tooltipEl.style.opacity = '0';
            tooltipEl.style.pointerEvents = 'none';
        }
    }, []);

    const chartData = useMemo(() => {
        const source =
            mode === "revenue"
                ? data?.revenue_bars ?? []
                : data?.transactions_bars ?? [];

        const labels = source.map((item) =>
            formatChartLabel(
                // Prefer explicit bucket label, fall back to start date
                (item as any).bucket_label ?? (item as any).bucket_start ?? "",
                locale
            )
        );

        const values = source.map((item) =>
            mode === "revenue"
                ? (item as any).revenue_tmt ?? 0
                : (item as any).orders_count ?? 0
        );
        return {
            labels,
            datasets: [
                {
                    label:
                        mode === "revenue"
                            ? t.homeDirector.salesRevenue
                            : t.homeDirector.transactionCount,
                    data: values,
                    backgroundColor: BAR_COLOR,
                    borderColor: BAR_COLOR,
                    borderWidth: 0,
                },
            ],
        };
    }, [data, t.homeDirector.salesRevenue, t.homeDirector.transactionCount, locale, mode]);

    const options: ChartOptions<"bar"> = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    enabled: false,
                    external: (context) => {
                        const tooltipModel = context.tooltip;
                        const tooltipEl = document.getElementById('chart-tooltip-sell');

                        if (!tooltipEl) return;

                        // Hide tooltip if not active or no data points
                        if (!tooltipModel ||
                            tooltipModel.opacity === 0 ||
                            !tooltipModel.dataPoints ||
                            tooltipModel.dataPoints.length === 0) {
                            tooltipEl.style.opacity = '0';
                            tooltipEl.style.pointerEvents = 'none';
                            return;
                        }

                        const index = tooltipModel.dataPoints[0]?.dataIndex ?? -1;
                        const raw =
                            mode === "revenue"
                                ? data?.revenue_bars?.[index]
                                : data?.transactions_bars?.[index];
                        if (!raw) {
                            tooltipEl.style.opacity = '0';
                            tooltipEl.style.pointerEvents = 'none';
                            return;
                        }

                        // Format full date for tooltip (e.g., "18 Окт 2025")
                        const dateStr =
                            (raw as any).bucket_label ?? (raw as any).bucket_start ?? "";
                        const d = new Date(dateStr);
                        const formattedDate = isNaN(d.getTime())
                            ? dateStr
                            : d.toLocaleDateString(locale, {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            });

                        const rawValue = tooltipModel.dataPoints[0]?.parsed.y ?? 0;
                        const value =
                            mode === "revenue"
                                ? new Intl.NumberFormat(locale, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                  }).format(rawValue)
                                : new Intl.NumberFormat(locale).format(rawValue);

                        // Set HTML content
                        tooltipEl.innerHTML = `
                            <div class="chart-tooltip-block">
                                <div class="chart-tooltip-date">${formattedDate}</div>
                                <div class="chart-tooltip-value">${
                                    mode === "revenue"
                                        ? `${value} TMT`
                                        : `${value} ${t.homeDirector.pieces}`
                                }</div>
                            </div>
                        `;

                        // Position tooltip relative to chart container
                        const position = context.chart.canvas.getBoundingClientRect();
                        const tooltipRect = tooltipEl.getBoundingClientRect();
                        // Shift right by 20px and lower by reducing the offset
                        const left = position.left + tooltipModel.caretX - tooltipRect.width / 2 + 150;
                        const top = position.top + tooltipModel.caretY - tooltipRect.height + 200;

                        tooltipEl.style.left = left + 'px';
                        tooltipEl.style.top = top + 'px';
                        tooltipEl.style.opacity = '1';
                        tooltipEl.style.pointerEvents = 'none';
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
        [data, locale, mode, t.homeDirector.pieces]
    );

    if (error) {
        return (
            <div className="p-6.5 border border-[#00000026] rounded-[16px] min-h-[280px] flex items-center justify-center">
                <p className="text-[#ED2428] text-[14px]">{t.homeDirector.loadError}</p>
            </div>
        );
    }

    return (
        <div className="w-full p-6.5 border border-[#00000026] rounded-[16px] max-lg:col-span-2 max-sm:col-span-1">
            <div className="flex items-center justify-between gap-4 mb-4">
                <p className="font-medium text-[18px]">
                    {mode === "revenue"
                        ? t.homeDirector.salesRevenue
                        : t.homeDirector.transactionCount}
                </p>

                {/* Interactive toggle switch controlling chart mode */}
                <button
                    type="button"
                    onClick={() =>
                        setMode((prev) => (prev === "revenue" ? "transactions" : "revenue"))
                    }
                    className={`relative min-w-[56px] h-[30px] rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
                        mode === "revenue" ? "bg-[#2D85EA]" : "bg-[#E5F0FF]"
                    }`}
                    aria-pressed={mode === "transactions"}
                    aria-label="Toggle chart view"
                >
                    <span
                        className={`absolute top-[50%] h-[22px] w-[22px] rounded-full bg-white shadow-sm transform -translate-y-1/2 transition-all duration-300 ease-in-out ${
                            mode === "revenue" ? "right-[4px]" : "left-[4px]"
                        }`}
                    />
                </button>
            </div>
            {isLoading ? (
                <div className="h-[280px] flex items-center justify-center text-[#00000099] text-[14px]">
                    {t.homeDirector.loading}
                </div>
            ) : (
                <>
                    <div id="chart-tooltip-sell" className="chart-tooltip" />
                    <div className="h-[317px]">
                        <Bar data={chartData} options={options} />
                    </div>
                </>
            )}
        </div>
    );
}

export default Sell;
