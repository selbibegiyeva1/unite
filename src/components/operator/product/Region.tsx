import { type ProductGroupForm } from '../../../services/authService';

interface RegionProps {
    productForm: ProductGroupForm;
    activeTab: 'popolnenie' | 'voucher';
    selectedRegion: string;
    onRegionChange: (region: string) => void;
}

function Region({ productForm, activeTab, selectedRegion, onRegionChange }: RegionProps) {
    // Get the appropriate fields based on active tab
    const fields = activeTab === 'voucher' 
        ? productForm.forms?.voucher_fields 
        : productForm.forms?.topup_fields;
    
    // Find the region field
    const regionField = fields?.find(field => field.name === 'region');
    const regionOptions = regionField?.options || [];

    return (
        <div className="p-8 border-[1.5px] border-[#00000026] rounded-4xl">
            <p className="text-[24px] font-bold">Выберите регион</p>

            <div className="relative mt-4">
                <select 
                    value={selectedRegion}
                    onChange={(e) => onRegionChange(e.target.value)}
                    className="appearance-none w-full text-[14px] font-medium cursor-pointer outline-0 rounded-[10px] p-4 bg-[#F5F5F9]"
                >
                    <option value="">Выберите регион</option>
                    {regionOptions
                        .filter((option): option is { name: string; value: string } => 
                            'name' in option && 'value' in option && typeof option.value === 'string'
                        )
                        .map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                </select>
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.33854 6.66699L10.0052 13.3337L16.6719 6.66699" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    )
}

export default Region