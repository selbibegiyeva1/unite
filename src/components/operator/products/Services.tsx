import { useState } from "react";
import { Link } from "react-router-dom";
import { useProductGroups } from "../../../hooks/operator/product/useProductGroups";
import { useTranslation } from "../../../hooks/useTranslation";

function Services() {
    const [activeTab, setActiveTab] = useState<'programs' | 'games'>('programs');
    const { data: groups, isLoading, error } = useProductGroups();
    const { t } = useTranslation();

    const baseBtn =
        'flex items-center gap-2.5 text-[15px] font-medium px-[15px] py-[10px] rounded-[8px] cursor-pointer h-[45px] transition-colors';

    const activeClasses = 'bg-[#2D85EA] text-white border-2 border-[#2D85EA]';
    const inactiveClasses = 'bg-white border-2 border-[#00000026] text-black';

    const currentCategory = activeTab === 'programs' ? 'business' : 'games';
    const filteredGroups = groups?.filter(
        (group) => group.category === currentCategory
    ) ?? [];

    return (
        <div className="pb-[100px]">
            <p className="mb-8 text-[32px] font-bold">{t.services.title}</p>
            <div className="flex gap-2.5">
                <button
                    type="button"
                    onClick={() => setActiveTab('programs')}
                    className={`${baseBtn} ${activeTab === 'programs' ? activeClasses : inactiveClasses}`}
                >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.375 13.625V17.125M17.125 15.375H13.625M14.75 9.25H16C17.1046 9.25 18 8.35457 18 7.25V6C18 4.89543 17.1046 4 16 4H14.75C13.6454 4 12.75 4.89543 12.75 6V7.25C12.75 8.35457 13.6454 9.25 14.75 9.25ZM6 18H7.25C8.35457 18 9.25 17.1046 9.25 16V14.75C9.25 13.6454 8.35457 12.75 7.25 12.75H6C4.89543 12.75 4 13.6454 4 14.75V16C4 17.1046 4.89543 18 6 18ZM6 9.25H7.25C8.35457 9.25 9.25 8.35457 9.25 7.25V6C9.25 4.89543 8.35457 4 7.25 4H6C4.89543 4 4 4.89543 4 6V7.25C4 8.35457 4.89543 9.25 6 9.25Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    {t.services.tabPrograms}
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('games')}
                    className={`${baseBtn} ${activeTab === 'games' ? activeClasses : inactiveClasses}`}
                >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.08333 18.583H10.75M13.4167 18.583H10.75M10.75 18.583V15.958M10.75 15.958H16.75C17.8546 15.958 18.75 15.0626 18.75 13.958V6.58301C18.75 5.47844 17.8546 4.58301 16.75 4.58301H4.75C3.64543 4.58301 2.75 5.47844 2.75 6.58301V13.958C2.75 15.0626 3.64543 15.958 4.75 15.958H10.75Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    {t.services.tabGames}
                </button>
            </div>

            {isLoading && (
                <p className="mt-[24px]">
                    {t.services.loadingGroups}
                </p>
            )}
            {error && !isLoading && (
                <p className="text-red-500 mt-[24px]">
                    {t.services.loadError}
                </p>
            )}

            {!isLoading && !error && filteredGroups.length > 0 && (
                <div className="mt-[24px] grid grid-cols-7 gap-6">
                    {filteredGroups.map((group) => (
                        <Link key={group.group_name} to={`/operator/product?group=${encodeURIComponent(group.group_name)}`}>
                            <div className="overflow-hidden rounded-[24px]">
                                <img
                                    src={group.icon_url}
                                    alt={group.group_name}
                                    className="w-full object-cover transition-transform duration-200 hover:scale-105"
                                    onError={(e) => {
                                        const target = e.currentTarget;
                                        if (target.src !== `${window.location.origin}/product.png`) {
                                            target.src = '/product.png';
                                        }
                                    }}
                                />
                            </div>
                            <p className="mt-[12px] text-center font-bold">{group.group_name}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Services