import { useMemo } from 'react';
import { type ProductGroupForm, type ProductIdOption } from '../../../services/authService';
import { useTranslation } from '../../../hooks/useTranslation';

interface TotalProps {
    productForm: ProductGroupForm;
    activeTab: 'popolnenie' | 'voucher';
    selectedRegion: string;
    formValues: Record<string, string>;
    selectedNominal: number | null;
    isCheckboxChecked: boolean;
    onCheckboxChange: (checked: boolean) => void;
    checkboxError: boolean;
    checkboxRef: React.RefObject<HTMLDivElement | null>;
    onPayment: () => void;
    isPaymentLoading?: boolean;
    paymentError?: string | null;
}

function Total({ productForm, activeTab, selectedRegion, formValues, selectedNominal, isCheckboxChecked, onCheckboxChange, checkboxError, checkboxRef, onPayment, isPaymentLoading }: TotalProps) {
    const { t } = useTranslation();

    // Get the appropriate fields based on active tab
    const fields = activeTab === 'voucher'
        ? productForm.forms?.voucher_fields
        : productForm.forms?.topup_fields;

    // Get region name
    const regionField = fields?.find(field => field.name === 'region');
    const regionOption = regionField?.options?.find(
        opt => 'value' in opt && opt.value === selectedRegion
    );
    const regionName = regionOption && 'name' in regionOption ? regionOption.name : '';

    // Get form fields (excluding region and product_id)
    const formFields = fields?.filter(field =>
        field.name !== 'region' && field.name !== 'product_id'
    ) || [];

    // Get selected nominal price
    const productIdField = fields?.find(field => field.name === 'product_id');
    const selectedNominalData = useMemo(() => {
        if (!selectedNominal || !productIdField?.options) return null;

        return productIdField.options.find((option): option is ProductIdOption =>
            typeof option === 'object' &&
            'value' in option &&
            option.value === selectedNominal
        ) as ProductIdOption | undefined;
    }, [selectedNominal, productIdField]);

    const creditedProduct = selectedNominalData?.product || '';

    // For Steam Пополнение, use amount from form, otherwise use nominal price
    const totalAmount = (productForm.group === 'Steam' && activeTab === 'popolnenie' && formValues.amount)
        ? parseFloat(formValues.amount) || 0
        : (selectedNominalData?.price || 0);

    return (
        <div className="p-8 border-[1.5px] border-[#00000026] rounded-4xl w-[490px]">
            <p className="text-[24px] font-medium">{t.productTotal.title}</p>

            <div className="my-6">
                {/* Region */}
                {regionName && (
                    <div className="flex items-center justify-between py-4 border-b border-[#0000001A]">
                        <p className="font-medium whitespace-nowrap">{t.productTotal.regionLabel}</p>
                        <p className="font-medium ml-4">{regionName}</p>
                    </div>
                )}

                {/* Form fields */}
                {productForm.group === 'Steam' && activeTab === 'popolnenie' ? (
                    // Static fields for Steam - always show all fields
                    <>
                        <div className="flex items-center justify-between py-4 border-b border-[#0000001A]">
                            <p className="font-medium whitespace-nowrap">{t.productTotal.steamCredited}</p>
                            <p className="font-medium ml-4">{formValues.credited || '-'}$</p>
                        </div>
                    </>
                ) : (
                    // Dynamic fields from backend - show all fields
                    formFields.map((field) => {
                        const value = formValues[field.name] || '';

                        return (
                            <div key={field.name} className="flex items-center justify-between py-4 border-b border-[#0000001A]">
                                <p className="font-medium">{field.label}</p>
                                <p className="font-medium ml-4">{value || '-'}</p>
                            </div>
                        );
                    })
                )}

                {/* К зачислению */}
                {creditedProduct && (
                    <div className="flex items-center justify-between py-4 border-b border-[#0000001A]">
                        <p className="font-medium whitespace-nowrap">{t.productTotal.toBeCredited}</p>
                        <p className="font-medium text-right ml-4">{creditedProduct}</p>
                    </div>
                )}

                {/* Итого к списанию */}
                <div className="flex items-center justify-between py-4 border-b border-[#0000001A]">
                    <p className="font-medium whitespace-nowrap">{t.productTotal.totalToDebit}</p>
                    <p className="font-medium ml-4">{totalAmount} TMT</p>
                </div>
            </div>

            <div className={`flex items-center gap-2.5`} ref={checkboxRef}>
                {/* Checkbox */}
                <div
                    className="cursor-pointer relative"
                    onClick={() => onCheckboxChange(!isCheckboxChecked)}
                >
                    <svg className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect
                            x="0.75"
                            y="0.75"
                            width="22.5"
                            height="22.5"
                            rx="3.25"
                            stroke={checkboxError ? "#EF4444" : "black"}
                            strokeOpacity={checkboxError ? "1" : "0.15"}
                            strokeWidth={checkboxError ? "2" : "1.5"}
                            fill={isCheckboxChecked ? "#2D85EA" : "none"}
                        />
                        {isCheckboxChecked && (
                            <path
                                d="M7 12L10.5 15.5L17 9"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        )}
                    </svg>
                </div>
                <p className="text-[14px] font-medium">{t.esim.modal.checkboxText}</p>
            </div>

            <button
                onClick={onPayment}
                disabled={isPaymentLoading}
                className={`mt-6 w-full outline-0 text-[14px] font-medium bg-[#2D85EA] text-white p-[11px] rounded-[8px] cursor-pointer ${isPaymentLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isPaymentLoading ? t.esim.modal.processing : t.esim.modal.pay}
            </button>
        </div>
    )
}

export default Total