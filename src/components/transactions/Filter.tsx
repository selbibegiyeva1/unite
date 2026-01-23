function Filter() {
    return (
        <div className="mt-5 px-5 py-[32px] border border-[#00000026] rounded-[16px]">
            <p className="font-medium text-[18px] mb-5">Фильтры</p>
            <div className="flex items-end gap-4">
                <div>
                    <span className='font-medium text-[15px] pb-[8px] flex'>Дата</span>
                    <div className="relative">
                        <select className="w-[320px] text-[14px] font-medium border border-[#00000026] rounded-[8px] px-4 py-3 outline-0 appearance-none cursor-pointer">
                            <option value="">Выберите оператора</option>
                            <option value="1">Оператор 1</option>
                            <option value="2">Оператор 2</option>
                            <option value="3">Оператор 3</option>
                        </select>
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.87883 5.29289L0.293044 1.70711C-0.336921 1.07714 0.109246 0 1.00015 0H8.17172C9.06263 0 9.50879 1.07714 8.87883 1.70711L5.29304 5.29289C4.90252 5.68342 4.26935 5.68342 3.87883 5.29289Z" fill="black" />
                        </svg>
                    </div>
                </div>
                <div>
                    <span className='font-medium text-[15px] pb-[8px] flex'>Категория</span>
                    <div className="relative">
                        <select className="w-[320px] text-[14px] font-medium border border-[#00000026] rounded-[8px] px-4 py-3 outline-0 appearance-none cursor-pointer">
                            <option value="">Выберите оператора</option>
                            <option value="1">Оператор 1</option>
                            <option value="2">Оператор 2</option>
                            <option value="3">Оператор 3</option>
                        </select>
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.87883 5.29289L0.293044 1.70711C-0.336921 1.07714 0.109246 0 1.00015 0H8.17172C9.06263 0 9.50879 1.07714 8.87883 1.70711L5.29304 5.29289C4.90252 5.68342 4.26935 5.68342 3.87883 5.29289Z" fill="black" />
                        </svg>
                    </div>
                </div>
                <button className="bg-[#2D85EA] h-[47px] text-white text-[15px] font-medium rounded-[8px] p-3 w-[120px] cursor-pointer">Поиск</button>
                <button className="text-[15px] font-medium text-[#2D85EA] min-h-[47px] cursor-pointer">Сбросить</button>
            </div>
        </div>
    )
}

export default Filter