import { useMemo, useEffect } from "react";
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

    // Ensure tooltip is hidden on mount
    useEffect(() => {
        const tooltipEl = document.getElementById('chart-tooltip-trans');
        if (tooltipEl) {
            tooltipEl.style.opacity = '0';
            tooltipEl.style.pointerEvents = 'none';
        }
    }, []);

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
                    enabled: false,
                    external: (context) => {
                        const tooltipModel = context.tooltip;
                        const tooltipEl = document.getElementById('chart-tooltip-trans');

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

                        const raw = data?.dashboard_info?.[tooltipModel.dataPoints[0]?.dataIndex ?? -1];
                        if (!raw) {
                            tooltipEl.style.opacity = '0';
                            tooltipEl.style.pointerEvents = 'none';
                            return;
                        }

                        // Format full date for tooltip (e.g., "18 Окт 2025")
                        const dateStr = raw.label ?? raw.date ?? "";
                        const d = new Date(dateStr);
                        const formattedDate = isNaN(d.getTime())
                            ? dateStr
                            : d.toLocaleDateString(locale, {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            });

                        const value = new Intl.NumberFormat(locale).format(
                            tooltipModel.dataPoints[0]?.parsed.y ?? 0
                        );

                        // Set HTML content
                        tooltipEl.innerHTML = `
                            <div class="chart-tooltip-block">
                                <div class="chart-tooltip-date">${formattedDate}</div>
                                <div class="chart-tooltip-value">${value} ${t.homeDirector.pieces}</div>
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
        [data, locale, t.homeDirector.pieces, t]
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
                <>
                    <div id="chart-tooltip-trans" className="chart-tooltip" />
                    <div className="h-[317px]">
                        <Bar data={chartData} options={options} />
                    </div>
                </>
            )}
        </div>
    );
}

export default Trans;
