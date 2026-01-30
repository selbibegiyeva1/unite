import { useEffect, useMemo, useState } from 'react';
import { useEsimLocations } from '../../../hooks/operator/esim/useEsimLocations';
import authService, { type EsimCountry, type EsimTariffsResponse } from '../../../services/authService';
import { useTranslation } from '../../../hooks/useTranslation';

interface RegionModalProps {
    isOpen: boolean;
    onClose: () => void;
    countryCodes: string[];
}

interface RegionCountryItem {
    code: string;
    country?: EsimCountry;
    extra?: {
        nameRu: string;
        flagUrl: string;
        tariffCount: number;
    };
}

function RegionModal({ isOpen, onClose, countryCodes }: RegionModalProps) {
    // Close on ESC key press (same pattern as Sidebar)
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen, onClose]);

    const { data, isLoading, isError } = useEsimLocations('countries');
    const [search, setSearch] = useState('');
    const [extraInfo, setExtraInfo] = useState<Record<string, { nameRu: string; flagUrl: string; tariffCount: number }>>({});
    const { t } = useTranslation();

    // When modal opens, fetch extra info for codes that are NOT present in the countries list
    useEffect(() => {
        if (!isOpen) return;
        const allCountries = (data as EsimCountry[] | undefined) ?? [];
        if (!countryCodes || countryCodes.length === 0) return;

        const normalizedCodes = countryCodes
            .map((code) => code.trim().toUpperCase())
            .filter(Boolean);

        const missingCodes = normalizedCodes.filter((code) => {
            const inCountries = allCountries.some(
                (country) => country.country_code.trim().toUpperCase() === code
            );
            return !inCountries && !extraInfo[code];
        });

        if (missingCodes.length === 0) return;

        const fetchMissing = async () => {
            await Promise.all(
                missingCodes.map(async (code) => {
                    try {
                        const resp: EsimTariffsResponse = await authService.getEsimTariffs('countries', code);
                        const nameRu = resp.country_name?.ru ?? code;
                        const flagUrl = resp.flag_url ?? '/esim/AU2.png';
                        const tariffCount = Array.isArray(resp.tarrifs) ? resp.tarrifs.length : 0;

                        setExtraInfo((prev) => ({
                            ...prev,
                            [code]: { nameRu, flagUrl, tariffCount },
                        }));
                    } catch {
                        // Ignore errors for individual codes; they’ll stay as plain codes
                    }
                })
            );
        };

        void fetchMissing();
    }, [isOpen, data, countryCodes, extraInfo]);

    const filteredCountries = useMemo<RegionCountryItem[]>(() => {
        const allCountries = (data as EsimCountry[] | undefined) ?? [];
        if (!countryCodes || countryCodes.length === 0) return [];

        const normalizedCodes = countryCodes
            .map((code) => code.trim().toUpperCase())
            .filter(Boolean);

        const items: RegionCountryItem[] = normalizedCodes.map((code) => {
            const match = allCountries.find(
                (country) => country.country_code.trim().toUpperCase() === code
            );
            const extra = extraInfo[code];
            return { code, country: match, extra };
        });

        const query = search.trim().toLowerCase();
        if (!query) return items;

        return items.filter(({ code, country, extra }) => {
            if (country) {
                const ru = country.country_name.ru.toLowerCase();
                const en = country.country_name.en.toLowerCase();
                return ru.includes(query) || en.includes(query);
            }

            if (extra) {
                const ru = extra.nameRu.toLowerCase();
                return ru.includes(query);
            }

            // Fallback: allow search by raw code when we don't have country data
            return code.toLowerCase().includes(query);
        });
    }, [data, countryCodes, search, extraInfo]);

    return (
        <div
            className={`fixed inset-0 z-40 grid place-items-center overflow-auto bg-[#00000059] p-4 transition-opacity duration-200 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            onClick={onClose}
        >
            <div
                className={`w-full max-w-[910px] p-8 max-1md:p-6 border-[1.5px] border-[#00000026] rounded-[24px] h-[700px] max-h-[90vh] flex flex-col bg-white transform transition-transform duration-200 ${isOpen ? 'translate-y-0' : 'translate-y-2'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between">
                    <p className="text-[24px] font-medium leading-7">{t.esim.regionModal.title}</p>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor-pointer shrink-0"
                        onClick={onClose}
                    >
                        <path d="M6 6L18 18M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className="flex items-center gap-2 w-full rounded-[8px] px-5 bg-[#F5F5F9] mt-6.5 mb-[14px] shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.2491 10.5001C17.2491 11.3865 17.0745 12.2643 16.7352 13.0832C16.3961 13.9022 15.8988 14.6463 15.2721 15.2731C14.6453 15.8998 13.9012 16.397 13.0822 16.7363C12.2633 17.0755 11.3855 17.2501 10.4991 17.2501C9.6127 17.2501 8.73496 17.0755 7.916 16.7363C7.09706 16.397 6.35294 15.8998 5.72615 15.2731C5.09935 14.6463 4.60216 13.9022 4.26293 13.0832C3.92371 12.2643 3.74912 11.3865 3.74912 10.5001C3.74912 8.70988 4.46027 6.99299 5.72615 5.72713C6.99202 4.46125 8.7089 3.7501 10.4991 3.7501C12.2893 3.7501 14.0062 4.46125 15.2721 5.72713C16.538 6.99299 17.2491 8.70988 17.2491 10.5001ZM16.0191 17.6101C14.2107 19.0141 11.9352 19.676 9.65582 19.4612C7.37647 19.2466 5.26463 18.1712 3.75025 16.4542C2.23585 14.7372 1.43275 12.5075 1.50442 10.2192C1.5761 7.9309 2.51717 5.7559 4.13605 4.13702C5.75494 2.51815 7.92992 1.57708 10.2182 1.50539C12.5066 1.43372 14.7362 2.23682 16.4532 3.75122C18.1703 5.26561 19.2456 7.37744 19.4603 9.6568C19.6751 11.9361 19.0131 14.2117 17.6091 16.0201L22.1691 20.5801C22.2797 20.6831 22.3683 20.8073 22.4298 20.9453C22.4913 21.0833 22.5243 21.2323 22.527 21.3833C22.5297 21.5344 22.5018 21.6844 22.4453 21.8245C22.3887 21.9646 22.3044 22.0918 22.1976 22.1986C22.0908 22.3055 21.9636 22.3897 21.8235 22.4462C21.6834 22.5028 21.5334 22.5307 21.3824 22.528C21.2313 22.5253 21.0822 22.4923 20.9444 22.4308C20.8064 22.3693 20.6822 22.2806 20.5791 22.1701L16.0191 17.6101Z" fill="black" fillOpacity="0.6" />
                    </svg>
                    <input
                        type="text"
                        placeholder={t.esim.regionModal.searchPlaceholder}
                        className="outline-0 font-medium py-[15px] w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="mt-3.5 flex pr-4 flex-col flex-1 min-h-0 overflow-auto transactions-table-scroll">
                    {isLoading && (
                        <p className="text-sm text-[#00000099]">{t.esim.regionModal.loadingCountries}</p>
                    )}

                    {isError && !isLoading && (
                        <p className="text-sm text-red-500">{t.esim.regionModal.loadError}</p>
                    )}

                    {!isLoading && !isError && filteredCountries.length === 0 && (
                        <p className="text-sm text-[#00000099]">{t.esim.regionModal.empty}</p>
                    )}

                    {!isLoading && !isError && filteredCountries.map(({ code, country, extra }) => (
                        <div
                            key={code}
                            className="flex items-center rounded-[8px] justify-between gap-2 py-3 font-medium"
                        >
                            <div className="flex items-center gap-2">
                                <img
                                    src={country?.flag_url ?? extra?.flagUrl ?? ''}
                                    alt={country?.country_name.ru ?? extra?.nameRu ?? code}
                                    className="w-[38px]"
                                />
                                <p className='max-1md:text-[14px]'>{country?.country_name.ru ?? extra?.nameRu ?? code}</p>
                            </div>
                            <p className='text-[#00000099] text-[14px] text-right text-nowrap'>
                                {country
                                    ? `${country.tariff_count} ${t.esim.regionModal.tariffsSuffix}`
                                    : extra
                                        ? `${extra.tariffCount} ${t.esim.regionModal.tariffsSuffix}`
                                        : '—'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RegionModal