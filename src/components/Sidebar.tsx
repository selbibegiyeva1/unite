import { useLogout } from '../hooks/auth/useLogout';

interface SidebarProps {
    click: () => void;
    isSidebarOpen: boolean;
}

function Sidebar({ click, isSidebarOpen }: SidebarProps) {
    const { handleLogout, isLoading } = useLogout();

    return (
        <div
            className={`fixed inset-0 z-40 grid place-items-center overflow-auto bg-[#00000059] p-[16px] transition-opacity duration-200 ${
                isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            onClick={click}
        >
            <div
                className={`bg-white w-[400px] px-[18px] pt-[18px] pb-[32px] rounded-[16px] transform transition-transform duration-200 ${
                    isSidebarOpen ? "translate-y-0" : "translate-y-4"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between">
                    <p className="font-bold text-[18px]">Мой профиль</p>
                    <svg onClick={click} className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 6L18 18M18 6L6 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

                <div className="my-5 flex flex-col gap-[14px]">
                    <div className="flex flex-col gap-[8px]">
                        <span className="text-[15px] font-medium">Email</span>
                        <span className="px-4 py-[12.5px] rounded-[8px] border border-[#00000026]">roycharyyew@gmail.com</span>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <span className="text-[15px] font-medium">Никнейм</span>
                        <span className="px-4 py-[12.5px] rounded-[8px] border border-[#00000026]">Мурад</span>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <span className="text-[15px] font-medium">Полное имя</span>
                        <span className="px-4 py-[12.5px] rounded-[8px] border border-[#00000026]">Мурад</span>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <span className="text-[15px] font-medium">Роль</span>
                        <span className="px-4 py-[12.5px] rounded-[8px] border border-[#00000026]">Директор</span>
                    </div>
                </div>

                <button
                    className="w-full cursor-pointer rounded-[8px] bg-[#ED2428] p-[10px] text-[13px] font-medium text-white outline-0 disabled:opacity-60"
                    onClick={handleLogout}
                    disabled={isLoading}
                >
                    {isLoading ? 'Выходим...' : 'Выйти'}
                </button>
            </div>
        </div>
    )
}

export default Sidebar