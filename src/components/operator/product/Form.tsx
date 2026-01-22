function Form() {
    return (
        <div className="p-8 border-[1.5px] border-[#00000026] rounded-4xl">
            <p className="text-[24px] font-bold">Пополнение аккаунта</p>

            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8">
                <div>
                    <span className="text-[14px] font-medium pb-4 flex">Где искать</span>
                    <input type="text" placeholder="Введите логин в Steam" className="w-full text-[14px] font-medium outline-0 rounded-[10px] p-4 bg-[#F5F5F9]" />
                </div>
                <div>
                    <span className="text-[14px] font-medium pb-4 flex">Где искать</span>
                    <input type="text" placeholder="Введите логин в Steam" className="w-full text-[14px] font-medium outline-0 rounded-[10px] p-4 bg-[#F5F5F9]" />
                </div>
                <div>
                    <span className="text-[14px] font-medium pb-4 flex">Где искать</span>
                    <input type="text" placeholder="Введите логин в Steam" className="w-full text-[14px] font-medium outline-0 rounded-[10px] p-4 bg-[#F5F5F9]" />
                </div>
                <div>
                    <span className="text-[14px] font-medium pb-4 flex">Где искать</span>
                    <input type="text" placeholder="Введите логин в Steam" className="w-full text-[14px] font-medium outline-0 rounded-[10px] p-4 bg-[#F5F5F9]" />
                </div>
            </div>
        </div>
    )
}

export default Form