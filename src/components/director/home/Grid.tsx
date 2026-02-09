import { useState, useMemo, type ReactNode } from 'react'
import { useTranslation } from '../../../hooks/useTranslation'
import { useDirectorMainInfo } from '../../../hooks/director/home/useDirectorMainInfo'
import { type PeriodValue } from '../transactions/Day'

const blockClasses = 'px-4 py-4.5 border-2 border-[#00000026] rounded-[16px] h-[140px] max-md:p-3.5'

type BlockId = 'turnover' | 'transactions' | 'profit' | 'averageCheck'

type Block =
    | { id: BlockId; value: string; icon: ReactNode }
    | { id: BlockId; valueAmount: string; valueUnit: 'pieces'; icon: ReactNode }

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
        <path d="M10 4.16634H4.5C3.39543 4.16634 2.5 5.06177 2.5 6.16634V11.6663M17.5 2.49967L13.3333 7.49967M12.5 2.49967L12.5 3.33301M18.3333 6.66634L18.3333 7.49967M2.5 11.6663V13.833C2.5 14.9376 3.39543 15.833 4.5 15.833H15.5C16.6046 15.833 17.5 14.9376 17.5 13.833V11.6663H2.5Z" stroke="#2D85EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)
const iconBank = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 4.16634H4.5C3.39543 4.16634 2.5 5.06177 2.5 6.16634V11.6663M17.5 2.49967L13.3333 7.49967M12.5 2.49967L12.5 3.33301M18.3333 6.66634L18.3333 7.49967M2.5 11.6663V13.833C2.5 14.9376 3.39543 15.833 4.5 15.833H15.5C16.6046 15.833 17.5 14.9376 17.5 13.833V11.6663H2.5Z" stroke="#2D85EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)

const periodToApi = (p: PeriodValue): string => (p === 'all' ? 'all_time' : p)

function Grid({ period = 'all' }: { period?: PeriodValue }) {
    const { t, lang } = useTranslation()
    const { data, isLoading } = useDirectorMainInfo({
        category: 'ALL',
        period: periodToApi(period),
    })

    // Create blocks from API data
    const blocks = useMemo((): Block[] => {
        // Format amount with TMT currency
        const formatAmount = (value: number) => {
            return new Intl.NumberFormat(lang === 'ru' ? 'ru-RU' : 'tk-TM', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(value) + ' TMT'
        }

        // Format number (for transactions count)
        const formatNumber = (value: number) => {
            return new Intl.NumberFormat(lang === 'ru' ? 'ru-RU' : 'tk-TM').format(value)
        }

        if (isLoading || !data) {
            return [
                { id: 'turnover', value: isLoading ? 'Loading...' : '0,00 TMT', icon: iconTruck },
                { id: 'transactions', valueAmount: isLoading ? 'Loading...' : '0', valueUnit: 'pieces', icon: iconChart },
                { id: 'profit', value: isLoading ? 'Loading...' : '0,00 TMT', icon: iconBank },
                { id: 'averageCheck', value: isLoading ? 'Loading...' : '0,00 TMT', icon: iconWallet },
            ]
        }

        return [
            { id: 'turnover', value: formatAmount(data.revenue_total), icon: iconTruck },
            { id: 'transactions', valueAmount: formatNumber(data.transactions_count), valueUnit: 'pieces', icon: iconChart },
            { id: 'profit', value: formatAmount(data.cashback_tmt), icon: iconBank },
            { id: 'averageCheck', value: formatAmount(data.average_check), icon: iconWallet },
        ]
    }, [data, lang, isLoading])

    return (
        <div className="grid grid-cols-4 gap-5 max-2lg:grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1" id="grid">
            {blocks.map((block) => (
                <div key={block.id} className={blockClasses}>
                    <div className='flex items-center justify-between h-[32px] gap-2'>
                        <div className="flex items-center gap-2">
                            {block.icon}
                            <p className="text-[14px] font-medium max-md:text-[12px]">{t.homeDirector[block.id as keyof typeof t.homeDirector]}</p>
                        </div>
                    </div>
                    <p className="text-[24px] font-medium mt-3 max-lg:text-[20px] max-md:text-[18px] max-md:mt-2">
                        {'valueUnit' in block && block.valueUnit
                            ? `${block.valueAmount} ${block.valueUnit === 'pieces' ? t.homeDirector.pieces : block.valueUnit}`
                            : 'value' in block && block.value}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default Grid