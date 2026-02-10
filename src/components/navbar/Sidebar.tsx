import { useEffect, useState } from 'react';
import { useLogout } from '../../hooks/auth/useLogout';
import { useUserInfo } from '../../hooks/auth/useUserInfo';
import { useTranslation } from '../../hooks/useTranslation';
import Copied from '../operator/transactions/Copied';

interface SidebarProps {
    click: () => void;
    isSidebarOpen: boolean;
}

function Sidebar({ click, isSidebarOpen }: SidebarProps) {
    const { t } = useTranslation();
    const { handleLogout, isLoading } = useLogout();
    const { data, isLoading: isUserLoading, error: userError } = useUserInfo();

    const user = data?.user;
    const company = data?.company;
    const [showCopied, setShowCopied] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Close sidebar on ESC key press
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isSidebarOpen) {
                click();
            }
        };

        if (isSidebarOpen) {
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isSidebarOpen, click]);

    // Handle copied notification visibility and auto-hide
    useEffect(() => {
        if (showCopied) {
            setTimeout(() => setIsVisible(true), 10);
            const timer = setTimeout(() => {
                setIsVisible(false);
                setTimeout(() => setShowCopied(false), 300);
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [showCopied]);

    const handleCopyToken = async () => {
        if (!company?.api_token) return;
        try {
            await navigator.clipboard.writeText(company.api_token);
            setShowCopied(true);
        } catch (err) {
            console.error('Failed to copy token:', err);
        }
    };

    return (
        <div
            className={`fixed inset-0 z-40 grid place-items-center overflow-auto bg-[#00000059] p-[16px] transition-opacity duration-200 ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            onClick={click}
        >
            <div
                className={`bg-white w-[400px] max-1md:w-full px-[18px] pt-[18px] pb-[32px] rounded-[16px] transform transition-transform duration-200 ${isSidebarOpen ? "translate-y-0" : "translate-y-2"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between">
                    <p className="font-bold text-[18px]">{t.sidebar.title}</p>
                    <svg onClick={click} className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 6L18 18M18 6L6 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

                <div className="my-5 flex flex-col gap-[14px]">
                    {isUserLoading && (
                        <span className="text-[14px] text-[#00000099]">{t.sidebar.loading}</span>
                    )}

                    {userError && !isUserLoading && (
                        <span className="text-[14px] text-red-500">
                            {t.sidebar.loadError}
                        </span>
                    )}

                    {user && (
                        <>
                            <div className="flex flex-col gap-[8px]">
                                <span className="text-[15px] font-medium">{t.sidebar.emailLabel}</span>
                                <span className="px-4 py-[12.5px] rounded-[8px] border border-[#00000026]">
                                    {user.email}
                                </span>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <span className="text-[15px] font-medium">{t.sidebar.nicknameLabel}</span>
                                <span className="px-4 py-[12.5px] rounded-[8px] border border-[#00000026]">
                                    {user.username}
                                </span>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <span className="text-[15px] font-medium">{t.sidebar.fullNameLabel}</span>
                                <span className="px-4 py-[12.5px] rounded-[8px] border border-[#00000026]">
                                    {user.full_name}
                                </span>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <span className="text-[15px] font-medium">{t.sidebar.roleLabel}</span>
                                <span className="px-4 py-[12.5px] rounded-[8px] border border-[#00000026]">
                                    {user.role}
                                </span>
                            </div>
                            {company?.api_token && company.billing_mode === 'POSTPAID' && user.role === 'DIRECTOR' && (
                                <div className='mt-1.5'>
                                    <b className="text-[14px] pb-3.5 uppercase text-[#00000099] flex">Управление токенами</b>
                                    <div className="flex flex-col gap-[8px]">
                                        <span className="text-[15px] font-medium">{t.sidebar.tokenLabel}</span>
                                        <div className="px-4 py-[12.5px] flex items-center justify-between gap-1.5 rounded-[8px] border border-[#00000026]">
                                            <span className="flex-1 min-w-0 truncate">
                                                {company.api_token}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={handleCopyToken}
                                                className="p-0 border-0 bg-transparent cursor-pointer outline-0 shrink-0"
                                                aria-label="Copy API token"
                                            >
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 15H5C3.89543 15 3 14.1046 3 13V5C3 3.89543 3.89543 3 5 3H13C14.1046 3 15 3.89543 15 5V9M11 21H19C20.1046 21 21 20.1046 21 19V11C21 9.89543 20.1046 9 19 9H11C9.89543 9 9 9.89543 9 11V19C9 20.1046 9.89543 21 11 21Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <button
                    className="w-full cursor-pointer rounded-[8px] bg-[#ED2428] p-[10px] text-[13px] font-medium text-white outline-0 disabled:opacity-60"
                    onClick={handleLogout}
                    disabled={isLoading}
                >
                    {isLoading ? t.sidebar.loggingOut : t.sidebar.logout}
                </button>

            </div>
            {showCopied && <Copied isVisible={isVisible} />}
        </div>
    )
}

export default Sidebar