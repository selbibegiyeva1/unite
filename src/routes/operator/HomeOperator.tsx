import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

import Transactions from '../../components/transactions/Transactions';

function HomeOperator() {
    const { user } = useAuth();
    if (!user) {
        return <div>Loading...</div>;
    }

    document.title = 'Unite Shop - Главная';

    return (
        <div className="px-6 pb-[100px] mt-[28px]">
            <div className='w-[1680px] m-auto'>
                <div className="flex justify-between mb-6">
                    <div>
                        <h1 className="text-[26px] font-bold">Основные разделы</h1>

                        <div className='mt-4 flex gap-4'>
                            <Link to="/operator/product?group=Steam">
                                <div className="overflow-hidden rounded-[24px]">
                                    <img src="/home/1.png" alt="home" className='max-w-[200px] transition-transform duration-200 hover:scale-105' />
                                </div>
                                <b className='pt-3 flex justify-center'>Steam</b>
                            </Link>
                            <Link to="/operator/products">
                                <div className="overflow-hidden rounded-[24px]">
                                    <img src="/home/2.png" alt="home" className='max-w-[200px] transition-transform duration-200 hover:scale-105' />
                                </div>
                                <b className='pt-3 flex justify-center'>Игры</b>
                            </Link>
                            <Link to="/operator/products">
                                <div className="overflow-hidden rounded-[24px]">
                                    <img src="/home/3.png" alt="home" className='max-w-[200px] transition-transform duration-200 hover:scale-105' />
                                </div>
                                <b className='pt-3 flex justify-center'>Сервисы</b>
                            </Link>
                            <Link to="/operator/esim">
                                <div className="overflow-hidden rounded-[24px]">
                                    <img src="/home/4.png" alt="home" className='max-w-[200px] transition-transform duration-200 hover:scale-105' />
                                </div>
                                <b className='pt-3 flex justify-center'>eSIM</b>
                            </Link>
                        </div>
                    </div>
                    <div className='w-[566px] h-[260px] p-8 border border-[#00000026] rounded-[16px]'>
                        <div className='flex items-center gap-2'>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.9974 6.66667H24.9409C25.7087 6.66667 26.1901 7.49615 25.8091 8.16281L21.9066 14.9923C21.5505 15.6154 20.8878 16 20.1701 16H10.6641M10.6641 16L8.28698 19.8033C7.8707 20.4694 8.34954 21.3333 9.13498 21.3333H23.9974M10.6641 16L5.21685 5.10557C4.87806 4.428 4.18554 4 3.42799 4H2.66406M10.6641 26.6667C10.6641 27.403 10.0671 28 9.33073 28C8.59435 28 7.9974 27.403 7.9974 26.6667C7.9974 25.9303 8.59435 25.3333 9.33073 25.3333C10.0671 25.3333 10.6641 25.9303 10.6641 26.6667ZM23.9974 26.6667C23.9974 27.403 23.4004 28 22.6641 28C21.9277 28 21.3307 27.403 21.3307 26.6667C21.3307 25.9303 21.9277 25.3333 22.6641 25.3333C23.4004 25.3333 23.9974 25.9303 23.9974 26.6667Z" stroke="#5682FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p className='text-[18px] font-medium'>Баланс</p>
                        </div>
                        <div className='mt-6 text-[20px] font-medium'>
                            <div className='flex items-center justify-between'>
                                <p>Доступно</p>
                                <p>45,12 ТМТ</p>
                            </div>
                            <div className='flex items-center justify-between mt-4'>
                                <p>Режим</p>
                                <p>Депозит</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-7 mb-6 border border-[#00000026] p-8 text-[24px] rounded-[24px] w-fit'>
                    <b>Сегодня по операциям</b>
                </div>

                <Transactions />
            </div>
        </div>
    );
}

export default HomeOperator;