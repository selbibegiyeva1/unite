import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProductGroupForm } from '../../hooks/operator/product/useProductGroupForm';
import Header from '../../components/operator/product/Header';
import Region from '../../components/operator/product/Region';
import Nominals from '../../components/operator/product/Nominals';
import Form from '../../components/operator/product/Form';
import Total from '../../components/operator/product/Total';

function ProductOperator() {
    const [searchParams] = useSearchParams();
    const groupName = searchParams.get('group');
    const { data: productForm, isLoading, error } = useProductGroupForm(groupName);
    const [activeTab, setActiveTab] = useState<'popolnenie' | 'voucher'>('popolnenie');

    return (
        <div className='mt-[28px] pb-[100px] w-[1680px] m-auto'>
            {isLoading && (
                <div className='flex items-start gap-8'>
                    <div className='flex flex-col gap-4 w-[1158px]'>
                        <p className="text-[14px] text-[#00000099]">Загружаем информацию о продукте...</p>
                    </div>
                </div>
            )}
            {error && !isLoading && (
                <div className='flex items-start gap-8'>
                    <div className='flex flex-col gap-4 w-[1158px]'>
                        <p className="text-red-500 text-[14px]">
                            Не удалось загрузить информацию о продукте.
                        </p>
                    </div>
                </div>
            )}
            {!isLoading && !error && productForm && (
                <div className='flex items-start gap-8'>
                    <div className='flex flex-col gap-4 w-[1158px]'>
                        <Header productForm={productForm} activeTab={activeTab} setActiveTab={setActiveTab} />
                        <Region />
                        {activeTab === 'voucher' && <Nominals />}
                        <Form />
                    </div>
                    <Total />
                </div>
            )}
            {!groupName && !isLoading && (
                <div className='flex items-start gap-8'>
                    <div className='flex flex-col gap-4 w-[1158px]'>
                        <p className="text-[14px] text-[#00000099]">Выберите продукт для просмотра деталей.</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductOperator