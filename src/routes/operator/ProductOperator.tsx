import { useState, useEffect } from 'react';
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
    const [selectedRegion, setSelectedRegion] = useState<string>('');

    // Set default tab based on available fields
    useEffect(() => {
        if (!productForm?.forms) return;

        const hasTopupFields = productForm.forms.topup_fields !== null && productForm.forms.topup_fields !== undefined;
        const hasVoucherFields = productForm.forms.voucher_fields !== null && productForm.forms.voucher_fields !== undefined;

        // If topup_fields is null/empty, default to 'voucher'
        if (!hasTopupFields && hasVoucherFields) {
            setActiveTab('voucher');
        }
        // If voucher_fields is null/empty, default to 'popolnenie'
        else if (!hasVoucherFields && hasTopupFields) {
            setActiveTab('popolnenie');
        }
    }, [productForm]);

    // Set first region as default when productForm loads or tab changes
    useEffect(() => {
        if (!productForm?.forms) {
            setSelectedRegion('');
            return;
        }

        const fields = activeTab === 'voucher'
            ? productForm.forms.voucher_fields
            : productForm.forms.topup_fields;

        const regionField = fields?.find(field => field.name === 'region');
        const regionOptions = regionField?.options || [];

        // Get the first valid region option
        const firstRegionOption = regionOptions
            .filter((option): option is { name: string; value: string } =>
                'name' in option && 'value' in option && typeof option.value === 'string'
            )[0];

        if (firstRegionOption) {
            setSelectedRegion(firstRegionOption.value);
        } else {
            setSelectedRegion('');
        }
    }, [productForm, activeTab]);

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
                        <Region
                            productForm={productForm}
                            activeTab={activeTab}
                            selectedRegion={selectedRegion}
                            onRegionChange={setSelectedRegion}
                        />
                        <Nominals
                            productForm={productForm}
                            selectedRegion={selectedRegion}
                            activeTab={activeTab}
                        />
                        <Form
                            productForm={productForm}
                            activeTab={activeTab}
                        />
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