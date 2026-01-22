function Region() {
    return (
        <div className="p-8 border-[1.5px] border-[#00000026] rounded-4xl">
            <p className="text-[24px] font-bold">Выберите регион</p>

            <div className="relative mt-4">
                <select className="appearance-none w-full text-[14px] font-medium cursor-pointer outline-0 rounded-[10px] p-4 bg-[#F5F5F9]">
                    <option value="1">Россия</option>
                    <option value="2">Украина</option>
                    <option value="3">Беларусь</option>
                    <option value="4">Казахстан</option>
                    <option value="5">Кыргызстан</option>
                    <option value="6">Таджикистан</option>
                </select>
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.33854 6.66699L10.0052 13.3337L16.6719 6.66699" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </div>
    )
}

export default Region