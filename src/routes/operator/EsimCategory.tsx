import { useState, useEffect } from 'react';
import Country from '../../components/operator/esim/Country';
import Tariff from '../../components/operator/esim/Tariff';
import EsimFaq from '../../components/operator/esim/EsimFaq';
import type { EsimTab } from '../../hooks/operator/esim/useEsimLocations';
import RegionModal from '../../components/operator/esim/RegionModal';
import EsimModal from '../../components/operator/esim/EsimModal';
import Alert from '../../components/operator/product/Alert';
import { useEsimValidation } from '../../hooks/operator/esim/useEsimValidation';
import authService from '../../services/authService';
import { useTranslation } from '../../hooks/useTranslation';

function EsimCategory() {
    const { t } = useTranslation();
    document.title = t.esim.category.pageTitle;
    const [activeTab, setActiveTab] = useState<EsimTab>('countries');
    // Defaults:
    // - countries: Afghanistan -> AF
    // - regions: Africa -> africa
    const [selectedCodeForApi, setSelectedCodeForApi] = useState<string | null>('AF');
    const [selectedName, setSelectedName] = useState<string | null>(null);
    const [selectedFlagUrl, setSelectedFlagUrl] = useState<string | null>(null);
    const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
    const [regionCountryCodes, setRegionCountryCodes] = useState<string[]>([]);
    const [isEsimModalOpen, setIsEsimModalOpen] = useState(false);
    const [selectedTariff, setSelectedTariff] = useState<{ tariff: import('../../services/authService').EsimTariff; activeTab: EsimTab; selectedName: string | null; coverageCount?: number | null } | null>(null);
    const [formValues, setFormValues] = useState<Record<string, string>>({});
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [validationErrors, setValidationErrors] = useState<{ formFields: Record<string, boolean>; checkbox: boolean }>({
        formFields: {},
        checkbox: false,
    });
    const [isPaymentLoading, setIsPaymentLoading] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    // Validation hook
    const { validateAndScroll, formRefs, checkboxRef } = useEsimValidation({
        formValues,
        isCheckboxChecked,
    });

    // Close modal when payment error occurs so the fixed alert is visible
    useEffect(() => {
        if (paymentError) {
            setIsEsimModalOpen(false);
        }
    }, [paymentError]);

    return (
        <div className='px-20 max-1lg:px-15 max-md:px-8 max-sm:px-4 mt-[28px] pb-[100px]'>
            <div className='max-w-[1680px] m-auto'>
                <p className='text-[36px] font-bold'>{t.esim.category.heading}</p>
                <div className='mt-8 mb-[56px]'>
                    <Country
                        activeTab={activeTab}
                        setActiveTab={(tab) => {
                            setActiveTab(tab);
                            setIsRegionModalOpen(false);
                            // Set default selection when switching between tabs
                            if (tab === 'countries') {
                                setSelectedCodeForApi('AF');
                            } else {
                                setSelectedCodeForApi('africa');
                            }
                            setSelectedName(null);
                            setSelectedFlagUrl(null);
                        }}
                        onSelectLocation={({ codeForApi, displayName, imageUrl }) => {
                            setSelectedCodeForApi(codeForApi);
                            setSelectedName(displayName);
                            setSelectedFlagUrl(imageUrl);
                        }}
                    />
                </div>
                <div className='mb-[72px]'>
                    <Tariff
                        activeTab={activeTab}
                        selectedCodeForApi={selectedCodeForApi}
                        selectedName={selectedName}
                        selectedFlagUrl={selectedFlagUrl}
                        onOpenRegionModal={(codes) => {
                            setRegionCountryCodes(codes);
                            setIsRegionModalOpen(true);
                        }}
                        onBuyTariff={(tariff, coverageCount) => {
                            setSelectedTariff({
                                tariff,
                                activeTab,
                                selectedName,
                                coverageCount: coverageCount ?? null
                            });
                            setIsEsimModalOpen(true);
                        }}
                    />
                </div>
                <EsimFaq />
            </div>
            <RegionModal
                isOpen={isRegionModalOpen}
                onClose={() => setIsRegionModalOpen(false)}
                countryCodes={regionCountryCodes}
            />
            <EsimModal
                isOpen={isEsimModalOpen}
                onClose={() => {
                    setIsEsimModalOpen(false);
                    setSelectedTariff(null);
                    setFormValues({});
                    setIsCheckboxChecked(false);
                    setValidationErrors({ formFields: {}, checkbox: false });
                    setPaymentError(null);
                }}
                selectedTariff={selectedTariff}
                formValues={formValues}
                onFormChange={setFormValues}
                isCheckboxChecked={isCheckboxChecked}
                onCheckboxChange={setIsCheckboxChecked}
                validationErrors={validationErrors}
                formRefs={formRefs}
                checkboxRef={checkboxRef}
                onPayment={async () => {
                    // Validate form
                    const { isValid, errors } = validateAndScroll();
                    setValidationErrors(errors);
                    if (!isValid) {
                        return;
                    }
                    
                    // Ensure we have selected tariff
                    if (!selectedTariff) {
                        return;
                    }
                    
                    // Clear previous errors
                    setPaymentError(null);
                    
                    // Handle payment
                    setIsPaymentLoading(true);
                    try {
                        const response = await authService.buyEsim({
                            tariff_name: selectedTariff.tariff.name,
                            client_email: formValues['email'] || '',
                            client_phone: formValues['phone'] || '',
                        });
                        
                        // Redirect to voucher URL
                        if (response.voucher) {
                            window.location.href = response.voucher;
                        } else {
                            setPaymentError('Не удалось получить ссылку на ваучер');
                        }
                    } catch (err: any) {
                        console.error('Payment error:', err);
                        const data = err?.response?.data;
                        const errorMessage =
                            (typeof data?.comment === 'string' && data.comment) ||
                            data?.message ||
                            err?.message ||
                            'Произошла ошибка при обработке платежа';
                        setPaymentError(errorMessage);
                    } finally {
                        setIsPaymentLoading(false);
                    }
                }}
                isPaymentLoading={isPaymentLoading}
            />
            {paymentError && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[360px] z-50">
                    <Alert message={paymentError} onClose={() => setPaymentError(null)} />
                </div>
            )}
        </div>
    )
}

export default EsimCategory