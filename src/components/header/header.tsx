import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search"; // or your import path
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import Notification from "./Notification"; // adjust as needed

const Header: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (search.trim()) {
      setSearchParams({ search });
      navigate(`/search?keyword=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div className="flex flex-row items-center gap-6 py-5 px-6 shadow bg-[#F8F8F8] text-lg font-semibold">
      {/* Logo */}
      <h2 className="text-black whitespace-nowrap">
        <span className="text-red-500">Simple</span> E-Commerce
      </h2>

      {/* Search bar - full width */}
      <div className="relative flex-grow hidden md:block">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-2 pr-12 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
        />
        <button
          onClick={handleSearchClick}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
        >
          <SearchIcon />
        </button>
      </div>

      <nav className="hidden md:flex gap-6">
        <a href={"/cart"} className="text-gray-700 hover:text-red-500">
          <ShoppingCartIcon />
        </a>
        <a href={"/profile"} className="text-gray-700 hover:text-red-500">
          <PersonIcon />
        </a>
        <Notification />
      </nav>

      <button
        onClick={() => setToggle((prev) => !prev)}
        className="flex md:hidden"
      >
        {toggle ? "Close" : "Open"}
      </button>
    </div>
  );
};

export default Header;
