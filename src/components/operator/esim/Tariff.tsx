interface TariffProps {
    activeTab: 'countries' | 'regions';
}

interface TariffData {
    data: string;
    country: string;
    validity: string;
    price: number;
    coverage?: string;
}

function Tariff({ activeTab }: TariffProps) {
    // Fake tariffs for Страны (Countries)
    const countryTariffs: TariffData[] = [
        { data: '1GB', country: 'Австралия', validity: '3 дней', price: 150 },
        { data: '3GB', country: 'Австралия', validity: '7 дней', price: 250 },
        { data: '5GB', country: 'Австралия', validity: '10 дней', price: 350 },
        { data: '10GB', country: 'Австралия', validity: '15 дней', price: 500 },
    ];

    // Fake tariffs for Регионы (Regions) - all have coverage and 3 days validity
    const regionTariffs: TariffData[] = [
        { data: '1GB', country: 'Европа', validity: '3 дней', price: 200, coverage: '30 стран' },
        { data: '3GB', country: 'Европа', validity: '3 дней', price: 350, coverage: '30 стран' },
        { data: '5GB', country: 'Европа', validity: '3 дней', price: 450, coverage: '30 стран' },
        { data: '10GB', country: 'Европа', validity: '3 дней', price: 600, coverage: '30 стран' },
    ];

    const tariffs = activeTab === 'countries' ? countryTariffs : regionTariffs;

    return (
        <div>
            <p className="font-bold text-[32px]">Тарифы</p>

            <div className="mt-6.5 grid grid-cols-4 gap-8">
                {tariffs.map((tariff, index) => (
                    <div key={index} className="px-6 pb-8 pt-6 rounded-[24px] border-[1.5px] border-[#00000026] hover:border-[#2D85EA] hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-2.5 justify-between py-[10px]">
                            <b className="text-[32px]">{tariff.data}</b>
                            <img src="/esim/AU2.png" alt="gb" className="w-[56px]" />
                        </div>
                        {activeTab === 'regions' && tariff.coverage && (
                            <div className="flex items-center justify-between gap-2 py-[18px] border-b border-[#00000026] font-medium">
                                <p>Покрытие</p>
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <p>{tariff.coverage}</p>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.9999 11.9999H20.9999M20.9999 11.9999L17 8M20.9999 11.9999L17 15.9999M9 12H9.01M6 12H6.01M3 12H3.01" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        )}
                        {activeTab === 'countries' && (
                            <div className="flex items-center justify-between gap-2 py-[18px] border-b border-[#00000026] font-medium">
                                <p>Страна</p>
                                <p>{tariff.country}</p>
                            </div>
                        )}
                        <div className="flex items-center justify-between gap-2 py-[18px] font-medium">
                            <p>Срок действия</p>
                            <p className="text-[#00000099]">{tariff.validity}</p>
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center justify-between gap-2 text-[22px]">
                                <b>Сумма</b>
                                <b>{tariff.price} ТМТ</b>
                            </div>
                            <button className="bg-[#2D85EA] text-white text-[15px] font-medium rounded-[8px] mt-6 w-full p-[11px] cursor-pointer">Купить</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tariff