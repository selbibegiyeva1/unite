import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProductGroupForm } from '../../hooks/operator/product/useProductGroupForm';
import { useProductValidation } from '../../hooks/operator/product/useProductValidation';
import { useSteamInfo } from '../../hooks/operator/product/useSteamInfo';
import { usePayment } from '../../hooks/operator/product/usePayment';
import Header from '../../components/operator/product/Header';
import Region from '../../components/operator/product/Region';
import Nominals from '../../components/operator/product/Nominals';
import Form from '../../components/operator/product/Form';
import ProductFaq from '../../components/operator/product/ProductFaq';
import Total from '../../components/operator/product/Total';
import Modal from '../../components/operator/product/Modal';
import { useTranslation } from '../../hooks/useTranslation';

function ProductOperator() {
    const [searchParams] = useSearchParams();
    const groupName = searchParams.get('group');
    const { data: productForm, isLoading, error } = useProductGroupForm(groupName);
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'popolnenie' | 'voucher'>('popolnenie');
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [formValues, setFormValues] = useState<Record<string, string>>({});
    const [selectedNominal, setSelectedNominal] = useState<number | null>(null);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState<{ formFields: Record<string, boolean>; checkbox: boolean }>({
        formFields: {},
        checkbox: false,
    });

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

    // Reset form values and selected nominal when tab changes
    useEffect(() => {
        setFormValues({});
        setSelectedNominal(null);
        setValidationErrors({ formFields: {}, checkbox: false });
    }, [activeTab]);

    // Fetch Steam info for validation
    const { data: steamInfo } = useSteamInfo();

    // Validation hook
    const { validateAndScroll, formRefs, checkboxRef } = useProductValidation({
        productForm,
        activeTab,
        formValues,
        isCheckboxChecked,
        steamInfo: steamInfo || null,
    });

    // Payment hook
    const { processPayment, isLoading: isPaymentLoading, error: paymentError } = usePayment({
        productForm,
        activeTab,
        formValues,
        selectedNominal,
    });

    const handleOpenModal = () => {
        const { isValid, errors } = validateAndScroll();
        setValidationErrors(errors);
        if (isValid) {
            // Open modal if validation passes
            setIsModalOpen(true);
        }
    };

    const handleModalPayment = async () => {
        // Process payment from modal
        await processPayment();
    };

    // Update document title with loading state
    useEffect(() => {
        if (isLoading) {
            document.title = t.productOperator.loadingTitle;
        } else if (productForm?.group) {
            document.title = `Unite Shop - ${productForm.group}`;
        } else {
            document.title = 'Unite Shop';
        }
    }, [isLoading, productForm?.group, t.productOperator.loadingTitle]);

    return (
        <div className='min-w-0 overflow-x-hidden px-20 max-1lg:px-15 max-md:px-8 max-sm:px-4'>
            <div className='mt-[28px] pb-[100px] w-full min-w-0 max-w-[1680px] m-auto'>
                {isLoading && (
                    <div className='flex flex-col lg:flex-row items-start gap-8'>
                        <div className='flex flex-col gap-4 w-full max-w-[1158px] min-w-0'>
                            <p className="text-[14px] text-[#00000099]">{t.productOperator.loadingProduct}</p>
                        </div>
                    </div>
                )}
                {error && !isLoading && (
                    <div className='flex flex-col lg:flex-row items-start gap-8'>
                        <div className='flex flex-col gap-4 w-full max-w-[1158px] min-w-0'>
                            <p className="text-red-500 text-[14px]">
                                {t.productOperator.loadError}
                            </p>
                        </div>
                    </div>
                )}
                {!isLoading && !error && productForm && (
                    <div>
                        <div className='flex items-start gap-8 max-slg:flex-col'>
                            <div className='flex flex-col gap-4 w-full max-w-[1158px] min-w-0'>
                                <Modal
                                    isOpen={isModalOpen}
                                    onClose={() => setIsModalOpen(false)}
                                    productForm={productForm}
                                    activeTab={activeTab}
                                    selectedRegion={selectedRegion}
                                    formValues={formValues}
                                    selectedNominal={selectedNominal}
                                    onPayment={handleModalPayment}
                                    isPaymentLoading={isPaymentLoading}
                                    paymentError={paymentError}
                                />
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
                                    selectedNominal={selectedNominal}
                                    onNominalChange={setSelectedNominal}
                                />
                                <Form
                                    productForm={productForm}
                                    activeTab={activeTab}
                                    formValues={formValues}
                                    onFormChange={setFormValues}
                                    validationErrors={validationErrors.formFields}
                                    formRefs={formRefs}
                                />
                            </div>
                            <Total
                                productForm={productForm}
                                activeTab={activeTab}
                                selectedRegion={selectedRegion}
                                formValues={formValues}
                                selectedNominal={selectedNominal}
                                isCheckboxChecked={isCheckboxChecked}
                                onCheckboxChange={setIsCheckboxChecked}
                                checkboxError={validationErrors.checkbox}
                                checkboxRef={checkboxRef}
                                onPayment={handleOpenModal}
                                isPaymentLoading={isPaymentLoading}
                                paymentError={paymentError}
                            />
                        </div>
                        <div className='mt-6'>
                            <ProductFaq
                                productForm={productForm}
                                activeTab={activeTab}
                            />
                        </div>
                    </div>
                )}
                {!groupName && !isLoading && (
                    <div className='flex flex-col lg:flex-row items-start gap-8'>
                        <div className='flex flex-col gap-4 w-full max-w-[1158px] min-w-0'>
                            <p className="text-[14px] text-[#00000099]">{t.productOperator.noGroupSelected}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductOperator