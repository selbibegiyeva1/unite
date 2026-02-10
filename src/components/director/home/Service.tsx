import { useMemo, useState, type ReactNode } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import { useDirectorMainInfo } from "../../../hooks/director/home/useDirectorMainInfo";
import { useUserInfo } from "../../../hooks/auth/useUserInfo";

const blockClasses =
    "px-4 py-4.5 border-2 border-[#00000026] rounded-[16px] h-[140px] max-md:p-3.5";

type BlockId =
    | "currentBalance"
    | "creditDebt"
    | "availablePayout"
    | "cashbackSteam"
    | "cashbackTopup"
    | "cashbackVoucher";

type Block = { id: BlockId; value: string; icon: ReactNode };

const iconCurrentBalance = (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="min-w-[20px]"
    >
        <path
            d="M2.5 15.8333H17.5M10 10V15.8333M15 10V15.8333M5 10V15.8333M10.4472 2.72361L16.59 5.79502C17.4395 6.21973 17.1372 7.5 16.1875 7.5H3.81246C2.86276 7.5 2.56053 6.21973 3.40997 5.79501L9.55279 2.72361C9.83431 2.58284 10.1657 2.58284 10.4472 2.72361Z"
            stroke="#2D85EA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const iconCreditDebt = (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="min-w-[20px]"
    >
        <path
            d="M10 4.16634H4.5C3.39543 4.16634 2.5 5.06177 2.5 6.16634V11.6663M17.5 2.49967L13.3333 7.49967M12.5 2.49967L12.5 3.33301M18.3333 6.66634L18.3333 7.49967M2.5 11.6663V13.833C2.5 14.9376 3.39543 15.833 4.5 15.833H15.5C16.6046 15.833 17.5 14.9376 17.5 13.833V11.6663H2.5Z"
            stroke="#2D85EA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const iconAvailable = (
    <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="min-w-[20px]"
    >
        <path
            d="M17.5 9.99967V11.6663M10 4.16634H4.5C3.39543 4.16634 2.5 5.06177 2.5 6.16634V11.6663M2.5 11.6663V13.833C2.5 14.9376 3.39543 15.833 4.5 15.833H15.5C16.6046 15.833 17.5 14.9376 17.5 13.833V11.6663M2.5 11.6663H17.5M19.1667 3.33301L15 7.49967L13.3333 5.83301"
            stroke="#2D85EA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const iconCashbackSteam = (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="min-w-[20px]"
    >
        <path
            d="M2.5 4.99967V13.6663C2.5 15.3232 3.84315 16.6663 5.5 16.6663H16.5C17.0523 16.6663 17.5 16.2186 17.5 15.6663V13.333M2.5 4.99967C2.5 4.0792 3.24619 3.33301 4.16667 3.33301H14.8333C15.3856 3.33301 15.8333 3.78072 15.8333 4.33301V6.66634M2.5 4.99967C2.5 5.92015 3.24619 6.66634 4.16667 6.66634H15.8333M15.8333 6.66634H16.5C17.0523 6.66634 17.5 7.11406 17.5 7.66634V9.99967M17.5 9.99967H15C14.0795 9.99967 13.3333 10.7459 13.3333 11.6663C13.3333 12.5868 14.0795 13.333 15 13.333H17.5M17.5 9.99967V13.333"
            stroke="#2D85EA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const iconCashbackTopup = iconCashbackSteam;
const iconCashbackVoucher = iconCashbackSteam;

function Service() {
    const { t, lang } = useTranslation();
    const { data: userInfo } = useUserInfo();
    const { data, isLoading } = useDirectorMainInfo({
        category: "ALL",
        period: "all_time",
    });
    const [hoveredBlockId, setHoveredBlockId] = useState<BlockId | null>(null);

    const blocks: Block[] = useMemo(() => {
        const formatAmount = (value: number) =>
            new Intl.NumberFormat(lang === "ru" ? "ru-RU" : "tk-TM", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(value) + " TMT";

        const formatPercent = (value: number) =>
            new Intl.NumberFormat(lang === "ru" ? "ru-RU" : "tk-TM", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            }).format(value) + "%";

        if (isLoading || !data) {
            return [
                { id: "currentBalance", value: "Loading...", icon: iconCurrentBalance },
                { id: "creditDebt", value: "Loading...", icon: iconCreditDebt },
                { id: "availablePayout", value: "Loading...", icon: iconAvailable },
                { id: "cashbackSteam", value: "Loading...", icon: iconCashbackSteam },
                { id: "cashbackTopup", value: "Loading...", icon: iconCashbackTopup },
                { id: "cashbackVoucher", value: "Loading...", icon: iconCashbackVoucher },
            ];
        }

        return [
            { id: "currentBalance", value: formatAmount(data.balance), icon: iconCurrentBalance },
            { id: "creditDebt", value: formatAmount(data.debt_amount), icon: iconCreditDebt },
            {
                id: "availablePayout",
                value: formatAmount(data.reward_available),
                icon: iconAvailable,
            },
            {
                id: "cashbackSteam",
                value: formatPercent(data.steam_share_rate),
                icon: iconCashbackSteam,
            },
            {
                id: "cashbackTopup",
                value: formatPercent(data.topup_share_rate),
                icon: iconCashbackTopup,
            },
            {
                id: "cashbackVoucher",
                value: formatPercent(data.voucher_share_rate),
                icon: iconCashbackVoucher,
            },
        ];
    }, [data, isLoading, lang]);

    const nickname = userInfo?.user?.username;

    return (
        <div className="mb-8">
            <h1 className="text-[36px] font-bold">
                {nickname || t.sidebar.nicknameLabel}
            </h1>
            <div className="grid grid-cols-6 gap-5 mt-5 max-2lg:grid-cols-3 max-sm:grid-cols-1">
                {blocks.map((block) => (
                    <div key={block.id} className={blockClasses}>
                        <div className="flex items-center justify-between h-[32px] gap-2">
                            <div className="flex items-center gap-2">
                                {block.icon}
                                <p className="text-[14px] leading-5 font-medium max-md:text-[12px]">
                                    {block.id === "currentBalance" && t.navbar.currentBalance}
                                    {block.id === "creditDebt" && t.navbar.creditDebt}
                                    {block.id === "availablePayout" && t.homeDirector.available}
                                    {block.id === "cashbackSteam" && t.homeDirector.cashbackSteam}
                                    {block.id === "cashbackTopup" && t.homeDirector.cashbackTopup}
                                    {block.id === "cashbackVoucher" && t.homeDirector.cashbackVoucher}
                                </p>
                            </div>
                            <div className="relative">
                                <img 
                                    src="/director.png" 
                                    alt="director" 
                                    className="w-[32px] cursor-pointer" 
                                    style={{minWidth: '32px'}}
                                    onMouseEnter={() => setHoveredBlockId(block.id)}
                                    onMouseLeave={() => setHoveredBlockId(null)}
                                />
                                <p 
                                    className={`absolute top-[40px] bg-white rounded-[10px] border border-[#00000026] px-4 py-[14.5px] w-[225px] text-center right-0 text-[12px] font-medium text-[#000000] z-10 transition-opacity duration-200 ease-in-out ${
                                        hoveredBlockId === block.id ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                                    }`}
                                >
                                    {block.id === "currentBalance" && t.homeDirector.tooltips.currentBalance}
                                    {block.id === "creditDebt" && t.homeDirector.tooltips.creditDebt}
                                    {block.id === "availablePayout" && t.homeDirector.tooltips.availablePayout}
                                    {(block.id === "cashbackSteam" ||
                                      block.id === "cashbackTopup" ||
                                      block.id === "cashbackVoucher") &&
                                        t.homeDirector.tooltips.cashback}
                                </p>
                            </div>
                        </div>
                        <p className="text-[24px] font-medium mt-3 max-lg:text-[20px] max-md:text-[18px] max-md:mt-2">
                            {block.value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Service