import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Day, { type PeriodValue } from "../../components/director/transactions/Day";
import { useTranslation } from "../../hooks/useTranslation";

const linkBaseClasses = "inline-flex flex-col items-start text-[14px] font-medium outline-0";
const getLinkClasses = (isActive: boolean) =>
    `${linkBaseClasses} ${isActive ? "text-[#2D85EA]" : "text-black"}`;
const underlineClasses = (isActive: boolean) =>
    `mt-1 h-[1px] bg-[#2D85EA] transition-all duration-200 ease-out ${isActive ? "w-full" : "w-0"}`;

function ReportsDirector() {
    const { t } = useTranslation();
    const [periodValue, setPeriodValue] = useState<PeriodValue>("all");

    return (
        <div className="px-20 max-1lg:px-15 max-md:px-8 max-sm:px-4 pb-[100px] mt-[28px]">
            <div className="max-w-[1680px] m-auto">
                <div className="flex items-center justify-between gap-4 max-1md:flex-col max-1md:items-start">
                    <h1 className="text-[36px] font-bold">{t.directorReports.heading}</h1>
                    <div className="flex items-center gap-3">
                        <Day value={periodValue} onChange={setPeriodValue} />
                    </div>
                </div>

                <div className="my-5 overflow-x-auto">
                    <ul className="flex gap-4 min-w-max">
                        <li className="px-1.5 py-2.5 shrink-0">
                            <NavLink
                                to="history"
                                end
                                className={({ isActive }) => getLinkClasses(isActive)}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span>{t.directorReports.payoutTitle}</span>
                                        <span className={underlineClasses(isActive)} />
                                    </>
                                )}
                            </NavLink>
                        </li>
                        <li className="px-1.5 py-2.5 shrink-0">
                            <NavLink
                                to="rewards"
                                className={({ isActive }) => getLinkClasses(isActive)}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span>{t.directorReports.accrualTitle}</span>
                                        <span className={underlineClasses(isActive)} />
                                    </>
                                )}
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div>
                    <Outlet context={{ periodValue }} />
                </div>
            </div>
        </div>
    );
}

export default ReportsDirector;