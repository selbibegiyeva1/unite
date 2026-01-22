import { useState, useEffect } from 'react';
import { type ProductGroupForm } from '../../../services/authService';

interface FormProps {
    productForm: ProductGroupForm;
    activeTab: 'popolnenie' | 'voucher';
}

function Form({ productForm, activeTab }: FormProps) {
    const [formValues, setFormValues] = useState<Record<string, string>>({});

    // Reset form values when tab changes
    useEffect(() => {
        setFormValues({});
    }, [activeTab]);

    // Check if product is Steam - use static fields
    const isSteam = productForm.group === 'Steam';

    // Get the appropriate fields based on active tab
    const fields = activeTab === 'voucher'
        ? productForm.forms?.voucher_fields
        : productForm.forms?.topup_fields;

    // Filter out fields that are handled by other components
    const formFields = fields?.filter(field =>
        field.name !== 'region' && field.name !== 'product_id'
    ) || [];

    const handleInputChange = (name: string, value: string) => {
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

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
                        <input
                            type="number"
                            value={formValues.amount || ''}
                            onChange={(e) => handleInputChange('amount', e.target.value)}
                            placeholder="от 350 ТМТ"
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <span className="text-[14px] font-medium pb-4 flex">К зачислению в Steam</span>
                        <input
                            type="text"
                            value={formValues.credited || ''}
                            onChange={(e) => handleInputChange('credited', e.target.value)}
                            placeholder="~0.00 $"
                            className={inputClasses}
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