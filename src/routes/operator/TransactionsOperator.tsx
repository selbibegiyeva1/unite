import Transactions from '../../components/transactions/Transactions';
import Filter from '../../components/transactions/Filter';

function TransactionsOperator() {
    document.title = 'Unite Shop - Транзакции';
    return (
        <div className='px-6 mt-[28px] pb-[100px]'>
            <div className='w-[1680px] m-auto'>
                <p className='text-[36px] font-bold mb-5'>Транзакции</p>
                <div className='mb-5'>
                    <Filter />
                </div>
                <Transactions />
            </div>
        </div>
    )
}

export default TransactionsOperator