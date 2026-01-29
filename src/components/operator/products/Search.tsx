import { Link } from "react-router-dom";
import { useProductSearch } from "../../../hooks/operator/product/useProductSearch";
import { useTranslation } from "../../../hooks/useTranslation";

function Search() {
    const {
        searchQuery,
        isDropdownOpen,
        selectedIndex,
        filteredGroups,
        isLoading,
        searchRef,
        inputRef,
        handleKeyDown,
        handleInputChange,
        handleInputFocus,
        handleProductSelect,
    } = useProductSearch();
    const { t } = useTranslation();

    return (
        <div className="px-5 py-[32px] border border-[#00000026] rounded-[16px]">
            <p className="font-medium text-[18px] mb-5">{t.search.title}</p>
            <div className="flex items-center gap-2">
                <div ref={searchRef} className="relative w-full">
                    <div className="flex items-center gap-1.5 w-full border-[1.5px] border-[#00000026] rounded-[8px] px-4 h-[45px] focus-within:border-[#2D85EA] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.1524 11.1572L15.8281 15.833M7.91146 12.4997C10.4428 12.4997 12.4948 10.4476 12.4948 7.91634C12.4948 5.38504 10.4428 3.33301 7.91146 3.33301C5.38015 3.33301 3.32812 5.38504 3.32812 7.91634C3.32812 10.4476 5.38015 12.4997 7.91146 12.4997Z" stroke="black" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder={t.search.placeholder}
                            value={searchQuery}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            onKeyDown={handleKeyDown}
                            className="text-[14px] outline-0 font-medium py-[10px] w-full"
                        />
                    </div>
                    {isDropdownOpen && searchQuery && !isLoading && (
                        <div className="absolute z-50 w-full mt-1 bg-white border-[1.5px] border-[#00000026] rounded-[8px] shadow-lg max-h-[400px] overflow-y-auto">
                            {filteredGroups.length > 0 ? (
                                filteredGroups.map((group, index) => (
                                    <Link
                                        key={group.group_name}
                                        to={`/operator/product?group=${encodeURIComponent(group.group_name)}`}
                                        onClick={() => handleProductSelect(group.group_name)}
                                        className={`w-full flex items-center gap-[9px] px-4 py-3 hover:bg-[#F2F3F5] transition-colors ${index === selectedIndex ? "bg-[#F2F3F5]" : ""}`}
                                    >
                                        <img
                                            src={group.icon_url}
                                            alt={group.group_name}
                                            className="w-[23px] h-[23px] rounded-[50%] object-cover"
                                            onError={(e) => {
                                                const target = e.currentTarget;
                                                if (target.src !== `${window.location.origin}/product.png`) {
                                                    target.src = '/product.png';
                                                }
                                            }}
                                        />
                                        <p className="text-[14px] font-bold text-left">{group.group_name}</p>
                                    </Link>
                                ))
                            ) : (
                                <div className="px-4 py-3 text-[14px] text-[#00000099]">
                                    {t.search.notFound}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2.5">
                <Link
                    to={`/operator/product?group=${encodeURIComponent("Steam")}`}
                    className="text-[14px] w-fit font-bold flex items-center gap-[9px] bg-[#F2F3F5] px-[15px] py-[9px] rounded-[8px]"
                >
                    <img src="/search/1.jpg" alt="search" className="w-[23px] rounded-[50%]" />
                    <p>Steam</p>
                </Link>
                <Link
                    to={`/operator/product?group=${encodeURIComponent("Spotify")}`}
                    className="text-[14px] w-fit font-bold flex items-center gap-[9px] bg-[#F2F3F5] px-[15px] py-[9px] rounded-[8px]"
                >
                    <img src="/search/2.jpg" alt="search" className="w-[23px] rounded-[50%]" />
                    <p>Spotify</p>
                </Link>
                <Link
                    to={`/operator/product?group=${encodeURIComponent("Netflix")}`}
                    className="text-[14px] w-fit font-bold flex items-center gap-[9px] bg-[#F2F3F5] px-[15px] py-[9px] rounded-[8px]"
                >
                    <img src="/search/3.jpg" alt="search" className="w-[23px] rounded-[50%]" />
                    <p>Netflix</p>
                </Link>
                <Link
                    to={`/operator/product?group=${encodeURIComponent("APPLE ID")}`}
                    className="text-[14px] w-fit font-bold flex items-center gap-[9px] bg-[#F2F3F5] px-[15px] py-[9px] rounded-[8px]"
                >
                    <img src="/search/4.jpg" alt="search" className="w-[23px] rounded-[50%]" />
                    <p>APPLE ID</p>
                </Link>
                <Link
                    to={`/operator/product?group=${encodeURIComponent("Playstation")}`}
                    className="text-[14px] w-fit font-bold flex items-center gap-[9px] bg-[#F2F3F5] px-[15px] py-[9px] rounded-[8px]"
                >
                    <img src="/search/5.jpg" alt="search" className="w-[23px] rounded-[50%]" />
                    <p>Playstation</p>
                </Link>
                <Link
                    to={`/operator/product?group=${encodeURIComponent("PUBG Mobile")}`}
                    className="text-[14px] w-fit font-bold flex items-center gap-[9px] bg-[#F2F3F5] px-[15px] py-[9px] rounded-[8px]"
                >
                    <img src="/search/6.jpg" alt="search" className="w-[23px] rounded-[50%]" />
                    <p>PUBG Mobile</p>
                </Link>
                <Link
                    to={`/operator/product?group=${encodeURIComponent("Roblox")}`}
                    className="text-[14px] w-fit font-bold flex items-center gap-[9px] bg-[#F2F3F5] px-[15px] py-[9px] rounded-[8px]"
                >
                    <img src="/search/7.jpg" alt="search" className="w-[23px] rounded-[50%]" />
                    <p>Roblox</p>
                </Link>
                <Link
                    to={`/operator/product?group=${encodeURIComponent("Discord")}`}
                    className="text-[14px] w-fit font-bold flex items-center gap-[9px] bg-[#F2F3F5] px-[15px] py-[9px] rounded-[8px]"
                >
                    <img src="/search/8.jpg" alt="search" className="w-[23px] rounded-[50%]" />
                    <p>Discord</p>
                </Link>
            </div>
        </div>
    );
}

export default Search;