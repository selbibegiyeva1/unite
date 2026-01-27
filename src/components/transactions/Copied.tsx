interface CopiedProps {
    isVisible: boolean;
}

function Copied({ isVisible }: CopiedProps) {
    return (
        <div className={`fixed bottom-[20px] left-1/2 -translate-x-1/2 w-[215px] text-center bg-white border border-[#00000026] rounded-[8px] p-[14.5px] text-[14px] font-medium transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Успешно скопировано!
        </div>
    )
}

export default Copied