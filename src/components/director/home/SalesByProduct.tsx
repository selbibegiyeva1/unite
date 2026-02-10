import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    type ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useMemo, useState } from "react";
import { useDirectorMainInfo } from "../../../hooks/director/home/useDirectorMainInfo";
import { useTranslation } from "../../../hooks/useTranslation";
import { type PeriodValue } from "../transactions/Day";

ChartJS.register(ArcElement, Tooltip, Legend);

type Mode = "revenue" | "transactions";

const PRODUCT_TYPES = ["STEAM", "ESIM", "TOPUP", "VOUCHER"] as const;
type ProductType = (typeof PRODUCT_TYPES)[number];

const PRODUCT_COLORS: Record<ProductType, string> = {
    STEAM: "#3732C7",
    ESIM: "#A132C7",
    TOPUP: "#32C7A4",
    VOUCHER: "#55A5FF",
};

const PRODUCT_LABELS: Record<ProductType, string> = {
    STEAM: "Steam",
    ESIM: "e-Sim",
    TOPUP: "Topup",
    VOUCHER: "Voucher",
};

const periodToApi = (p: PeriodValue): string => (p === "all" ? "all_time" : p);

interface SalesByProductProps {
    period?: PeriodValue;
}

function SalesByProduct({ period = "all" }: SalesByProductProps) {
    const { t, lang } = useTranslation();
    const [mode, setMode] = useState<Mode>("revenue");
    const { data, isLoading, error } = useDirectorMainInfo({
        category: "ALL",
        period: periodToApi(period),
    });

    const locale = lang === "ru" ? "ru-RU" : "tk-TM";

    // Hide tooltip on mount
    useEffect(() => {
        const el = document.getElementById("chart-tooltip-sales-by-product");
        if (el) {
            el.style.opacity = "0";
            el.style.pointerEvents = "none";
        }
    }, []);

    const { chartData, total } = useMemo(() => {
        const revenueSource = data?.revenue_by_product ?? [];
        const transactionsSource = data?.transactions_by_product ?? [];

        const values = PRODUCT_TYPES.map((type) => {
            if (mode === "revenue") {
                const item = revenueSource.find((x) => x.order_type === type);
                return item?.revenue_tmt ?? 0;
            }
            const item = transactionsSource.find((x) => x.order_type === type);
            return item?.orders_count ?? 0;
        });

        const totalValue = values.reduce((sum, v) => sum + v, 0);

        return {
            chartData: {
                labels: PRODUCT_TYPES.map((type) => PRODUCT_LABELS[type]),
                datasets: [
                    {
                        data: values,
                        backgroundColor: PRODUCT_TYPES.map((type) => PRODUCT_COLORS[type]),
                        borderWidth: 0,
                    },
                ],
            },
            total: totalValue,
        };
    }, [data, mode]);

    const options: ChartOptions<"doughnut"> = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            cutout: "70%",
            plugins: {
                legend: { display: false },
                tooltip: {
                    enabled: false,
                    external: (context) => {
                        const tooltipModel = context.tooltip;
                        const tooltipEl = document.getElementById(
                            "chart-tooltip-sales-by-product"
                        );

                        if (!tooltipEl) return;

                        if (
                            !tooltipModel ||
                            tooltipModel.opacity === 0 ||
                            !tooltipModel.dataPoints ||
                            tooltipModel.dataPoints.length === 0
                        ) {
                            tooltipEl.style.opacity = "0";
                            tooltipEl.style.pointerEvents = "none";
                            return;
                        }

                        const dataPoint = tooltipModel.dataPoints[0];
                        const label = dataPoint.label ?? "";
                        const rawValue = dataPoint.parsed ?? 0;

                        const formattedValue =
                            mode === "revenue"
                                ? new Intl.NumberFormat(locale, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                  }).format(rawValue)
                                : new Intl.NumberFormat(locale).format(rawValue);

                        tooltipEl.innerHTML = `
                            <div class="chart-tooltip-block">
                                <div class="chart-tooltip-date">${label}</div>
                                <div class="chart-tooltip-value">${
                                    mode === "revenue"
                                        ? `${formattedValue} TMT`
                                        : `${formattedValue} ${t.homeDirector.pieces}`
                                }</div>
                            </div>
                        `;

                        const position = context.chart.canvas.getBoundingClientRect();
                        const tooltipRect = tooltipEl.getBoundingClientRect();

                        const left =
                            position.left +
                            tooltipModel.caretX -
                            tooltipRect.width / 2;
                        const top =
                            position.top +
                            tooltipModel.caretY -
                            tooltipRect.height -
                            6;

                        tooltipEl.style.left = `${left}px`;
                        tooltipEl.style.top = `${top}px`;
                        tooltipEl.style.opacity = "1";
                        tooltipEl.style.pointerEvents = "none";
                    },
                },
            },
        }),
        [locale, mode, t.homeDirector.pieces]
    );

    const formattedTotal =
        mode === "revenue"
            ? new Intl.NumberFormat(locale, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
              }).format(total) + " TMT"
            : new Intl.NumberFormat(locale).format(total) +
              " " +
              t.homeDirector.pieces;

    if (error) {
        return (
            <div className="p-6.5 border border-[#00000026] rounded-[16px] min-h-[280px] flex items-center justify-center">
                <p className="text-[#ED2428] text-[14px]">{t.homeDirector.loadError}</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[460px] max-lg:max-w-full p-6.5 border border-[#00000026] rounded-[16px] flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between gap-4">
                <p className="font-medium text-[18px]">
                    {t.homeDirector.salesRevenue}{" "}
                    <span>
                        {mode === "revenue"
                            ? t.homeDirector.byProducts
                            : t.homeDirector.byTransactions}
                    </span>
                </p>

                <button
                    type="button"
                    onClick={() =>
                        setMode((prev) => (prev === "revenue" ? "transactions" : "revenue"))
                    }
                    className={`relative min-w-[56px] h-[30px] rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
                        mode === "revenue" ? "bg-[#2D85EA]" : "bg-[#E5F0FF]"
                    }`}
                    aria-pressed={mode === "transactions"}
                    aria-label="Toggle view"
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
                    <div
                        id="chart-tooltip-sales-by-product"
                        className="chart-tooltip"
                    />
                    <div className="relative w-full max-w-[218px] m-auto aspect-square max-md:max-w-[220px]">
                        <Doughnut data={chartData} options={options} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <p className="text-[#00000099] mb-1 font-medium">
                                {t.homeDirector.totalLabel}
                            </p>
                            <p className="text-[17px] font-semibold text-black text-center">
                                {formattedTotal}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 text-[16px] font-medium">
                        {PRODUCT_TYPES.map((type) => (
                            <div
                                key={type}
                                className="flex items-center gap-2"
                            >
                                <span
                                    className="inline-block w-[12px] h-[12px] rounded-full"
                                    style={{ backgroundColor: PRODUCT_COLORS[type] }}
                                />
                                <span>{PRODUCT_LABELS[type]}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default SalesByProduct;
