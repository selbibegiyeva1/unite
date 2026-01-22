function Total() {
    return (
        <div className="p-8 border-[1.5px] border-[#00000026] rounded-4xl w-[490px]">
            <p className="text-[24px] font-medium">Оплата</p>

            <div className="my-6">
                <div className="flex items-center justify-between py-4 border-b border-[#0000001A]">
                    <p className="font-medium">К зачислению в Steam</p>
                    <p className="font-medium">1000 TMT</p>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-[#0000001A]">
                    <p className="font-medium">Итого к списанию</p>
                    <p className="font-medium">1000 TMT</p>
                </div>
            </div>

            <div className="flex items-center gap-2.5">
                <svg className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="3.25" stroke="black" stroke-opacity="0.15" stroke-width="1.5" />
                </svg>
                <p className="text-[14px] font-medium">Я потдверждаю, что правильно указал все данные</p>
            </div>

            <button className="mt-6 w-full text-[14px] font-medium bg-[#2D85EA] text-white p-[11px] rounded-[8px] cursor-pointer">Оплатить</button>
        </div>
    )
}

export default Total