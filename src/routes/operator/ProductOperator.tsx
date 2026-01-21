import { useSearchParams } from 'react-router-dom';
import { useProductGroupForm } from '../../hooks/operator/product/useProductGroupForm';

function ProductOperator() {
    const [searchParams] = useSearchParams();
    const groupName = searchParams.get('group');
    const { data: productForm, isLoading, error } = useProductGroupForm(groupName);

    return (
        <div className='px-6 mt-[28px]'>
            <div className='w-[1680px] m-auto'>
                {isLoading && (
                    <p className="text-[14px] text-[#00000099]">Загружаем информацию о продукте...</p>
                )}
                {error && !isLoading && (
                    <p className="text-red-500 text-[14px]">
                        Не удалось загрузить информацию о продукте.
                    </p>
                )}
                {!isLoading && !error && productForm && (
                    <div>
                        <h1 className="text-[32px] font-bold mb-4">{productForm.group}</h1>
                        <p className="text-[16px] text-[#00000099]">{productForm.short_info}</p>
                    </div>
                )}
                {!groupName && !isLoading && (
                    <p className="text-[14px] text-[#00000099]">Выберите продукт для просмотра деталей.</p>
                )}
            </div>
        </div>
    )
}

export default ProductOperator