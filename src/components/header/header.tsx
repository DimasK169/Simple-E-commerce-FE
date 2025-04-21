import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Notification from "./notification";
import { useAuth } from "@/context/authContext";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { FaPlus } from "react-icons/fa6";
import { BiSolidLogIn, BiSolidLogOut } from "react-icons/bi";
import { searchProductAdmin } from "@/services/product/list/api";

const Header: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleSearchClick = async () => {
    if (!search.trim()) return;

    if (auth?.User_Role === "Admin") {
      try {
        await searchProductAdmin(search, 0, 10);
        navigate(`admin/search?keyword=${encodeURIComponent(search)}`);
      } catch (err) {
        console.error("Admin search failed:", err);
      }
    } else {
      setSearchParams({ search });
      navigate(`/search?keyword=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div className="flex flex-row items-center gap-6 py-5 px-6 shadow bg-[#F8F8F8] text-lg font-semibold">
      <h2 className="text-black whitespace-nowrap">
        <span className="text-red-500">Simple</span> E-Commerce
      </h2>

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

      <nav className="hidden md:flex gap-6 items-center">
        {auth?.User_Role === "Admin" ? (
          <>
            <a
              href="/admin/products/add"
              className="text-gray-700 hover:text-red-500"
            >
              <FaPlus />
            </a>
            <a
              href="/admin/flash-sale"
              className="text-gray-700 hover:text-red-500"
            >
              <FlashOnIcon />
            </a>
          </>
        ) : (
          <a href="/cart" className="text-gray-700 hover:text-red-500">
            <ShoppingCartIcon />
          </a>
        )}

        {auth ? (
          <a
            href="/login"
            className="text-gray-700 hover:text-red-500"
            onClick={() => localStorage.clear()}
          >
            <BiSolidLogOut />
          </a>
        ) : (
          <a href="/login" className="text-gray-700 hover:text-red-500">
            <BiSolidLogIn />
          </a>
        )}

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
