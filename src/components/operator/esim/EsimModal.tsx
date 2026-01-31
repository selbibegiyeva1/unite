import { useEffect } from 'react';
import type { EsimTariff } from '../../../services/authService';
import type { EsimTab } from '../../../hooks/operator/esim/useEsimLocations';
import { useTranslation } from '../../../hooks/useTranslation';

interface EsimModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedTariff: { tariff: EsimTariff; activeTab: EsimTab; selectedName: string | null; coverageCount?: number | null } | null;
    formValues: Record<string, string>;
    onFormChange: (values: Record<string, string>) => void;
    isCheckboxChecked: boolean;
    onCheckboxChange: (checked: boolean) => void;
    validationErrors: { formFields: Record<string, boolean>; checkbox: boolean };
    formRefs: React.MutableRefObject<Record<string, HTMLInputElement | null>>;
    checkboxRef: React.RefObject<HTMLDivElement | null>;
    onPayment: () => void;
    isPaymentLoading?: boolean;
}

function formatTraffic(traffic: number): string {
    if (traffic >= 1024) {
        const gb = traffic / 1024;
        return `${gb % 1 === 0 ? gb : gb.toFixed(1)} GB`;
    }
    return `${traffic} MB`;
}

function formatDays(days: number): string {
    if (days === 1) {
        return '1 день';
    }
    if (days >= 2 && days <= 4) {
        return `${days} дня`;
    }
    return `${days} дней`;
}

function EsimModal({ isOpen, onClose, selectedTariff, formValues, onFormChange, isCheckboxChecked, onCheckboxChange, validationErrors, formRefs, checkboxRef, onPayment, isPaymentLoading }: EsimModalProps) {
    const { t } = useTranslation();
    const handleInputChange = (name: string, value: string) => {
        onFormChange({
            ...formValues,
            [name]: value
        });
    };
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

    // Modal data commit

    return (
        <div
            className={`fixed inset-0 z-40 grid place-items-center overflow-auto bg-[#00000059] p-4 transition-opacity duration-200 ${
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            onClick={onClose}
        >
            <div
                className={`w-full max-w-[1160px] bg-white p-8 max-1md:p-6 rounded-3xl grid grid-cols-1 lg:grid-cols-2 gap-[26px] transform transition-transform duration-200 ${
                    isOpen ? "translate-y-0" : "translate-y-2"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div>
                    <p className="text-[24px] font-medium mb-[24px]">{t.esim.modal.title}</p>
                    <div className="px-4 pt-[8px] pb-[24px] bg-[#F5F5F9] rounded-2xl">
                        {selectedTariff && (
                            <>
                                {selectedTariff.activeTab === 'regions' && selectedTariff.coverageCount !== null && (
                                    <div className="py-[18px] border-b flex items-center justify-between border-[#00000026] font-medium">
                                        <p>{t.esim.modal.coverage}</p>
                                        <p>{selectedTariff.coverageCount} {t.esim.modal.coverageSuffix}</p>
                                    </div>
                                )}
                                {selectedTariff.activeTab === 'countries' && (
                                    <div className="py-[18px] border-b flex items-center justify-between border-[#00000026] font-medium">
                                        <p>{t.esim.modal.countryLabel}</p>
                                        <p>{selectedTariff.selectedName || selectedTariff.tariff.operator}</p>
                                    </div>
                                )}
                                <div className="py-[18px] border-b flex items-center justify-between border-[#00000026] font-medium">
                                    <p>{t.esim.modal.traffic}</p>
                                    <p>{formatTraffic(selectedTariff.tariff.traffic)}</p>
                                </div>
                                <div className="py-[18px] flex items-center justify-between font-medium">
                                    <p>{t.esim.modal.validity}</p>
                                    <p className="text-[#00000099]">{formatDays(selectedTariff.tariff.days)}</p>
                                </div>
                                <div className="mt-8 flex items-center justify-between font-bold text-[18px]">
                                    <p>{t.esim.modal.amount}</p>
                                    <p>{selectedTariff.tariff.price_tmt} ТМТ</p>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex items-center gap-2 my-4 text-[#F50100] text-[14px] font-medium">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 16H12.01M12 8V12M9 4H15L20 9V15L15 20H9L4 15V9L9 4Z" stroke="#F50100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p>{t.esim.modal.nonRefundableNote}</p>
                    </div>
                    <p className="text-[14px] font-medium w-full max-w-[440px]">
                        {t.esim.modal.afterPaymentNote}
                    </p>
                </div>
                <div className="px-6 pt-6 pb-9.5 border border-[#00000026] rounded-3xl">
                    <div className="flex items-center justify-between mb-[24px]">
                        <p className="text-[24px] font-medium">{t.esim.modal.clientDataTitle}</p>
                        <svg onClick={onClose} className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 6L18 18M18 6L6 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div>
                            <span className="text-[15px] font-medium mb-2 block">{t.esim.modal.emailLabel}</span>
                            <input
                                ref={(el) => { formRefs.current['email'] = el; }}
                                type="email"
                                value={formValues['email'] || ''}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={`w-full font-medium outline-0 rounded-[10px] px-4 py-[12.5px] border border-[#00000026] ${validationErrors.formFields['email'] ? 'border-red-500' : ''}`}
                                placeholder={t.esim.modal.emailPlaceholder}
                            />
                        </div>
                        <div>
                            <span className="text-[15px] font-medium mb-2 block">{t.esim.modal.phoneLabel}</span>
                            <input
                                ref={(el) => { formRefs.current['phone'] = el; }}
                                type="tel"
                                value={formValues['phone'] || ''}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className={`w-full font-medium outline-0 rounded-[10px] px-4 py-[12.5px] border border-[#00000026] ${validationErrors.formFields['phone'] ? 'border-red-500' : ''}`}
                                placeholder={t.esim.modal.phonePlaceholder}
                            />
                        </div>
                    </div>
                    <div className="mt-6 px-4 pt-4 pb-6 bg-[#F5F5F9] rounded-2xl">
                        <div className="flex items-center justify-between font-medium py-4.5 border-b border-[#00000026]">
                            <p>{t.esim.modal.tariffCost}</p>
                            <p className='text-right text-nowrap'>{selectedTariff ? `${selectedTariff.tariff.price_tmt} ТМТ` : '-'}</p>
                        </div>
                        <div className="flex mt-4 items-center justify-between font-bold text-[18px]">
                            <p>{t.esim.modal.total}</p>
                            <p className='text-right text-nowrap'>{selectedTariff ? `${selectedTariff.tariff.price_tmt} ТМТ` : '-'}</p>
                        </div>
                    </div>

                    <div className={`flex items-center gap-2.5 mt-6`} ref={checkboxRef}>
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
                                    stroke={validationErrors.checkbox ? "#EF4444" : "black"}
                                    strokeOpacity={validationErrors.checkbox ? "1" : "0.15"}
                                    strokeWidth={validationErrors.checkbox ? "2" : "1.5"}
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
                        className={`mt-6 w-full text-[14px] font-medium bg-[#2D85EA] text-white p-[11px] rounded-[8px] cursor-pointer ${isPaymentLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isPaymentLoading ? t.esim.modal.processing : t.esim.modal.pay}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EsimModal