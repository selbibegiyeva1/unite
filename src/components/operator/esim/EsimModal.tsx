import { useEffect } from 'react';

interface EsimModalProps {
    isOpen: boolean;
    onClose: () => void;
    formValues: Record<string, string>;
    onFormChange: (values: Record<string, string>) => void;
    isCheckboxChecked: boolean;
    onCheckboxChange: (checked: boolean) => void;
    validationErrors: { formFields: Record<string, boolean>; checkbox: boolean };
    formRefs: React.MutableRefObject<Record<string, HTMLInputElement | null>>;
    checkboxRef: React.RefObject<HTMLDivElement | null>;
    onPayment: () => void;
    isPaymentLoading?: boolean;
    paymentError?: string | null;
}

function EsimModal({ isOpen, onClose, formValues, onFormChange, isCheckboxChecked, onCheckboxChange, validationErrors, formRefs, checkboxRef, onPayment, isPaymentLoading }: EsimModalProps) {
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

    return (
        <div
            className={`fixed inset-0 z-40 grid place-items-center overflow-auto bg-[#00000059] p-4 transition-opacity duration-200 ${
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            onClick={onClose}
        >
            <div
                className={`bg-white p-8 rounded-3xl w-[1160px] grid grid-cols-2 gap-[26px] transform transition-transform duration-200 ${
                    isOpen ? "translate-y-0" : "translate-y-2"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div>
                    <p className="text-[24px] font-medium mb-[24px]">Покупка тарифа</p>
                    <div className="px-4 pt-[8px] pb-[24px] bg-[#F5F5F9] rounded-2xl">
                        <div className="py-[18px] border-b flex items-center justify-between border-[#00000026] font-medium">
                            <p>Покрытие</p>
                            <p>20 стран</p>
                        </div>
                        <div className="py-[18px] border-b flex items-center justify-between border-[#00000026] font-medium">
                            <p>Трафик</p>
                            <p>3GB</p>
                        </div>
                        <div className="py-[18px] flex items-center justify-between font-medium">
                            <p>Срок действия</p>
                            <p className="text-[#00000099]">3 дней</p>
                        </div>
                        <div className="mt-8 flex items-center justify-between font-bold text-[18px]">
                            <p>Сумма</p>
                            <p>1000 ТМТ</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 my-4 text-[#F50100] text-[14px] font-medium">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 16H12.01M12 8V12M9 4H15L20 9V15L15 20H9L4 15V9L9 4Z" stroke="#F50100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p>Товар возврату не подлежит</p>
                    </div>
                    <p className="text-[14px] font-medium w-[440px]">После оплаты вы получите письмо со ссылкой QR/Link для установки eSIM</p>
                </div>
                <div className="px-6 pt-6 pb-9.5 border border-[#00000026] rounded-3xl">
                    <div className="flex items-center justify-between mb-[24px]">
                        <p className="text-[24px] font-medium">Данные клиента</p>
                        <svg onClick={onClose} className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 6L18 18M18 6L6 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div>
                            <span className="text-[15px] font-medium mb-2 block">Электронный адрес</span>
                            <input
                                ref={(el) => { formRefs.current['email'] = el; }}
                                type="email"
                                value={formValues['email'] || ''}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={`w-full font-medium outline-0 rounded-[10px] px-4 py-[12.5px] border border-[#00000026] ${validationErrors.formFields['email'] ? 'border-red-500' : ''}`}
                                placeholder="Введите электронный адрес"
                            />
                        </div>
                        <div>
                            <span className="text-[15px] font-medium mb-2 block">Номер телефона</span>
                            <input
                                ref={(el) => { formRefs.current['phone'] = el; }}
                                type="tel"
                                value={formValues['phone'] || ''}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className={`w-full font-medium outline-0 rounded-[10px] px-4 py-[12.5px] border border-[#00000026] ${validationErrors.formFields['phone'] ? 'border-red-500' : ''}`}
                                placeholder="Введите номер телефона клиента"
                            />
                        </div>
                    </div>
                    <div className="mt-6 px-4 pt-4 pb-6 bg-[#F5F5F9] rounded-2xl">
                        <div className="flex items-center justify-between font-medium py-4.5 border-b border-[#00000026]">
                            <p>Стоимость тарифа</p>
                            <p>221 ТМТ</p>
                        </div>
                        <div className="flex mt-4 items-center justify-between font-bold text-[18px]">
                            <p>Итого</p>
                            <p>221 ТМТ</p>
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
                        <p className="text-[14px] font-medium">Я потдверждаю, что правильно указал все данные</p>
                    </div>

                    <button
                        onClick={onPayment}
                        disabled={isPaymentLoading}
                        className={`mt-6 w-full text-[14px] font-medium bg-[#2D85EA] text-white p-[11px] rounded-[8px] cursor-pointer ${isPaymentLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isPaymentLoading ? 'Обработка...' : 'Оплатить'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EsimModal