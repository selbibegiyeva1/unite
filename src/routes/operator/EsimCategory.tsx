import { useState } from 'react';
import Country from '../../components/operator/esim/Country';
import Tariff from '../../components/operator/esim/Tariff';
import EsimFaq from '../../components/operator/esim/EsimFaq';
import type { EsimTab } from '../../hooks/operator/esim/useEsimLocations';
import RegionModal from '../../components/operator/esim/RegionModal';
import EsimModal from '../../components/operator/esim/EsimModal';
import { useEsimValidation } from '../../hooks/operator/esim/useEsimValidation';

function EsimCategory() {
    document.title = 'Unite Shop - eSIM';
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

    // Validation hook
    const { validateAndScroll, formRefs, checkboxRef } = useEsimValidation({
        formValues,
        isCheckboxChecked,
    });

    return (
        <div className='px-6 mt-[28px] pb-[100px]'>
            <div className='w-[1680px] m-auto'>
                <p className='text-[36px] font-bold'>e-SIM</p>
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
                    
                    // Handle payment
                    setIsPaymentLoading(true);
                    try {
                        // TODO: Implement payment logic
                        console.log('Processing payment...');
                    } finally {
                        setIsPaymentLoading(false);
                    }
                }}
                isPaymentLoading={isPaymentLoading}
            />
        </div>
    )
}

export default EsimCategory