import { useEffect, useState } from 'react';
import { useEsimLocations } from '../../../hooks/operator/esim/useEsimLocations';
import type { EsimTab } from '../../../hooks/operator/esim/useEsimLocations';
import { useTranslation } from '../../../hooks/useTranslation';

interface CountryProps {
    activeTab: EsimTab;
    setActiveTab: (tab: EsimTab) => void;
    onSelectLocation?: (params: {
        codeForApi: string;
        displayName: string;
        imageUrl: string;
        tab: EsimTab;
    }) => void;
}

function Country({ activeTab, setActiveTab, onSelectLocation }: CountryProps) {

    const [search, setSearch] = useState('');
    const { data, isLoading, isError } = useEsimLocations(activeTab);
    const { t } = useTranslation();
    const [selectedCodeForApi, setSelectedCodeForApi] = useState<string | null>(null);
    const searchQuery = search.trim().toLowerCase();

    // Auto-select the first item when data is loaded AND nothing is selected yet.
    useEffect(() => {
        if (!data || data.length === 0 || selectedCodeForApi) {
            return;
        }

        const first = data[0];

        const codeForApi =
            'country_code' in first
                ? first.country_code
                : first.region_name.en.toLowerCase();

        const name =
            'country_name' in first
                ? first.country_name.ru
                : first.region_name.ru;

        const imageUrl =
            'flag_url' in first ? first.flag_url : first.region_url;

        setSelectedCodeForApi(codeForApi);

        onSelectLocation?.({
            codeForApi,
            displayName: name,
            imageUrl,
            tab: activeTab,
        });
    }, [data, activeTab, onSelectLocation, selectedCodeForApi]);

    const filteredData = !data
        ? []
        : data.filter((item) => {
            if (!searchQuery) return true;

            if ('country_name' in item) {
                const ru = item.country_name.ru.toLowerCase();
                const en = item.country_name.en.toLowerCase();
                return ru.includes(searchQuery) || en.includes(searchQuery);
            }

            const ru = item.region_name.ru.toLowerCase();
            const en = item.region_name.en.toLowerCase();
            return ru.includes(searchQuery) || en.includes(searchQuery);
        });

    const baseBtn =
        'flex items-center gap-2.5 text-[15px] font-medium px-[15px] py-[10px] rounded-[8px] cursor-pointer h-[45px] transition-colors';

    const activeClasses = 'bg-[#2D85EA] text-white border-2 border-[#2D85EA]';
    const inactiveClasses = 'bg-white border-2 border-[#00000026] text-black';

    return (
        <div className="p-6 border border-[#00000026] rounded-[16px]">
            <p className="font-bold text-[24px]">{t.esim.country.title}</p>
            <div className="flex items-center gap-2.5 my-5">
                <button
                    type="button"
                    onClick={() => {
                        setActiveTab('countries');
                        setSelectedCodeForApi(null);
                    }}
                    className={`${baseBtn} ${activeTab === 'countries' ? activeClasses : inactiveClasses}`}
                >
                    {t.esim.country.tabCountries}
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setActiveTab('regions');
                        setSelectedCodeForApi(null);
                    }}
                    className={`${baseBtn} ${activeTab === 'regions' ? activeClasses : inactiveClasses}`}
                >
                    {t.esim.country.tabRegions}
                </button>
            </div>

            <div className="flex items-center gap-2 w-full rounded-[8px] px-5 bg-[#F5F5F9] mb-[14px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2491 10.5001C17.2491 11.3865 17.0745 12.2643 16.7352 13.0832C16.3961 13.9022 15.8988 14.6463 15.2721 15.2731C14.6453 15.8998 13.9012 16.397 13.0822 16.7363C12.2633 17.0755 11.3855 17.2501 10.4991 17.2501C9.6127 17.2501 8.73496 17.0755 7.916 16.7363C7.09706 16.397 6.35294 15.8998 5.72615 15.2731C5.09935 14.6463 4.60216 13.9022 4.26293 13.0832C3.92371 12.2643 3.74912 11.3865 3.74912 10.5001C3.74912 8.70988 4.46027 6.99299 5.72615 5.72713C6.99202 4.46125 8.7089 3.7501 10.4991 3.7501C12.2893 3.7501 14.0062 4.46125 15.2721 5.72713C16.538 6.99299 17.2491 8.70988 17.2491 10.5001ZM16.0191 17.6101C14.2107 19.0141 11.9352 19.676 9.65582 19.4612C7.37647 19.2466 5.26463 18.1712 3.75025 16.4542C2.23585 14.7372 1.43275 12.5075 1.50442 10.2192C1.5761 7.9309 2.51717 5.7559 4.13605 4.13702C5.75494 2.51815 7.92992 1.57708 10.2182 1.50539C12.5066 1.43372 14.7362 2.23682 16.4532 3.75122C18.1703 5.26561 19.2456 7.37744 19.4603 9.6568C19.6751 11.9361 19.0131 14.2117 17.6091 16.0201L22.1691 20.5801C22.2797 20.6831 22.3683 20.8073 22.4298 20.9453C22.4913 21.0833 22.5243 21.2323 22.527 21.3833C22.5297 21.5344 22.5018 21.6844 22.4453 21.8245C22.3887 21.9646 22.3044 22.0918 22.1976 22.1986C22.0908 22.3055 21.9636 22.3897 21.8235 22.4462C21.6834 22.5028 21.5334 22.5307 21.3824 22.528C21.2313 22.5253 21.0822 22.4923 20.9444 22.4308C20.8064 22.3693 20.6822 22.2806 20.5791 22.1701L16.0191 17.6101Z" fill="black" fill-opacity="0.6" />
                </svg>
                <input
                    type="text"
                    placeholder={
                        activeTab === 'countries'
                            ? t.esim.country.searchCountryPlaceholder
                            : t.esim.country.searchRegionPlaceholder
                    }
                    className="outline-0 font-medium py-[15px] w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className='flex flex-col h-[264.25px] overflow-auto transactions-table-scroll'>
                {isLoading && (
                    <p className="text-sm text-[#00000099]">{t.esim.country.loading}</p>
                )}

                {isError && (
                    <p className="text-sm text-red-500">{t.esim.country.loadError}</p>
                )}

                {!isLoading && !isError && data && filteredData.length === 0 && (
                    <p className="text-sm text-[#00000099]">{t.esim.country.empty}</p>
                )}

                {!isLoading && !isError && filteredData.map((item) => {
                        const codeForApi =
                            'country_code' in item
                                ? item.country_code
                                // For regions API expects lowercased `region` value (e.g. "africa")
                                : item.region_name.en.toLowerCase();

                        const name =
                            'country_name' in item
                                ? item.country_name.ru
                                : item.region_name.ru;

                        const imageUrl =
                            'flag_url' in item ? item.flag_url : item.region_url;

                        const isSelected = selectedCodeForApi === codeForApi;

                        return (
                            <div
                                key={codeForApi}
                                className={`flex items-center justify-between gap-2.5 py-[13px] px-4 hover:bg-[#F5F5F9] transition-all duration-300 font-medium cursor-pointer rounded-[8px] ${isSelected ? 'bg-[#E3F1FF]' : ''}`}
                                onClick={() => {
                                    setSelectedCodeForApi(codeForApi);
                                    onSelectLocation?.({
                                        codeForApi,
                                        displayName: name,
                                        imageUrl,
                                        tab: activeTab,
                                    });
                                }}
                            >
                                <div className='flex items-center gap-2'>
                                    <img src={imageUrl} alt={name} className='w-[36px]' />
                                    <p>{name}</p>
                                </div>
                                <p className='text-[#00000099] text-[14px] text-right text-nowrap'>
                                    {item.tariff_count} {t.esim.country.tariffsSuffix}
                                </p>
                            </div>
                        );
                    })}
            </div>
        </div>
    )
}

export default Country