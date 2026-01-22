import { useState, useMemo, useEffect } from 'react';
import { type ProductGroupForm, type ProductIdOption } from '../../../services/authService';

interface NominalsProps {
    productForm: ProductGroupForm;
    selectedRegion: string;
    activeTab: 'popolnenie' | 'voucher';
}

function Nominals({ productForm, selectedRegion, activeTab }: NominalsProps) {
    const [activeNominal, setActiveNominal] = useState<number | null>(null);

    const baseBtn = 'font-bold px-[15px] py-[10px] rounded-[10px] cursor-pointer transition-colors';
    const activeClasses = 'bg-[#2D85EA] text-white border-2 border-[#2D85EA]';
    const inactiveClasses = 'bg-white border-2 border-[#00000026] text-black';

    // Get nominals filtered by selected region
    const nominals = useMemo(() => {
        // Get the appropriate fields based on active tab
        const fields = activeTab === 'voucher' 
            ? productForm.forms?.voucher_fields 
            : productForm.forms?.topup_fields;

        // Find product_id field
        const productIdField = fields?.find(
            field => field.name === 'product_id'
        );

        if (!productIdField || !productIdField.options) {
            return [];
        }

        // Get all valid product options
        const allProductOptions = productIdField.options.filter((option): option is ProductIdOption => {
            return (
                typeof option === 'object' &&
                'region' in option &&
                'product' in option
            );
        }) as ProductIdOption[];

        // If no region is selected, return all nominals
        if (!selectedRegion) {
            return allProductOptions;
        }

        // Get region name from fields to match with product_id region
        const regionField = fields?.find(
            field => field.name === 'region'
        );
        const regionOption = regionField?.options?.find(
            opt => 'value' in opt && opt.value === selectedRegion
        );
        const regionName = regionOption && 'name' in regionOption ? regionOption.name : null;

        // Get all region names from the region list
        const regionNames = regionField?.options
            ?.filter((opt): opt is { name: string; value: string } =>
                'name' in opt && 'value' in opt && typeof opt.value === 'string'
            )
            .map(opt => opt.name) || [];

        // Filter product_id options by region
        return allProductOptions.filter((option) => {
            // If the nominal's region doesn't exist in the region list (like "Любой"), show it
            if (!regionNames.includes(option.region)) {
                return true;
            }
            // Otherwise, filter by selected region
            return option.region === regionName;
        });
    }, [productForm, selectedRegion, activeTab]);

    // Set first nominal as default when nominals change
    useEffect(() => {
        if (nominals.length > 0) {
            // Check if current active nominal is still in the list
            const isCurrentNominalValid = nominals.some(n => n.value === activeNominal);
            if (!isCurrentNominalValid || activeNominal === null) {
                setActiveNominal(nominals[0].value);
            }
        } else {
            setActiveNominal(null);
        }
    }, [nominals]);

    if (nominals.length === 0) {
        return null;
    }

    return (
        <div className="p-8 border-[1.5px] border-[#00000026] rounded-4xl">
            <p className="text-[24px] font-bold">Выберите номинал</p>

            <div className="mt-4 flex flex-wrap gap-3.5">
                {nominals.map((nominal) => (
                    <button
                        key={nominal.value}
                        type="button"
                        onClick={() => setActiveNominal(nominal.value)}
                        className={`${baseBtn} ${activeNominal === nominal.value ? activeClasses : inactiveClasses}`}
                    >
                        {nominal.product}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Nominals