import { Link } from "react-router-dom"

function Search() {
    return (
        <div>
            <p className="font-medium text-[18px] mb-5">Поиск по товарам</p>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 w-full border-[1.5px] border-[#00000026] rounded-[8px] px-4 h-[45px]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.1524 11.1572L15.8281 15.833M7.91146 12.4997C10.4428 12.4997 12.4948 10.4476 12.4948 7.91634C12.4948 5.38504 10.4428 3.33301 7.91146 3.33301C5.38015 3.33301 3.32812 5.38504 3.32812 7.91634C3.32812 10.4476 5.38015 12.4997 7.91146 12.4997Z" stroke="black" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <input type="text" placeholder="Поиск по товарам" className="text-[14px] outline-0 font-medium py-[10px] w-full" />
                </div>
                <button className="bg-[#2D85EA] hover:bg-blue-600 transition-colors text-[15px] font-medium text-white px-[37px] py-[11px] rounded-[8px] cursor-pointer h-[45px]">Поиск</button>
            </div>
            <div className="mt-5 flex flex-wrap gap-2.5">
                <Link to="/operator/product" className="text-[14px] w-fit font-bold flex items-center gap-[9px] bg-[#F2F3F5] px-[15px] py-[9px] rounded-[8px]">
                    <img src="/search/1.jpg" alt="search" className="w-[23px] rounded-[50%]" />
                    <p>Steam</p>
                </Link>
                <Link to="/operator/product" className="text-[14px] w-fit font-bold flex items-center gap-[9px] bg-[#F2F3F5] px-[15px] py-[9px] rounded-[8px]">
                    <img src="/search/2.jpg" alt="search" className="w-[23px] rounded-[50%]" />
                    <p>Spotify Premium</p>
                </Link>
                <Link to="/operator/product" className="text-[14px] w-fit font-bold flex items-center gap-[9px] bg-[#F2F3F5] px-[15px] py-[9px] rounded-[8px]">
                    <img src="/search/3.jpg" alt="search" className="w-[23px] rounded-[50%]" />
                    <p>Netflix</p>
                </Link>
                <Link to="/operator/product" className="text-[14px] w-fit font-bold flex items-center gap-[9px] bg-[#F2F3F5] px-[15px] py-[9px] rounded-[8px]">
                    <img src="/search/4.jpg" alt="search" className="w-[23px] rounded-[50%]" />
                    <p>App Store</p>
                </Link>
                <Link to="/operator/product" className="text-[14px] w-fit font-bold flex items-center gap-[9px] bg-[#F2F3F5] px-[15px] py-[9px] rounded-[8px]">
                    <img src="/search/5.jpg" alt="search" className="w-[23px] rounded-[50%]" />
                    <p>Playstation Network</p>
                </Link>
                <Link to="/operator/product" className="text-[14px] w-fit font-bold flex items-center gap-[9px] bg-[#F2F3F5] px-[15px] py-[9px] rounded-[8px]">
                    <img src="/search/6.jpg" alt="search" className="w-[23px] rounded-[50%]" />
                    <p>PUBG</p>
                </Link>
                <Link to="/operator/product" className="text-[14px] w-fit font-bold flex items-center gap-[9px] bg-[#F2F3F5] px-[15px] py-[9px] rounded-[8px]">
                    <img src="/search/7.jpg" alt="search" className="w-[23px] rounded-[50%]" />
                    <p>Roblox</p>
                </Link>
                <Link to="/operator/product" className="text-[14px] w-fit font-bold flex items-center gap-[9px] bg-[#F2F3F5] px-[15px] py-[9px] rounded-[8px]">
                    <img src="/search/8.jpg" alt="search" className="w-[23px] rounded-[50%]" />
                    <p>Discord</p>
                </Link>
            </div>
        </div>
    )
}

export default Search