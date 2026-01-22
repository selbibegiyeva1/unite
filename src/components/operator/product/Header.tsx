import { type ProductGroupForm } from '../../../services/authService';

interface HeaderProps {
    productForm: ProductGroupForm;
    activeTab: 'popolnenie' | 'voucher';
    setActiveTab: (tab: 'popolnenie' | 'voucher') => void;
}

function Header({ productForm, activeTab, setActiveTab }: HeaderProps) {

    const baseBtn =
        'flex items-center gap-[10px] text-[15px] font-bold px-[15px] py-[10px] rounded-[8px] cursor-pointer h-[45px] transition-colors';

    const activeClasses = 'bg-[#2D85EA] text-white border-2 border-[#2D85EA]';
    const inactiveClasses = 'bg-white border-2 border-[#00000026] text-black';

    return (
        <div className='px-8 py-11 border-[1.5px] border-[#00000026] rounded-4xl'>
            <div className='flex items-start gap-[29px]'>
                <img
                    src={productForm.icon}
                    alt="image"
                    className='w-[160px] rounded-[24px]'
                />
                <div>
                    <p className="text-[24px] font-bold">{productForm.group}</p>
                    <p className="text-[14px] text-[#00000099] py-[18px]">{productForm.short_info}</p>
                    <div className='flex items-center gap-2.5'>
                        {productForm.forms?.topup_fields !== null && productForm.forms?.topup_fields !== undefined && (
                            <button
                                type="button"
                                onClick={() => setActiveTab('popolnenie')}
                                className={`${baseBtn} ${activeTab === 'popolnenie' ? activeClasses : inactiveClasses}`}
                            >
                                Пополнение
                            </button>
                        )}
                        {productForm.forms?.voucher_fields !== null && productForm.forms?.voucher_fields !== undefined && (
                            <button
                                type="button"
                                onClick={() => setActiveTab('voucher')}
                                className={`${baseBtn} ${activeTab === 'voucher' ? activeClasses : inactiveClasses}`}
                            >
                                Ваучер
                                <img src="/product/help.png" className='w-[28px]' alt="help" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header