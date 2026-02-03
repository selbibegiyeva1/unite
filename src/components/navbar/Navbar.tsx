import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./Sidebar";
import { useUserInfo } from "../../hooks/auth/useUserInfo";
import { usePartnerMainInfo } from "../../hooks/auth/usePartnerMainInfo";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "../../hooks/useTranslation";

interface NavbarProps {
    onMenuOpen?: () => void;
}

function Navbar({ onMenuOpen }: NavbarProps) {
    const { t } = useTranslation();
    const linkBaseClasses = "inline-flex flex-col items-start text-[14px] font-medium outline-0";

    const getLinkClasses = (isActive: boolean) =>
        `${linkBaseClasses} ${isActive ? "text-[#2D85EA]" : "text-black"}`;

    const underlineClasses = (isActive: boolean) =>
        `mt-1 h-[1.5px] bg-[#2D85EA] transition-all duration-200 ease-out ${isActive ? "w-full" : "w-0"}`;

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const { data: userData } = useUserInfo();
    const { data: partnerMain } = usePartnerMainInfo();

    const username = userData?.user.username ?? "-";
    const userRole = userData?.user.role;
    const formattedBalance =
        partnerMain?.balance !== undefined
            ? new Intl.NumberFormat('ru-RU').format(partnerMain.balance) + ' ' + (partnerMain.currency || 'ТМТ')
            : '-';

    const handleSidebarOpen = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const searchParams = new URLSearchParams(location.search);
    const currentGroup = searchParams.get("group");
    const isSteamActive =
        location.pathname === "/operator/product" && currentGroup === "Steam";
    const isHelpActive = location.pathname === "/help";

    const isDirector = userRole === 'DIRECTOR';
    const homePath = isDirector ? '/director/home' : '/operator/home';

    return (
        <header className="px-[80px] max-1lg:px-15 max-md:px-8 max-sm:px-4">
            <Sidebar click={handleSidebarOpen} isSidebarOpen={isSidebarOpen} />

            <div className="m-auto flex h-[90px] max-1lg:h-[80px] max-w-[1680px] items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link to={homePath}>
                        {userData?.company?.logo ? (
                            <img
                                src={userData.company.logo}
                                alt="Unite Shop"
                                className="w-[35px]"
                            />
                        ) : (
                            <Skeleton width={35} height={35} circle />
                        )}
                    </Link>
                    <ul className="flex gap-4 max-1lg:hidden">
                        {isDirector ? (
                            <>
                                <li className="px-1.5 py-2.5">
                                    <NavLink to="/director/home" className={({ isActive }) => getLinkClasses(isActive)}>
                                        {({ isActive }) => (
                                            <>
                                                <span>{t.navbar.home}</span>
                                                <span className={underlineClasses(isActive)} />
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                                <li className="px-1.5 py-2.5">
                                    <NavLink to="/director/transactions" className={({ isActive }) => getLinkClasses(isActive)}>
                                        {({ isActive }) => (
                                            <>
                                                <span>{t.navbar.transactions}</span>
                                                <span className={underlineClasses(isActive)} />
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                                <li className="px-1.5 py-2.5">
                                    <NavLink to="/director/reports" className={({ isActive }) => getLinkClasses(isActive)}>
                                        {({ isActive }) => (
                                            <>
                                                <span>{t.navbar.reports}</span>
                                                <span className={underlineClasses(isActive)} />
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="px-1.5 py-2.5">
                                    <NavLink to="/operator/home" className={({ isActive }) => getLinkClasses(isActive)}>
                                        {({ isActive }) => (
                                            <>
                                                <span>{t.navbar.home}</span>
                                                <span className={underlineClasses(isActive)} />
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                                <li className="px-1.5 py-2.5">
                                    <Link to="/operator/product?group=Steam" className={getLinkClasses(isSteamActive)}>
                                        <span>{t.navbar.steam}</span>
                                        <span className={underlineClasses(isSteamActive)} />
                                    </Link>
                                </li>
                                <li className="px-1.5 py-2.5">
                                    <NavLink to="/operator/products" className={({ isActive }) => getLinkClasses(isActive)}>
                                        {({ isActive }) => (
                                            <>
                                                <span>{t.navbar.products}</span>
                                                <span className={underlineClasses(isActive)} />
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                                <li className="px-1.5 py-2.5">
                                    <NavLink to="/operator/esim" className={({ isActive }) => getLinkClasses(isActive)}>
                                        {({ isActive }) => (
                                            <>
                                                <span>{t.navbar.esim}</span>
                                                <span className={underlineClasses(isActive)} />
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                                <li className="px-1.5 py-2.5">
                                    <NavLink to="/operator/transactions" className={({ isActive }) => getLinkClasses(isActive)}>
                                        {({ isActive }) => (
                                            <>
                                                <span>{t.navbar.transactions}</span>
                                                <span className={underlineClasses(isActive)} />
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                <div className="flex items-center gap-4 max-1lg:gap-2">

                    {/* Balance */}
                    <p className="text-[15px] max-sm:hidden text-white font-bold bg-[#2D85EA] px-[17px] py-[11px] rounded-[8px]">
                        {formattedBalance}
                    </p>

                    <LanguageSwitcher />
                    <Link
                        to='/help'
                        className={`flex items-center gap-3 cursor-pointer p-1.5 max-1lg:hidden ${isHelpActive ? 'text-[#2D85EA]' : 'text-black'}`}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 17H12.01M12 14C12.8906 12.0938 15 12.2344 15 10C15 8.5 14 7 12 7C10.4521 7 9.50325 7.89844 9.15332 9M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[14px] font-medium">{t.navbar.help}</span>
                    </Link>
                    <button className="flex outline-0 items-center gap-3 cursor-pointer p-1.5" onClick={handleSidebarOpen}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 18.7083C17.4832 16.375 15.5357 15 12.0001 15C8.46459 15 6.51676 16.375 6 18.7083M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12 12C13.3333 12 14 11.2857 14 9.5C14 7.71429 13.3333 7 12 7C10.6667 7 10 7.71429 10 9.5C10 11.2857 10.6667 12 12 12Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[14px] font-medium">{username}</span>
                    </button>
                    <button
                        type="button"
                        onClick={onMenuOpen}
                        className="w-[24px] h-[24px] p-0 border-0 bg-transparent cursor-pointer max-1lg:block hidden outline-0"
                        aria-label="menu"
                    >
                        <img src="/menu.png" alt="menu" className="w-[24px] h-[24px]" />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;

