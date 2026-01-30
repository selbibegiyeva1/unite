import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./Sidebar";
import { useUserInfo } from "../hooks/auth/useUserInfo";
import { usePartnerMainInfo } from "../hooks/auth/usePartnerMainInfo";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "../hooks/useTranslation";

interface MenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuLinkBaseClasses = "inline-flex flex-col items-start font-medium outline-0";
const getMenuLinkClasses = (isActive: boolean) =>
    `${menuLinkBaseClasses} ${isActive ? "text-[#2D85EA]" : "text-black"}`;
const menuUnderlineClasses = (isActive: boolean) =>
    `mt-1 h-[1.5px] bg-[#2D85EA] transition-all duration-200 ease-out ${isActive ? "w-full" : "w-0"}`;

function Menu({ isOpen, onClose }: MenuProps) {
    const { t } = useTranslation();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { data: userData } = useUserInfo();
    const { data: partnerMain } = usePartnerMainInfo();

    const searchParams = new URLSearchParams(location.search);
    const currentGroup = searchParams.get("group");
    const isSteamActive =
        location.pathname === "/operator/product" && currentGroup === "Steam";

    const username = userData?.user.username ?? "-";
    const formattedBalance =
        partnerMain?.balance !== undefined
            ? new Intl.NumberFormat('ru-RU').format(partnerMain.balance) + ' ' + (partnerMain.currency || 'ТМТ')
            : '-';

    const handleSidebarOpen = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div
            className={`fixed z-50 top-0 left-0 w-full h-full overflow-auto bg-white transition-opacity duration-200 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
            <header className="px-[80px] max-1lg:px-15 max-md:px-8 max-sm:px-4">
                <Sidebar click={handleSidebarOpen} isSidebarOpen={isSidebarOpen} />

                <div className="m-auto flex h-[90px] max-1lg:h-[80px] max-w-[1680px] items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/operator/home">
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
                    </div>

                    <div className="flex items-center gap-4 max-1lg:gap-2">

                        {/* Balance */}
                        <p className="text-[15px] max-sm:hidden text-white font-bold bg-[#2D85EA] px-[17px] py-[11px] rounded-[8px]">
                            {formattedBalance}
                        </p>

                        <LanguageSwitcher />
                        <Link to='/help' className="flex items-center gap-3 cursor-pointer p-1.5 max-1lg:hidden">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 17H12.01M12 14C12.8906 12.0938 15 12.2344 15 10C15 8.5 14 7 12 7C10.4521 7 9.50325 7.89844 9.15332 9M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span className="text-[14px] font-medium">{t.navbar.help}</span>
                        </Link>
                        <button className="flex outline-0 items-center gap-3 cursor-pointer p-1.5" onClick={handleSidebarOpen}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 18.7083C17.4832 16.375 15.5357 15 12.0001 15C8.46459 15 6.51676 16.375 6 18.7083M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12 12C13.3333 12 14 11.2857 14 9.5C14 7.71429 13.3333 7 12 7C10.6667 7 10 7.71429 10 9.5C10 11.2857 10.6667 12 12 12Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span className="text-[14px] font-medium">{username}</span>
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-[24px] h-[24px] p-0 border-0 bg-transparent cursor-pointer max-1lg:block hidden outline-0"
                            aria-label="close"
                        >
                            <img src="/close.png" alt="close" className="w-[24px] h-[24px]" />
                        </button>
                    </div>
                </div>
            </header>

            <div className="px-[80px] max-1lg:px-15 max-md:px-8 max-sm:px-4" onClick={onClose}>
                <ul className="menu max-w-[1680px] m-auto">
                    <li>
                        <NavLink
                            to="/operator/home"
                            className={({ isActive }) => getMenuLinkClasses(isActive)}
                            style={{ fontWeight: "bold" }}
                        >
                            {({ isActive }) => (
                                <>
                                    <span>{t.navbar.home}</span>
                                    <span className={menuUnderlineClasses(isActive)} />
                                </>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <Link
                            to="/operator/product?group=Steam"
                            className={getMenuLinkClasses(isSteamActive)}
                            style={{ fontWeight: "bold" }}
                        >
                            <span>{t.navbar.steam}</span>
                            <span className={menuUnderlineClasses(isSteamActive)} />
                        </Link>
                    </li>
                    <li>
                        <NavLink
                            to="/operator/products"
                            className={({ isActive }) => getMenuLinkClasses(isActive)}
                            style={{ fontWeight: "bold" }}
                        >
                            {({ isActive }) => (
                                <>
                                    <span>{t.navbar.products}</span>
                                    <span className={menuUnderlineClasses(isActive)} />
                                </>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/operator/esim"
                            className={({ isActive }) => getMenuLinkClasses(isActive)}
                            style={{ fontWeight: "bold" }}
                        >
                            {({ isActive }) => (
                                <>
                                    <span>{t.navbar.esim}</span>
                                    <span className={menuUnderlineClasses(isActive)} />
                                </>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/operator/transactions"
                            className={({ isActive }) => getMenuLinkClasses(isActive)}
                            style={{ fontWeight: "bold" }}
                        >
                            {({ isActive }) => (
                                <>
                                    <span>{t.navbar.transactions}</span>
                                    <span className={menuUnderlineClasses(isActive)} />
                                </>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/help"
                            className={({ isActive }) => getMenuLinkClasses(isActive)}
                            style={{ fontWeight: "bold" }}
                        >
                            {({ isActive }) => (
                                <>
                                    <span>{t.navbar.help}</span>
                                    <span className={menuUnderlineClasses(isActive)} />
                                </>
                            )}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Menu