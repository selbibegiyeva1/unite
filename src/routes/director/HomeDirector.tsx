import { useState } from "react";
import Grid from "../../components/director/home/Grid";
import Sell from "../../components/director/home/Sell";
import SalesByProduct from "../../components/director/home/SalesByProduct";
import TopClients from "../../components/director/home/TopClients";
import Day, { type PeriodValue } from "../../components/director/transactions/Day";
import { useTranslation } from "../../hooks/useTranslation";

function HomeDirector() {
    const { t, lang } = useTranslation();
    const [periodValue, setPeriodValue] = useState<PeriodValue>("all");

    return (
        <div className="px-20 max-1lg:px-15 max-md:px-8 max-sm:px-4 pb-[100px] mt-[28px]">
            <div className="max-w-[1680px] m-auto">
                <div className="flex items-center justify-between gap-4 max-1md:flex-col max-1md:items-start">
                    <h1 className="text-[36px] font-bold">{t.homeDirector.pageHeading}</h1>
                    <Day value={periodValue} onChange={setPeriodValue} />
                </div>
                <div className="mt-5">
                    <Grid key={lang} period={periodValue} />
                </div>
                <div className="mt-[19px] grid gap-5 grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
                    <Sell period={periodValue} />
                    <SalesByProduct period={periodValue} />
                    <TopClients period={periodValue} />
                </div>
            </div>
        </div>
    )
}

export default HomeDirector