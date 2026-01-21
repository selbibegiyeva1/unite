import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./Sidebar";

function Navbar() {
    const linkBaseClasses = "inline-flex flex-col items-start text-[14px] font-medium outline-0";

    const getLinkClasses = (isActive: boolean) =>
        `${linkBaseClasses} ${isActive ? "text-[#2D85EA]" : "text-black"}`;

    const underlineClasses = (isActive: boolean) =>
        `mt-1 h-[1px] bg-[#2D85EA] transition-all duration-200 ease-out ${isActive ? "w-full" : "w-0"
        }`;

        const [isSidebarOpen, setIsSidebarOpen] = useState(false);

        const handleSidebarOpen = () => {
            setIsSidebarOpen(!isSidebarOpen);
        }

    return (
        <header className="px-[24px]">
            <Sidebar click={handleSidebarOpen} isSidebarOpen={isSidebarOpen} />

            <div className="m-auto flex h-[90px] w-[1680px] items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link to="/operator/home">
                        <img src="/favicon.png" alt="Unite Shop" className="w-[35px]" />
                    </Link>
                    <ul className="flex gap-4">
                        <li className="px-1.5 py-2.5">
                            <NavLink
                                to="/operator/home"
                                className={({ isActive }) => getLinkClasses(isActive)}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span>Главная</span>
                                        <span className={underlineClasses(isActive)} />
                                    </>
                                )}
                            </NavLink>
                        </li>
                        <li className="px-1.5 py-2.5">
                            <NavLink
                                to="/operator/product"
                                className={({ isActive }) => getLinkClasses(isActive)}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span>Steam</span>
                                        <span className={underlineClasses(isActive)} />
                                    </>
                                )}
                            </NavLink>
                        </li>
                        <li className="px-1.5 py-2.5">
                            <NavLink
                                to="/operator/category"
                                className={({ isActive }) => getLinkClasses(isActive)}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span>Игры</span>
                                        <span className={underlineClasses(isActive)} />
                                    </>
                                )}
                            </NavLink>
                        </li>
                        <li className="px-1.5 py-2.5">
                            <NavLink
                                to="/operator/category"
                                className={({ isActive }) => getLinkClasses(isActive)}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span>Сервисы</span>
                                        <span className={underlineClasses(isActive)} />
                                    </>
                                )}
                            </NavLink>
                        </li>
                        <li className="px-1.5 py-2.5">
                            <NavLink
                                to="/operator/esim"
                                className={({ isActive }) => getLinkClasses(isActive)}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span>eSIM</span>
                                        <span className={underlineClasses(isActive)} />
                                    </>
                                )}
                            </NavLink>
                        </li>
                        <li className="px-1.5 py-2.5">
                            <NavLink
                                to="/operator/transactions"
                                className={({ isActive }) => getLinkClasses(isActive)}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span>Транзакции</span>
                                        <span className={underlineClasses(isActive)} />
                                    </>
                                )}
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="flex items-center gap-4">
                    <Link to='/help' className="flex items-center gap-3 cursor-pointer p-1.5">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 17H12.01M12 14C12.8906 12.0938 15 12.2344 15 10C15 8.5 14 7 12 7C10.4521 7 9.50325 7.89844 9.15332 9M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span className="text-[14px] font-medium">Помощь</span>

                    </Link>
                    <button className="flex items-center gap-3 cursor-pointer p-1.5" onClick={handleSidebarOpen}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 18.7083C17.4832 16.375 15.5357 15 12.0001 15C8.46459 15 6.51676 16.375 6 18.7083M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12 12C13.3333 12 14 11.2857 14 9.5C14 7.71429 13.3333 7 12 7C10.6667 7 10 7.71429 10 9.5C10 11.2857 10.6667 12 12 12Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span className="text-[14px] font-medium">Мурад</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;

