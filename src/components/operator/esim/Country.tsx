interface CountryProps {
    activeTab: 'countries' | 'regions';
    setActiveTab: (tab: 'countries' | 'regions') => void;
}

function Country({ activeTab, setActiveTab }: CountryProps) {

    const baseBtn =
        'flex items-center gap-2.5 text-[15px] font-medium px-[15px] py-[10px] rounded-[8px] cursor-pointer h-[45px] transition-colors';

    const activeClasses = 'bg-[#2D85EA] text-white border-2 border-[#2D85EA]';
    const inactiveClasses = 'bg-white border-2 border-[#00000026] text-black';

    return (
        <div className="p-6 border border-[#00000026] rounded-[16px]">
            <p className="font-bold text-[24px]">Страны</p>
            <div className="flex items-center gap-2.5 my-5">
                <button
                    type="button"
                    onClick={() => setActiveTab('countries')}
                    className={`${baseBtn} ${activeTab === 'countries' ? activeClasses : inactiveClasses}`}
                >
                    Страны
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('regions')}
                    className={`${baseBtn} ${activeTab === 'regions' ? activeClasses : inactiveClasses}`}
                >
                    Регионы
                </button>
            </div>

            <div className="flex items-center gap-2 w-full rounded-[8px] px-5 bg-[#F5F5F9] mb-[14px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2491 10.5001C17.2491 11.3865 17.0745 12.2643 16.7352 13.0832C16.3961 13.9022 15.8988 14.6463 15.2721 15.2731C14.6453 15.8998 13.9012 16.397 13.0822 16.7363C12.2633 17.0755 11.3855 17.2501 10.4991 17.2501C9.6127 17.2501 8.73496 17.0755 7.916 16.7363C7.09706 16.397 6.35294 15.8998 5.72615 15.2731C5.09935 14.6463 4.60216 13.9022 4.26293 13.0832C3.92371 12.2643 3.74912 11.3865 3.74912 10.5001C3.74912 8.70988 4.46027 6.99299 5.72615 5.72713C6.99202 4.46125 8.7089 3.7501 10.4991 3.7501C12.2893 3.7501 14.0062 4.46125 15.2721 5.72713C16.538 6.99299 17.2491 8.70988 17.2491 10.5001ZM16.0191 17.6101C14.2107 19.0141 11.9352 19.676 9.65582 19.4612C7.37647 19.2466 5.26463 18.1712 3.75025 16.4542C2.23585 14.7372 1.43275 12.5075 1.50442 10.2192C1.5761 7.9309 2.51717 5.7559 4.13605 4.13702C5.75494 2.51815 7.92992 1.57708 10.2182 1.50539C12.5066 1.43372 14.7362 2.23682 16.4532 3.75122C18.1703 5.26561 19.2456 7.37744 19.4603 9.6568C19.6751 11.9361 19.0131 14.2117 17.6091 16.0201L22.1691 20.5801C22.2797 20.6831 22.3683 20.8073 22.4298 20.9453C22.4913 21.0833 22.5243 21.2323 22.527 21.3833C22.5297 21.5344 22.5018 21.6844 22.4453 21.8245C22.3887 21.9646 22.3044 22.0918 22.1976 22.1986C22.0908 22.3055 21.9636 22.3897 21.8235 22.4462C21.6834 22.5028 21.5334 22.5307 21.3824 22.528C21.2313 22.5253 21.0822 22.4923 20.9444 22.4308C20.8064 22.3693 20.6822 22.2806 20.5791 22.1701L16.0191 17.6101Z" fill="black" fill-opacity="0.6" />
                </svg>
                <input type="text" placeholder='Название страны' className="outline-0 font-medium py-[15px] w-full" />
            </div>

            <div className='flex flex-col h-[264.25px] overflow-auto transactions-table-scroll pr-4'>
                <div className="flex items-center justify-between gap-2.5 py-[13px] font-medium cursor-pointer">
                    <div className='flex items-center gap-2'>
                        <img src="/esim/AU.png" alt="australia" className='w-[36px]' />
                        <p>Австралия</p>
                    </div>
                    <p className='text-[#00000099] text-[14px]'>8 тарифов</p>
                </div>
                <div className="flex items-center justify-between gap-2.5 py-[13px] font-medium cursor-pointer">
                    <div className='flex items-center gap-2'>
                        <img src="/esim/AU.png" alt="australia" className='w-[36px]' />
                        <p>Австралия</p>
                    </div>
                    <p className='text-[#00000099] text-[14px]'>8 тарифов</p>
                </div>
                <div className="flex items-center justify-between gap-2.5 py-[13px] font-medium cursor-pointer">
                    <div className='flex items-center gap-2'>
                        <img src="/esim/AU.png" alt="australia" className='w-[36px]' />
                        <p>Австралия</p>
                    </div>
                    <p className='text-[#00000099] text-[14px]'>8 тарифов</p>
                </div>
                <div className="flex items-center justify-between gap-2.5 py-[13px] font-medium cursor-pointer">
                    <div className='flex items-center gap-2'>
                        <img src="/esim/AU.png" alt="australia" className='w-[36px]' />
                        <p>Австралия</p>
                    </div>
                    <p className='text-[#00000099] text-[14px]'>8 тарифов</p>
                </div>
                <div className="flex items-center justify-between gap-2.5 py-[13px] font-medium cursor-pointer">
                    <div className='flex items-center gap-2'>
                        <img src="/esim/AU.png" alt="australia" className='w-[36px]' />
                        <p>Австралия</p>
                    </div>
                    <p className='text-[#00000099] text-[14px]'>8 тарифов</p>
                </div>
                <div className="flex items-center justify-between gap-2.5 py-[13px] font-medium cursor-pointer">
                    <div className='flex items-center gap-2'>
                        <img src="/esim/AU.png" alt="australia" className='w-[36px]' />
                        <p>Австралия</p>
                    </div>
                    <p className='text-[#00000099] text-[14px]'>8 тарифов</p>
                </div>
            </div>
        </div>
    )
}

export default Country