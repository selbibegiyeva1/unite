import { useState } from 'react'
import { useTranslation } from '../../../hooks/useTranslation'

const blockClasses = 'px-4 py-4.5 border-2 border-[#00000026] rounded-[16px] h-[140px] max-md:p-3.5'

const iconTruck = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.7474 4.16667H14.9409C15.7087 4.16667 16.1901 4.99615 15.8091 5.66281L13.9066 8.99228C13.5505 9.61543 12.8878 10 12.1701 10H6.66406M6.66406 10L5.53698 11.8033C5.1207 12.4694 5.59954 13.3333 6.38498 13.3333H14.9974M6.66406 10L3.46685 3.60557C3.12806 2.928 2.43554 2.5 1.67799 2.5H1.66406M6.66406 16.6667C6.66406 17.1269 6.29097 17.5 5.83073 17.5C5.37049 17.5 4.9974 17.1269 4.9974 16.6667C4.9974 16.2064 5.37049 15.8333 5.83073 15.8333C6.29097 15.8333 6.66406 16.2064 6.66406 16.6667ZM14.9974 16.6667C14.9974 17.1269 14.6243 17.5 14.1641 17.5C13.7038 17.5 13.3307 17.1269 13.3307 16.6667C13.3307 16.2064 13.7038 15.8333 14.1641 15.8333C14.6243 15.8333 14.9974 16.2064 14.9974 16.6667Z" stroke="#5682FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)
const iconChart = (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 10V11.6667M10 4.16671H4.5C3.39543 4.16671 2.5 5.06214 2.5 6.16671V11.6667M2.5 11.6667V13.8334C2.5 14.9379 3.39543 15.8334 4.5 15.8334H15.5C16.6046 15.8334 17.5 14.9379 17.5 13.8334V11.6667M2.5 11.6667H17.5M19.1667 3.33337L15 7.50004L13.3333 5.83337" stroke="#2D85EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)
const iconWallet = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.8333 6.66671V5.33337C15.8333 4.2288 14.9379 3.33337 13.8333 3.33337H5.5C3.84315 3.33337 2.5 4.67652 2.5 6.33337V13.6667C2.5 15.3236 3.84315 16.6667 5.5 16.6667H15.5C16.6046 16.6667 17.5 15.7713 17.5 14.6667V8.33337C17.5 7.4129 16.7538 6.66671 15.8333 6.66671ZM15.8333 6.66671H5.83333M14.1667 11.6667H13.3333" stroke="#2D85EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)
const iconBank = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 15.8333H17.5M10 10V15.8333M15 10V15.8333M5 10V15.8333M10.4472 2.72361L16.59 5.79502C17.4395 6.21973 17.1372 7.5 16.1875 7.5H3.81246C2.86276 7.5 2.56053 6.21973 3.40997 5.79501L9.55279 2.72361C9.83431 2.58284 10.1657 2.58284 10.4472 2.72361Z" stroke="#2D85EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)
const iconWithdraw = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 4.16671H4.5C3.39543 4.16671 2.5 5.06214 2.5 6.16671V11.6667M17.5 2.50004L13.3333 7.50004M12.5 2.50004L12.5 3.33337M18.3333 6.66671L18.3333 7.50004M2.5 11.6667V13.8334C2.5 14.9379 3.39543 15.8334 4.5 15.8334H15.5C16.6046 15.8334 17.5 14.9379 17.5 13.8334V11.6667H2.5Z" stroke="#2D85EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const initialBlocks = [
    { id: 'turnover', value: '8.672,20 ТМТ', icon: iconTruck },
    { id: 'transactions', valueAmount: '215', valueUnit: 'pieces', icon: iconChart },
    { id: 'available', value: '8.672,20 ТМТ', icon: iconWallet },
    { id: 'earned', value: '8.672,20 ТМТ', icon: iconBank },
    { id: 'withdrawn', value: '8.672,20 ТМТ', icon: iconWithdraw },
] as const

function Grid() {
    const { t } = useTranslation()
    const [blocks] = useState(initialBlocks)
    const [showTooltip, setShowTooltip] = useState(false)

    return (
        <div className="grid grid-cols-5 gap-5 max-2lg:grid-cols-4 max-lg:grid-cols-3 max-md:gap-4" id="grid">
            {blocks.map((block) => (
                <div key={block.id} className={blockClasses}>
                    <div className='flex items-center justify-between h-[32px] gap-2'>
                        <div className="flex items-center gap-2">
                            {block.icon}
                            <p className="text-[14px] font-medium max-md:text-[12px]">{t.homeDirector[block.id]}</p>
                        </div>
                        {block.id === 'available' && (
                            <div className='relative'>
                                <img
                                    src="/director.png"
                                    alt="director"
                                    className='w-[32px] shrink-0 cursor-pointer'
                                    onMouseEnter={() => setShowTooltip(true)}
                                    onMouseLeave={() => setShowTooltip(false)}
                                />
                                <p
                                    className={`absolute bottom-[-55px] right-0 w-[230px] border border-[#00000026] text-center text-[12px] font-medium bg-white px-4 py-[14.5px] rounded-[10px] pointer-events-none transition-opacity ${showTooltip ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    {t.homeDirector.availableTooltip}
                                </p>
                            </div>
                        )}
                    </div>
                    <p className="text-[24px] font-medium mt-3 max-lg:text-[20px] max-md:text-[18px] max-md:mt-2">
                        {'valueUnit' in block && block.valueUnit
                            ? `${block.valueAmount} ${block.valueUnit === 'pieces' ? t.homeDirector.pieces : t.homeDirector[block.valueUnit]}`
                            : 'value' in block && block.value}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default Grid