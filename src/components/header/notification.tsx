import { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getActiveFlashSaleCode } from "@/services/flashsale/flashsale/api";

export default function Notification() {
  const [hasFlashSale, setHasFlashSale] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const checkFlashSale = async () => {
      try {
        const res = await getActiveFlashSaleCode();
        if (res?.data?.FlashSale_Code) {
          setHasFlashSale(true);
          setShowPopup(true);
        }
      } catch (error) {
        console.error("Error checking flash sale:", error);
      }
    };

    checkFlashSale();
  }, []);

  const handleNotificationClick = () => {
    setShowPopup((prev) => !prev);
    setHasFlashSale(false); // 👈 removes the red dot
  };

  return (
    <div className="relative">
      <button
        onClick={handleNotificationClick}
        className="relative text-gray-700 hover:text-red-500"
      >
        <NotificationsIcon />
        {hasFlashSale && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
        )}
      </button>

      {showPopup && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 text-sm z-50">
          🎉 A flash sale is active!
        </div>
      )}
    </div>
  );
}
