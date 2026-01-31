import { useTranslation } from '../../../hooks/useTranslation';

interface CopiedProps {
    isVisible: boolean;
}

function Copied({ isVisible }: CopiedProps) {
    const { t } = useTranslation();

    return (
        <div className={`fixed bottom-[20px] left-1/2 -translate-x-1/2 w-[240px] flex items-center justify-center gap-2 text-center bg-white border border-[#00000026] rounded-[8px] p-[14.5px] text-[14px] font-medium transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3333 3.2796C12.3292 2.78059 11.1974 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 9.71833 17.4845 9.44028 17.4542 9.16667M17.5 4.16667L10 11.6667L7.5 9.16667" stroke="#14C57A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t.transactions.copiedSuccess}
        </div>
    )
}

export default Copied