import { type ProductGroupForm } from '../../../services/authService';
import { useSteamRate } from '../../../hooks/operator/product/useSteamRate';
import { useSteamInfo } from '../../../hooks/operator/product/useSteamInfo';

interface FormProps {
    productForm: ProductGroupForm;
    activeTab: 'popolnenie' | 'voucher';
    formValues: Record<string, string>;
    onFormChange: (values: Record<string, string>) => void;
}

function Form({ productForm, activeTab, formValues, onFormChange }: FormProps) {
    const handleInputChange = (name: string, value: string) => {
        onFormChange({
            ...formValues,
            [name]: value
        });
    };

    // Check if product is Steam - use static fields
    const isSteam = productForm.group === 'Steam';
    const isSteamPopolnenie = isSteam && activeTab === 'popolnenie';

    // Fetch Steam min/max amounts
    const { data: steamInfo } = useSteamInfo();

    // Use Steam rate hook when on Steam Пополнение tab
    useSteamRate({
        amount: formValues.amount || '',
        enabled: isSteamPopolnenie,
        onSuccess: (topupAmountUsd) => {
            // Update the credited field with the response value
            onFormChange({
                ...formValues,
                credited: topupAmountUsd.toFixed(2)
            });
        },
    });

    // Validate amount against min/max
    const amountValue = parseFloat(formValues.amount || '0');
    const amountError = isSteamPopolnenie && steamInfo && formValues.amount
        ? (amountValue < steamInfo.steam_min_amount_tmt || amountValue > steamInfo.steam_max_amount_tmt)
            ? `Сумма должна быть от ${steamInfo.steam_min_amount_tmt} до ${steamInfo.steam_max_amount_tmt} ТМТ`
            : null
        : null;

    // Get the appropriate fields based on active tab
    const fields = activeTab === 'voucher'
        ? productForm.forms?.voucher_fields
        : productForm.forms?.topup_fields;

    // Filter out fields that are handled by other components
    const formFields = fields?.filter(field =>
        field.name !== 'region' && field.name !== 'product_id'
    ) || [];

    const renderField = (field: typeof formFields[0]) => {
        const inputClasses = "w-full text-[14px] font-medium outline-0 rounded-[10px] p-4 bg-[#F5F5F9]";
        const value = formValues[field.name] || '';

        switch (field.type) {
            case 'text':
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={field.label}
                        className={inputClasses}
                    />
                );

            case 'float':
            case 'number':
                return (
                    <input
                        type="number"
                        step={field.type === 'float' ? '0.01' : '1'}
                        value={value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={field.label}
                        className={inputClasses}
                    />
                );

            case 'options':
                const options = field.options?.filter((opt): opt is { name: string; value: string } =>
                    'name' in opt && 'value' in opt && typeof opt.value === 'string'
                ) || [];

                return (
                    <div className="relative">
                        <select
                            value={value}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            className={`${inputClasses} appearance-none cursor-pointer`}
                        >
                            <option value="">Выберите {field.label}</option>
                            {options.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.33854 6.66699L10.0052 13.3337L16.6719 6.66699" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                );

            default:
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={field.label}
                        className={inputClasses}
                    />
                );
        }
    };

    const inputClasses = "w-full text-[14px] font-medium outline-0 rounded-[10px] p-4 bg-[#F5F5F9]";

    // Render static fields for Steam only on Пополнение tab
    if (isSteam && activeTab === 'popolnenie') {
        return (
            <div className="p-8 border-[1.5px] border-[#00000026] rounded-4xl">
                <p className="text-[24px] font-bold">Пополнение аккаунта</p>

                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8">
                    <div>
                        <div className='pb-4 flex items-center gap-2.5'>
                            <span className="text-[14px] font-medium flex">Где искать</span>
                            <img src="/product/help.png" className='w-[28px]' alt="help" />
                        </div>
                        <input
                            type="text"
                            value={formValues.login || ''}
                            onChange={(e) => handleInputChange('login', e.target.value)}
                            placeholder="Введите логин в Steam"
                            className={inputClasses}
                        />
                    </div>
                    <div className='flex items-end'>
                        {/* <span className="text-[14px] font-medium pb-4 flex">Введите свою почту</span> */}
                        <input
                            type="email"
                            value={formValues.email || ''}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="Введите свою почту"
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <span className="text-[14px] font-medium pb-4 flex">Сумма пополнения в ТМТ</span>
                        <div
                            className={inputClasses}
                            style={{ display: "flex", alignItems: "center", justifyContent: "space-between",height: "53px" }}
                        >
                            <input
                                type="number"
                                value={formValues.amount || ''}
                                onChange={(e) => handleInputChange('amount', e.target.value)}
                                placeholder={steamInfo ? `от ${steamInfo.steam_min_amount_tmt} ТМТ` : "от 350 ТМТ"}
                                className='w-full text-[14px] font-medium outline-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                            />
                            <div className='flex items-center gap-[4px]'>

                                {/* reset value */}
                                <svg 
                                    className='cursor-pointer' 
                                    width="24" 
                                    height="24" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => handleInputChange('amount', '')}
                                >
                                    <path d="M6 6L18 18M18 6L6 18" stroke="black" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 14V16M8 9V6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V9M7 21H17C18.1046 21 19 20.1046 19 19V11C19 9.89543 18.1046 9 17 9H7C5.89543 9 5 9.89543 5 11V19C5 20.1046 5.89543 21 7 21Z" stroke="black" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        {amountError && (
                            <p className="text-red-500 text-[12px] mt-2">{amountError}</p>
                        )}
                    </div>
                    <div>
                        <span className="text-[14px] font-medium pb-4 flex">К зачислению в Steam</span>
                        <input
                            type="text"
                            value={formValues.credited ? `~${formValues.credited} $` : ''}
                            placeholder="~0.00 $"
                            className={inputClasses}
                            readOnly
                        />
                    </div>
                </div>
            </div>
        );
    }

    // Render dynamic fields for other products
    if (formFields.length === 0) {
        return null;
    }

    const gridCols = formFields.length === 1 ? 'grid-cols-1' : 'grid-cols-2';

    return (
        <div className="p-8 border-[1.5px] border-[#00000026] rounded-4xl">
            <p className="text-[24px] font-bold">Пополнение аккаунта</p>

            <div className={`mt-4 grid ${gridCols} gap-x-4 gap-y-8`}>
                {formFields.map((field) => (
                    <div key={field.name}>
                        <span className="text-[14px] font-medium pb-4 flex">{field.label}</span>
                        {renderField(field)}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Form