import { type ProductGroupForm } from '../../../services/authService';
import { useTranslation } from '../../../hooks/useTranslation';

interface HeaderProps {
    productForm: ProductGroupForm;
    activeTab: 'popolnenie' | 'voucher';
    setActiveTab: (tab: 'popolnenie' | 'voucher') => void;
}

function Header({ productForm, activeTab, setActiveTab }: HeaderProps) {
    const { t } = useTranslation();

    const baseBtn =
        'flex items-center gap-[10px] text-[15px] font-bold px-[15px] py-[10px] rounded-[8px] cursor-pointer h-[45px] transition-colors';

    const activeClasses = 'bg-[#2D85EA] text-white border-2 border-[#2D85EA]';
    const inactiveClasses = 'bg-white border-2 border-[#00000026] text-black';

    return (
        <div className='px-8 py-11 border-[1.5px] border-[#00000026] rounded-4xl max-lg:p-8'>
            <div className='flex items-start gap-[29px] max-xsm:flex-col'>
                <img
                    src={productForm.icon}
                    alt="image"
                    className='w-[160px] rounded-[24px] max-1lg:max-w-[140px] max-xsm:w-full max-xsm:max-w-full'
                />
                <div className='max-xsm:w-full'>
                    <p className="text-[24px] font-bold">{productForm.group}</p>
                    <p className="text-[14px] text-[#00000099] py-[18px]">{productForm.short_info}</p>
                    <div className='flex items-center gap-2.5 max-slg:flex-wrap max-xsm:flex-col'>
                        {productForm.forms?.topup_fields !== null && productForm.forms?.topup_fields !== undefined && (
                            <button
                                type="button"
                                onClick={() => setActiveTab('popolnenie')}
                                className={`${baseBtn} ${activeTab === 'popolnenie' ? activeClasses : inactiveClasses} max-xsm:w-full max-xsm:justify-center`}
                            >
                                {t.productHeader.topupTab}
                            </button>
                        )}
                        {productForm.forms?.voucher_fields !== null && productForm.forms?.voucher_fields !== undefined && (
                            <button
                                type="button"
                                onClick={() => setActiveTab('voucher')}
                                className={`${baseBtn} ${activeTab === 'voucher' ? activeClasses : inactiveClasses} max-xsm:w-full max-xsm:justify-center`}
                            >
                                {t.productHeader.voucherTab}
                                <div className='relative group'>

                                    {/* Hover here */}
                                    <img src="/product/help.png" className='w-[28px]' style={{maxWidth: '28px'}} alt="help" />

                                    {/* Display this on hover */}
                                    <span className='absolute shadow-2xl border text-black border-[#00000026] rounded-[16px] leading-5 text-left top-[50px] z-10 left-[-50px] max-1md:left-[-200px] font-medium text-[14px] w-[300px] bg-white px-4 py-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200'>
                                        {t.productHeader.voucherTooltip}
                                    </span>
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header