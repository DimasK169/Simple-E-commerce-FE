import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search"; // ✅ Import the icon

const navData = [
  {
    route: "/",
    label: "Cart",
    icon: <ShoppingCartIcon />,
  },
  {
    route: "/",
    label: "Profile",
    icon: <PersonIcon />,
  },
  {
    route: "/",
    label: "Notification",
    icon: <NotificationsIcon />,
  },
];

const Header: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const handleSearchClick = () => {
    // Currently an empty function
    console.log("Search icon clicked");
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

      {/* Navigation Icons */}
      <nav className="hidden md:flex gap-6">
        {navData.map((item, idx) => (
          <a
            key={idx}
            href={item.route}
            className="text-gray-700 hover:text-red-500"
          >
            {item.icon}
          </a>
        ))}
      </nav>

      {/* Mobile Menu Button */}
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
