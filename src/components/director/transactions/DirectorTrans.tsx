import { useState } from "react"

interface TopupRow {
    id: string
    date: string
    transactionId: string
    balanceBefore: string
    balanceAfter: string
    amount: string
}

// TODO: replace mock data with real API integration
const mockTopups: TopupRow[] = [
    {
        id: '1',
        date: '6 авг. 2024, 15:56',
        transactionId: 'x0565847856584785',
        balanceBefore: '325 TMT',
        balanceAfter: '325 TMT',
        amount: '+325 TMT',
    },
    {
        id: '1',
        date: '6 авг. 2024, 15:56',
        transactionId: 'x0565847856584785',
        balanceBefore: '325 TMT',
        balanceAfter: '325 TMT',
        amount: '+325 TMT',
    },
    {
        id: '1',
        date: '6 авг. 2024, 15:56',
        transactionId: 'x0565847856584785',
        balanceBefore: '325 TMT',
        balanceAfter: '325 TMT',
        amount: '+325 TMT',
    },
    {
        id: '1',
        date: '6 авг. 2024, 15:56',
        transactionId: 'x0565847856584785',
        balanceBefore: '325 TMT',
        balanceAfter: '325 TMT',
        amount: '+325 TMT',
    },
    {
        id: '1',
        date: '6 авг. 2024, 15:56',
        transactionId: 'x0565847856584785',
        balanceBefore: '325 TMT',
        balanceAfter: '325 TMT',
        amount: '+325 TMT',
    },
    {
        id: '1',
        date: '6 авг. 2024, 15:56',
        transactionId: 'x0565847856584785',
        balanceBefore: '325 TMT',
        balanceAfter: '325 TMT',
        amount: '+325 TMT',
    },
    {
        id: '1',
        date: '6 авг. 2024, 15:56',
        transactionId: 'x0565847856584785',
        balanceBefore: '325 TMT',
        balanceAfter: '325 TMT',
        amount: '+325 TMT',
    },
    {
        id: '1',
        date: '6 авг. 2024, 15:56',
        transactionId: 'x0565847856584785',
        balanceBefore: '325 TMT',
        balanceAfter: '325 TMT',
        amount: '+325 TMT',
    },
    {
        id: '1',
        date: '6 авг. 2024, 15:56',
        transactionId: 'x0565847856584785',
        balanceBefore: '325 TMT',
        balanceAfter: '325 TMT',
        amount: '+325 TMT',
    },
    {
        id: '1',
        date: '6 авг. 2024, 15:56',
        transactionId: 'x0565847856584785',
        balanceBefore: '325 TMT',
        balanceAfter: '325 TMT',
        amount: '+325 TMT',
    },
    {
        id: '1',
        date: '6 авг. 2024, 15:56',
        transactionId: 'x0565847856584785',
        balanceBefore: '325 TMT',
        balanceAfter: '325 TMT',
        amount: '+325 TMT',
    },
    {
        id: '1',
        date: '6 авг. 2024, 15:56',
        transactionId: 'x0565847856584785',
        balanceBefore: '325 TMT',
        balanceAfter: '325 TMT',
        amount: '+325 TMT',
    },
]

function DirectorTrans() {
    const [isRefreshing, setIsRefreshing] = useState(false)

    const handleRefresh = async () => {
        setIsRefreshing(true)
        // placeholder for future API refetch
        await new Promise((resolve) => setTimeout(resolve, 400))
        setIsRefreshing(false)
    }

    const rows = mockTopups

    return (
        <div className="p-5 border border-[#00000026] rounded-[16px] h-[665px] flex flex-col">
            <div className="flex items-center justify-between">
                <p className="font-medium text-[18px]">История пополнений</p>

                <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-300 hover:scale-105"
                    title="Обновить"
                    type="button"
                >
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width="40" height="40" rx="8" fill="#2D85EA" />
                        <path
                            d="M12 18H15.7535M12 18V14M12 18L15.1347 14.3431C18.0778 11.219 22.8495 11.219 25.7927 14.3431C28.7358 17.4673 28.7358 22.5327 25.7927 25.6569C22.8495 28.781 18.0778 28.781 15.1347 25.6569C14.3963 24.873 13.8431 23.9669 13.4752 23"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>

            <div className="min-h-0 overflow-y-auto overflow-x-auto transactions-table-scroll mt-3.5">
                {rows.length === 0 ? (
                    <div className="flex items-center justify-center h-full min-h-[200px]">
                        <p className="text-[#00000099]">Нет данных</p>
                    </div>
                ) : (
                    <table className="w-full max-1lg:min-w-[1000px]">
                        <thead>
                            <tr className="grid grid-cols-5 gap-[30px] text-center px-[13px] py-[8px] mb-4 bg-[#F5F5F9] rounded-[6px] text-[#00000099] text-[12px]">
                                <td className="text-left">Дата</td>
                                <td>ID Транзакции</td>
                                <td>Баланс до пополнения</td>
                                <td>Баланс после</td>
                                <td className="text-right">Сумма</td>
                            </tr>
                        </thead>
                        <tbody className="text-[#00000099] text-[12px]">
                            {rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="grid grid-cols-5 gap-[30px] items-center text-center px-2.5 py-3 mb-[12px] rounded-[6px] text-black"
                                >
                                    <td className="text-left">{row.date}</td>
                                    <td className="truncate min-w-0 text-[#2D85EA] cursor-default">
                                        {row.transactionId}
                                    </td>
                                    <td>{row.balanceBefore}</td>
                                    <td>{row.balanceAfter}</td>
                                    <td className="text-right font-medium">{row.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default DirectorTrans