import { useState } from 'react';

function Nominals() {
    const [activeNominal, setActiveNominal] = useState<number>(0);

    const baseBtn = 'font-bold px-[15px] py-[10px] rounded-[10px] cursor-pointer transition-colors';
    const activeClasses = 'bg-[#2D85EA] text-white border-2 border-[#2D85EA]';
    const inactiveClasses = 'bg-white border-2 border-[#00000026] text-black';

    const nominals = ['1000 TMT', '1000 TMT', '1000 TMT', '1000 TMT', '1000 TMT'];

    return (
        <div className="p-8 border-[1.5px] border-[#00000026] rounded-4xl">
            <p className="text-[24px] font-bold">Выберите номинал</p>

            <div className="mt-4 flex flex-wrap gap-3.5">
                {nominals.map((nominal, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setActiveNominal(index)}
                        className={`${baseBtn} ${activeNominal === index ? activeClasses : inactiveClasses}`}
                    >
                        {nominal}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Nominals