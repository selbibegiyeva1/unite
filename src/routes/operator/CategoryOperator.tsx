import Search from "../../components/operator/Search";
import Services from "../../components/operator/Services";

function CategoryOperator() {
    document.title = 'Unite Shop - Продукты';
    return (
        <div className='px-6 mt-[28px]'>
            <div className='w-[1680px] m-auto'>
                <p className='text-[36px] font-bold'>Цифровые товары</p>
                <div className="mt-5 px-5 py-[32px] border border-[#00000026] rounded-[8px]">
                    <Search />
                </div>
                <div className="mt-[24px]">
                    <Services />
                </div>
            </div>
        </div>
    )
}

export default CategoryOperator