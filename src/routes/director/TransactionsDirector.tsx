import { NavLink, Outlet } from "react-router-dom"

const linkBaseClasses = "inline-flex flex-col items-start text-[14px] font-medium outline-0"
const getLinkClasses = (isActive: boolean) =>
    `${linkBaseClasses} ${isActive ? "text-[#2D85EA]" : "text-black"}`
const underlineClasses = (isActive: boolean) =>
    `mt-1 h-[1px] bg-[#2D85EA] transition-all duration-200 ease-out ${isActive ? "w-full" : "w-0"}`

function TransactionsDirector() {
    return (
        <div className="px-20 max-1lg:px-15 max-md:px-8 max-sm:px-4 pb-[100px] mt-[28px]">
            <div className="max-w-[1680px] m-auto">
                <h1 className="text-[36px] font-bold max-2lg:text-[28px] max-lg:text-[24px] max-md:text-[20px]">Транзакции</h1>

                <div className="flex gap-4 my-5">
                    <ul className="flex gap-4">
                        <li className="px-1.5 py-2.5">
                            <NavLink
                                to="topup"
                                end
                                className={({ isActive }) => getLinkClasses(isActive)}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span>История пополнений</span>
                                        <span className={underlineClasses(isActive)} />
                                    </>
                                )}
                            </NavLink>
                        </li>
                        <li className="px-1.5 py-2.5">
                            <NavLink
                                to="purchase"
                                className={({ isActive }) => getLinkClasses(isActive)}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span>История покупок</span>
                                        <span className={underlineClasses(isActive)} />
                                    </>
                                )}
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default TransactionsDirector