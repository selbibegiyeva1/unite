import { useState, useMemo, useEffect } from 'react';
import { type ProductGroupForm, type ProductIdOption } from '../../../services/authService';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    productForm: ProductGroupForm;
    activeTab: 'popolnenie' | 'voucher';
    selectedRegion: string;
    formValues: Record<string, string>;
    selectedNominal: number | null;
    onPayment: () => void;
    isPaymentLoading?: boolean;
    paymentError?: string | null;
}

function Modal({ isOpen, onClose, productForm, activeTab, selectedRegion, formValues, selectedNominal, onPayment, isPaymentLoading, paymentError }: ModalProps) {
    const [isModalCheckboxChecked, setIsModalCheckboxChecked] = useState(false);

    // Close modal on ESC key press
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen, onClose]);

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
        <div
            className={`fixed inset-0 z-40 grid place-items-center overflow-auto bg-[#00000059] p-4 transition-opacity duration-200 ${
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            onClick={onClose}
        >
            <div
                className={`p-8 border-[1.5px] border-[#00000026] rounded-4xl w-[490px] bg-white transform transition-transform duration-200 ${
                    isOpen ? "translate-y-0" : "translate-y-2"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between">
                    <p className="text-[24px] font-medium">Оплата</p>
                    <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor-pointer"
                        onClick={onClose}
                    >
                        <path d="M6 6L18 18M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                <div className="my-6">
                    <div className='bg-[#F5F5F9] rounded-[16px] px-4 pt-4 pb-6'>
                        {/* Region */}
                        {regionName && (
                            <div className={`flex items-center justify-between py-4 ${(productForm.group === 'Steam' && activeTab === 'popolnenie') ? (formValues.login || formValues.email || formValues.amount ? 'border-b border-[#0000001A]' : '') : (formFields.length > 0 ? 'border-b border-[#0000001A]' : '')}`}>
                                <p className="font-medium whitespace-nowrap">Регион</p>
                                <p className="font-medium ml-4">{regionName}</p>
                            </div>
                        )}

                        {/* Form fields */}
                        {productForm.group === 'Steam' && activeTab === 'popolnenie' ? (
                            // Static fields for Steam
                            <>
                                {formValues.login && (
                                    <div className={`flex items-center justify-between py-4 ${(formValues.email || formValues.amount) ? 'border-b border-[#0000001A]' : ''}`}>
                                        <p className="font-medium whitespace-nowrap">Введите логин в Steam</p>
                                        <p className="font-medium ml-4">{formValues.login}</p>
                                    </div>
                                )}
                                {formValues.email && (
                                    <div className={`flex items-center justify-between py-4 ${formValues.amount ? 'border-b border-[#0000001A]' : ''}`}>
                                        <p className="font-medium whitespace-nowrap">Введите свою почту</p>
                                        <p className="font-medium ml-4 truncate min-w-0 max-w-[200px] text-right">{formValues.email}</p>
                                    </div>
                                )}
                                {formValues.amount && (
                                    <div className="flex items-center justify-between py-4">
                                        <p className="font-medium whitespace-nowrap">Сумма пополнения в ТМТ</p>
                                        <p className="font-medium ml-4">{formValues.amount} TMT</p>
                                    </div>
                                )}
                            </>
                        ) : (
                            // Dynamic fields from backend - show all fields
                            formFields.map((field, index) => {
                                const value = formValues[field.name] || '';
                                const isLast = index === formFields.length - 1;

                                return (
                                    <div key={field.name} className={`flex items-center justify-between py-4 ${!isLast ? 'border-b border-[#0000001A]' : ''}`}>
                                        <p className="font-medium">{field.label}</p>
                                        <p className="font-medium ml-4">{value || '-'}</p>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className='flex items-center gap-2.5 my-4'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 16H12.01M12 8V12M9 4H15L20 9V15L15 20H9L4 15V9L9 4Z" stroke="#F50100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p className='text-[#F50100] text-[14px] font-medium'>Товар возврату не подлежит</p>
                    </div>

                    <div className='bg-[#F5F5F9] rounded-[16px] px-4 pt-4 pb-6'>
                        {/* К зачислению */}
                        {productForm.group === 'Steam' && activeTab === 'popolnenie' ? (
                            // For Steam, show "К зачислению в Steam"
                            <div className="flex items-center justify-between py-4 border-b border-[#0000001A]">
                                <p className="font-medium whitespace-nowrap">К зачислению в Steam</p>
                                <p className="font-medium ml-4">{formValues.credited || '-'}$</p>
                            </div>
                        ) : (
                            // For other products, show "К зачислению" if creditedProduct exists
                            creditedProduct && (
                                <div className="flex items-center justify-between py-4 border-b border-[#0000001A]">
                                    <p className="font-medium whitespace-nowrap">К зачислению</p>
                                    <p className="font-medium text-right ml-4">{creditedProduct}</p>
                                </div>
                            )
                        )}

                        {/* Итого к списанию */}
                        <div className="flex items-center justify-between py-4 text-[18px]">
                            <p className="font-bold whitespace-nowrap">Итого к списанию</p>
                            <p className="font-bold ml-4">{totalAmount} TMT</p>
                        </div>
                    </div>

                </div>

                <div className="flex items-center gap-2.5">
                    {/* Checkbox */}
                    <div
                        className="cursor-pointer relative"
                        onClick={() => setIsModalCheckboxChecked(!isModalCheckboxChecked)}
                    >
                        <svg className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect
                                x="0.75"
                                y="0.75"
                                width="22.5"
                                height="22.5"
                                rx="3.25"
                                stroke="black"
                                strokeOpacity="0.15"
                                strokeWidth="1.5"
                                fill={isModalCheckboxChecked ? "#2D85EA" : "none"}
                            />
                            {isModalCheckboxChecked && (
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
                    <p className="text-[14px] font-medium">Я потдверждаю, что правильно указал все данные</p>
                </div>

                {paymentError && (
                    <p className="mt-4 text-red-500 text-[12px] text-center">{paymentError}</p>
                )}
                <button
                    onClick={onPayment}
                    disabled={isPaymentLoading || !isModalCheckboxChecked}
                    className={`mt-6 w-full text-[14px] font-medium bg-[#2D85EA] text-white p-[11px] rounded-[8px] cursor-pointer ${(isPaymentLoading || !isModalCheckboxChecked) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isPaymentLoading ? 'Обработка...' : 'Оплатить'}
                </button>
                <button
                    onClick={onClose}
                    className="mt-3 w-full text-[14px] font-medium bg-[#F5F5F9] text-black p-[11px] rounded-[8px] cursor-pointer"
                >
                    Отмена
                </button>
            </div>
        </div>
    )
}

export default Modal