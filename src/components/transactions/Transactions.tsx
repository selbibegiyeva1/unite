import { useState } from 'react';

interface Transaction {
    id: string;
    date: string;
    email: string;
    transactionId: string;
    operator: string;
    category: string;
    description: string;
    amount: string;
    status: 'success' | 'pending' | 'failed';
    link: string;
}

function Transactions() {
    const [transactions] = useState<Transaction[]>([
        {
            id: '1',
            date: '6 авг. 2024 г. 15:56',
            email: 'Ruslanchik121@gmail.com',
            transactionId: 'x0565847856584785',
            operator: 'Гуванч',
            category: 'eSIM',
            description: 'Merhaba 10gb, 3 day',
            amount: '+325 ТМТ',
            status: 'success',
            link: '#'
        },
        {
            id: '2',
            date: '5 авг. 2024 г. 10:23',
            email: 'user@example.com',
            transactionId: 'x0987654321098765',
            operator: 'Анна',
            category: 'Steam',
            description: 'Steam пополнение 50$',
            amount: '+450 ТМТ',
            status: 'success',
            link: '#'
        },
        {
            id: '3',
            date: '4 авг. 2024 г. 14:45',
            email: 'test@gmail.com',
            transactionId: 'x1122334455667788',
            operator: 'Иван',
            category: 'Игры',
            description: 'Roblox 1700 Robux',
            amount: '+430 ТМТ',
            status: 'pending',
            link: '#'
        },
        {
            id: '4',
            date: '3 авг. 2024 г. 09:12',
            email: 'customer@mail.ru',
            transactionId: 'x9988776655443322',
            operator: 'Мария',
            category: 'Сервисы',
            description: 'Netflix Premium 1 месяц',
            amount: '+280 ТМТ',
            status: 'failed',
            link: '#'
        },
        {
            id: '5',
            date: '2 авг. 2024 г. 16:30',
            email: 'buyer@yahoo.com',
            transactionId: 'x5566778899001122',
            operator: 'Петр',
            category: 'eSIM',
            description: 'Airalo 5gb, 7 day',
            amount: '+150 ТМТ',
            status: 'success',
            link: '#'
        },
        {
            id: '1',
            date: '6 авг. 2024 г. 15:56',
            email: 'Ruslanchik121@gmail.com',
            transactionId: 'x0565847856584785',
            operator: 'Гуванч',
            category: 'eSIM',
            description: 'Merhaba 10gb, 3 day',
            amount: '+325 ТМТ',
            status: 'success',
            link: '#'
        },
        {
            id: '2',
            date: '5 авг. 2024 г. 10:23',
            email: 'user@example.com',
            transactionId: 'x0987654321098765',
            operator: 'Анна',
            category: 'Steam',
            description: 'Steam пополнение 50$',
            amount: '+450 ТМТ',
            status: 'success',
            link: '#'
        },
        {
            id: '3',
            date: '4 авг. 2024 г. 14:45',
            email: 'test@gmail.com',
            transactionId: 'x1122334455667788',
            operator: 'Иван',
            category: 'Игры',
            description: 'Roblox 1700 Robux',
            amount: '+430 ТМТ',
            status: 'pending',
            link: '#'
        },
        {
            id: '4',
            date: '3 авг. 2024 г. 09:12',
            email: 'customer@mail.ru',
            transactionId: 'x9988776655443322',
            operator: 'Мария',
            category: 'Сервисы',
            description: 'Netflix Premium 1 месяц',
            amount: '+280 ТМТ',
            status: 'failed',
            link: '#'
        },
        {
            id: '5',
            date: '2 авг. 2024 г. 16:30',
            email: 'buyer@yahoo.com',
            transactionId: 'x5566778899001122',
            operator: 'Петр',
            category: 'eSIM',
            description: 'Airalo 5gb, 7 day',
            amount: '+150 ТМТ',
            status: 'success',
            link: '#'
        },
        {
            id: '4',
            date: '3 авг. 2024 г. 09:12',
            email: 'customer@mail.ru',
            transactionId: 'x9988776655443322',
            operator: 'Мария',
            category: 'Сервисы',
            description: 'Netflix Premium 1 месяц',
            amount: '+280 ТМТ',
            status: 'failed',
            link: '#'
        },
        {
            id: '5',
            date: '2 авг. 2024 г. 16:30',
            email: 'buyer@yahoo.com',
            transactionId: 'x5566778899001122',
            operator: 'Петр',
            category: 'eSIM',
            description: 'Airalo 5gb, 7 day',
            amount: '+150 ТМТ',
            status: 'success',
            link: '#'
        },
        {
            id: '4',
            date: '3 авг. 2024 г. 09:12',
            email: 'customer@mail.ru',
            transactionId: 'x9988776655443322',
            operator: 'Мария',
            category: 'Сервисы',
            description: 'Netflix Premium 1 месяц',
            amount: '+280 ТМТ',
            status: 'failed',
            link: '#'
        },
        {
            id: '5',
            date: '2 авг. 2024 г. 16:30',
            email: 'buyer@yahoo.com',
            transactionId: 'x5566778899001122',
            operator: 'Петр',
            category: 'eSIM',
            description: 'Airalo 5gb, 7 day',
            amount: '+150 ТМТ',
            status: 'success',
            link: '#'
        }
    ]);

    const getStatusIcon = (status: Transaction['status']) => {
        if (status === 'success') {
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3333 3.2796C12.3292 2.78059 11.1974 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 9.71833 17.4845 9.44028 17.4542 9.16667M17.5 4.16667L10 11.6667L7.5 9.16667" stroke="#14C57A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        } else if (status === 'pending') {
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.4896 8.33325H14.1693M17.4896 8.33325V4.99992M17.4896 8.33325L14.7166 5.28587C12.1132 2.68238 7.89205 2.68238 5.28856 5.28587C2.68506 7.88937 2.68506 12.1105 5.28856 14.714C7.89205 17.3175 12.1132 17.3175 14.7166 14.714C15.3699 14.0607 15.8592 13.3057 16.1846 12.4999M10.0026 7.49992V10.8333L12.5026 12.0833" stroke="#FFB01D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            );
        } else {
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 7.50003L7.5 12.5M12.5 12.5L7.5 7.50003M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#ED2428" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            );
        }
    };

    const getStatusText = (status: Transaction['status']) => {
        if (status === 'success') return 'Успешно';
        if (status === 'pending') return 'В обработке';
        return 'Ошибка';
    };

    return (
        <div>
            <div className="p-5 border border-[#00000026] rounded-[16px] h-[665px] flex flex-col">
                <div className="flex items-center justify-between">
                    <p className="font-medium text-[18px]">История транзакции</p>
                    <svg className="cursor-pointer" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="8" fill="#2D85EA" />
                        <path d="M12 18H15.7535M12 18V14M12 18L15.1347 14.3431C18.0778 11.219 22.8495 11.219 25.7927 14.3431C28.7358 17.4673 28.7358 22.5327 25.7927 25.6569C22.8495 28.781 18.0778 28.781 15.1347 25.6569C14.3963 24.873 13.8431 23.9669 13.4752 23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className="mt-3.5 flex-1 overflow-y-auto transactions-table-scroll">
                    <table className="w-full">
                        <thead>
                            <tr className="grid grid-cols-9 text-center px-[13px] py-[8px] mb-4 bg-[#F5F5F9] rounded-[6px] text-[#00000099] text-[12px]">
                                <td className="text-left">Дата</td>
                                <td>Почта</td>
                                <td>ID Транзакции</td>
                                <td>Оператор</td>
                                <td>Категория</td>
                                <td>Описание</td>
                                <td>Сумма</td>
                                <td>Статус</td>
                                <td className="text-right">Ссылка</td>
                            </tr>
                        </thead>
                        <tbody className="text-[#00000099] text-[12px]">
                            {transactions.map((transaction) => (
                                <tr key={transaction.id} className="grid grid-cols-9 text-center px-2.5 py-3 mb-[20px] rounded-[6px] text-black">
                                    <td className="text-left">{transaction.date}</td>
                                    <td>{transaction.email}</td>
                                    <td className="text-[#2D85EA] cursor-pointer">{transaction.transactionId}</td>
                                    <td>{transaction.operator}</td>
                                    <td>{transaction.category}</td>
                                    <td>{transaction.description}</td>
                                    <td>{transaction.amount}</td>
                                    <td className="flex items-center gap-2 justify-center">
                                        {getStatusIcon(transaction.status)}
                                        {getStatusText(transaction.status)}
                                    </td>
                                    <td className="text-right text-[#2D85EA]">
                                        <a href={transaction.link}>QR/Инструкция</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='flex items-center gap-2 justify-center mt-6'>
                <button className="w-9 h-9 bg-[#2D85EA] text-white rounded-[6px] text-[13px]">1</button>
                <button className="w-9 h-9 border border-[#00000026] rounded-[6px] text-[13px]">2</button>
                <button className="w-9 h-9 border border-[#00000026] rounded-[6px] text-[13px]">2</button>
                <button className="w-9 h-9 border border-[#00000026] rounded-[6px] text-[13px]">2</button>
                <button className="w-9 h-9 border border-[#00000026] rounded-[6px] text-[13px]">2</button>
            </div>
        </div>
    )
}

export default Transactions