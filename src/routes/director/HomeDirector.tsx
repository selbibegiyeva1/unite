import Grid from "../../components/director/home/Grid";
import Sell from "../../components/director/home/Sell";
import Trans from "../../components/director/home/Trans";
import { useTranslation } from "../../hooks/useTranslation";

function HomeDirector() {
    const { t, lang } = useTranslation();
    return (
        <div className="px-20 max-1lg:px-15 max-md:px-8 max-sm:px-4 pb-[100px] mt-[28px]">
            <div className="max-w-[1680px] m-auto">
                <h1 className="text-[36px] font-bold">{t.homeDirector.pageHeading}</h1>
                <div className="mt-5">
                    <Grid key={lang} />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-5">
                    <Sell />
                    <Trans />
                </div>
            </div>
        </div>
    )
}

export default HomeDirector