import Search from "../../components/operator/products/Search";
import Services from "../../components/operator/products/Services";
import { useTranslation } from "../../hooks/useTranslation";

function CategoryOperator() {
    const { t } = useTranslation();
    document.title = t.categoryOperator.pageTitle;
    return (
        <div className='px-20 mt-[28px] max-1lg:px-15 max-md:px-8 max-sm:px-4'>
            <div className='max-w-[1680px] m-auto'>
                <p className='text-[36px] font-bold'>{t.categoryOperator.heading}</p>
                <div className="mt-5">
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