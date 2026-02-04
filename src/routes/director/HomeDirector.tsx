import { useState } from "react";
import Grid from "../../components/director/home/Grid";
import Sell from "../../components/director/home/Sell";
import Trans from "../../components/director/home/Trans";
import Day, { type PeriodValue } from "../../components/director/transactions/Day";
import { useTranslation } from "../../hooks/useTranslation";

function HomeDirector() {
    const { t, lang } = useTranslation();
    const [periodValue, setPeriodValue] = useState<PeriodValue>("all");

    return (
        <div className="px-20 max-1lg:px-15 max-md:px-8 max-sm:px-4 pb-[100px] mt-[28px]">
            <div className="max-w-[1680px] m-auto">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <h1 className="text-[36px] font-bold">{t.homeDirector.pageHeading}</h1>
                    <Day value={periodValue} onChange={setPeriodValue} />
                </div>
                <div className="mt-5">
                    <Grid key={lang} period={periodValue} />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-5 max-md:grid-cols-1">
                    <Sell period={periodValue} />
                    <Trans period={periodValue} />
                </div>
            </div>
        </div>
    )
}

export default HomeDirector