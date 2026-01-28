import type { EsimTab } from '../../../hooks/operator/esim/useEsimLocations';
import { useEsimTariffs } from '../../../hooks/operator/esim/useEsimLocations';
import type { EsimTariff, EsimTariffsResponse } from '../../../services/authService';

interface TariffProps {
    activeTab: EsimTab;
    selectedCodeForApi: string | null;
    selectedName: string | null;
    selectedFlagUrl: string | null;
    onOpenRegionModal?: (countryCodes: string[]) => void;
    onBuyTariff?: (tariff: EsimTariff, coverageCount?: number | null) => void;
}

function formatTraffic(traffic: number): string {
    if (traffic >= 1024) {
        const gb = traffic / 1024;
        return `${gb % 1 === 0 ? gb : gb.toFixed(1)} GB`;
    }
    return `${traffic} MB`;
}

function formatDays(days: number): string {
    if (days === 1) {
        return '1 день';
    }
    if (days >= 2 && days <= 4) {
        return `${days} дня`;
    }
    return `${days} дней`;
}

function Tariff({ activeTab, selectedCodeForApi, selectedName, selectedFlagUrl, onOpenRegionModal, onBuyTariff }: TariffProps) {
    const { data, isLoading, isError } = useEsimTariffs(activeTab, selectedCodeForApi);

    // The backend might return either a single object or an array of objects.
    let tariffs: EsimTariff[] = [];
    let coverageCount: number | null = null;
    let regionCountryCodes: string[] = [];

    const normalize = (item: EsimTariffsResponse | undefined) => {
        if (!item) return;
        // Backend field is "tarrifs" (with double "r")
        if (Array.isArray(item.tarrifs)) {
            tariffs = tariffs.concat(item.tarrifs);
        }
        // For regions the API returns an array of country codes - use it as coverage/list.
        if (Array.isArray(item.country_code)) {
            const normalizedCodes = item.country_code
                .map((code) => code.trim().toUpperCase())
                .filter(Boolean);

            coverageCount = normalizedCodes.length;
            regionCountryCodes = normalizedCodes;
        }
    };

    if (Array.isArray(data)) {
        data.forEach((item) => normalize(item));
    } else if (data) {
        normalize(data);
    }

    return (
        <div>
            <p className="font-bold text-[32px]">Тарифы</p>

            {selectedCodeForApi && isLoading && (
                <p className="mt-6.5 text-sm text-[#00000099]">Загрузка тарифов...</p>
            )}

            {selectedCodeForApi && isError && (
                <p className="mt-6.5 text-sm text-red-500">
                    Не удалось загрузить тарифы. Попробуйте позже.
                </p>
            )}

            <div className="mt-6.5 grid grid-cols-4 gap-8">
                {selectedCodeForApi && !isLoading && !isError && tariffs.length === 0 && (
                    <p className="text-sm text-[#00000099]">
                        Для выбранного направления тарифы отсутствуют.
                    </p>
                )}

                {tariffs.map((tariff: EsimTariff, index: number) => (
                    <div key={index} className="px-6 pb-8 pt-6 rounded-[24px] border-[1.5px] border-[#00000026] hover:border-[#2D85EA] hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-2.5 justify-between py-[10px]">
                            <b className="text-[32px]">{formatTraffic(tariff.traffic)}</b>
                            <img
                                src={tariff.flag_url || selectedFlagUrl || '/esim/AU2.png'}
                                alt={tariff.operator}
                                className="w-[56px]"
                            />
                        </div>
                        {activeTab === 'regions' && coverageCount !== null && (
                            <div
                                className="flex items-center justify-between gap-2 py-[18px] border-b border-[#00000026] font-medium cursor-pointer"
                                onClick={() => {
                                    if (onOpenRegionModal && regionCountryCodes.length > 0) {
                                        onOpenRegionModal(regionCountryCodes);
                                    }
                                }}
                            >
                                <p>Покрытие</p>
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <p>{coverageCount} стран</p>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.9999 11.9999H20.9999M20.9999 11.9999L17 8M20.9999 11.9999L17 15.9999M9 12H9.01M6 12H6.01M3 12H3.01" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        )}
                        {activeTab === 'countries' && (
                            <div className="flex items-center justify-between gap-2 py-[18px] border-b border-[#00000026] font-medium">
                                <p>Страна</p>
                                <p>{selectedName ?? tariff.operator}</p>
                            </div>
                        )}
                        <div className="flex items-center justify-between gap-2 py-[18px] font-medium">
                            <p>Срок действия</p>
                            <p className="text-[#00000099]">{formatDays(tariff.days)}</p>
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center justify-between gap-2 text-[22px]">
                                <b>Сумма</b>
                                <b>{tariff.price_tmt} ТМТ</b>
                            </div>
                            <button
                                onClick={() => {
                                    if (onBuyTariff) {
                                        onBuyTariff(tariff, activeTab === 'regions' ? coverageCount : null);
                                    }
                                }}
                                className="bg-[#2D85EA] hover:bg-[#2D85EA]/80 transition-all duration-300 text-white text-[15px] font-medium rounded-[8px] mt-6 w-full p-[11px] cursor-pointer"
                            >
                                Купить
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tariff