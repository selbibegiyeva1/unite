import { useEffect, useRef, useState } from 'react';
import { type ProductGroupForm } from '../../../services/authService';
import { useTranslation } from '../../../hooks/useTranslation';

interface RegionProps {
    productForm: ProductGroupForm;
    activeTab: 'popolnenie' | 'voucher';
    selectedRegion: string;
    onRegionChange: (region: string) => void;
}

type RegionOption = { name: string; value: string };

function Region({ productForm, activeTab, selectedRegion, onRegionChange }: RegionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement | null>(null);

    // Get the appropriate fields based on active tab
    const fields = activeTab === 'voucher'
        ? productForm.forms?.voucher_fields
        : productForm.forms?.topup_fields;

    // Find the region field
    const regionField = fields?.find(field => field.name === 'region');
    const regionOptions = (regionField?.options || [])
        .filter((option): option is RegionOption =>
            'name' in option && 'value' in option && typeof option.value === 'string'
        );
    const { t } = useTranslation();

    // Check if selected region is СНГ
    const selectedRegionOption = regionOptions.find(option => option.value === selectedRegion);
    const isSNGSelected = selectedRegionOption?.name === 'СНГ';

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const currentLabel = regionOptions.find(o => o.value === selectedRegion)?.name ?? '';

    const handleSelect = (value: string) => {
        onRegionChange(value);
        setIsOpen(false);
    };

    return (
        <div className="p-8 border-[1.5px] border-[#00000026] rounded-4xl">
            <p className="text-[24px] font-bold">{t.productRegion.title}</p>

            <div ref={rootRef} className="relative mt-4">
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="flex items-center justify-between w-full text-[14px] font-medium cursor-pointer outline-0 rounded-[10px] p-4 bg-[#F5F5F9] text-left"
                >
                    <span className="truncate pr-8">{currentLabel || t.productRegion.placeholder}</span>
                    {/* Should be visible only if I pick СНГ region */}
                    {isSNGSelected && (
                        <div
                            className="absolute left-[60px] top-1/2 -translate-y-1/2 z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative group">
                                <img src="/product/help.png" className="w-[28px] cursor-pointer" alt="help" />
                                <span className="absolute shadow-2xl border text-black border-[#00000026] rounded-[16px] leading-5 text-left top-[50px] z-10 left-[-50px] font-medium text-[14px] w-[300px] bg-white px-4 py-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
                                    {t.productRegion.sngTooltip}
                                </span>
                            </div>
                        </div>
                    )}
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.33854 6.66699L10.0052 13.3337L16.6719 6.66699" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div
                    className={`absolute left-0 right-0 mt-2 rounded-[10px] border border-[#0000001A] bg-white shadow-sm z-50 transition-all duration-200 ${
                        isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
                    }`}
                >
                    <div className="max-h-[280px] flex flex-col gap-2 overflow-y-auto p-[13px]">
                        {regionOptions.map((option) => {
                            const isActive = option.value === selectedRegion;
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleSelect(option.value)}
                                    className={`w-full text-left px-4 py-3 text-[14px] font-medium cursor-pointer transition-colors hover:bg-[#EEF3FF] rounded-[10px] ${
                                        isActive ? 'bg-[#EEF3FF]' : 'bg-white'
                                    }`}
                                >
                                    {option.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Region