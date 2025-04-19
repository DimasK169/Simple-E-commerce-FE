import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";

import CustomTable from "@/components/ui/custom-table";
import { getFlashSale } from "@/services/flashsale/get/api";
import { FlashSaleItem } from "@/services/flashsale/type";
import { Button } from "@/components/ui/button";

const FlashSale: React.FC = () => {
  const [data, setData] = useState<FlashSaleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getFlashSale(page, 10);
        setData(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching flash sale:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleAddFlashSale = () => {
    navigate("/flash-sale/add");
  };

  const columns = [
    { header: "Name", accessor: "FlashSale_Name" },
    { header: "Code", accessor: "FlashSale_Code" },
    { header: "Discount", accessor: "FlashSale_Discount" },
    { header: "Start Date", accessor: "FlashSale_StartDate" },
    { header: "End Date", accessor: "FlashSale_EndDate" },
    { header: "Action", accessor: "action" },
  ];

  const uniqueByCodeMap = new Map();

  data.forEach((item) => {
    if (!uniqueByCodeMap.has(item.FlashSale_Code)) {
      uniqueByCodeMap.set(item.FlashSale_Code, item);
    }
  });

  const filteredData = Array.from(uniqueByCodeMap.values());

  const tableData = filteredData.map((item) => ({
    ...item,
    FlashSale_Discount: `${item.FlashSale_Discount * 100}%`,
    FlashSale_StartDate: new Date(item.FlashSale_StartDate).toLocaleString(),
    FlashSale_EndDate: new Date(item.FlashSale_EndDate).toLocaleString(),
    action: (
      <div className="flex flex-row gap-5 justify-center items-center">
        <InfoIcon className="text-blue-500 cursor-pointer" />
        <SettingsIcon className="text-yellow-500 cursor-pointer" />
        <DeleteIcon className="text-red-500 cursor-pointer" />
      </div>
    ),
  }));

  return (
    <div className="flex flex-col p-10">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Flash Sale Data</h1>
        <Button
          className="bg-[#1dc42e] hover:bg-[#039912] cursor-pointer"
          onClick={handleAddFlashSale}
        >
          Tambah
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CustomTable columns={columns} data={tableData} />
          <div className="flex justify-center mt-5 gap-3">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`px-4 py-2 rounded ${
                  page === i
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FlashSale;
