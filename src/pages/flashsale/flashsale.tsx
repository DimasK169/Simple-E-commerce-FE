import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MuiButton,
} from "@mui/material";

import CustomTable from "@/components/ui/custom-table";
import {
  deleteFlashSale,
  getFlashSale,
} from "@/services/flashsale/flashsale/api";
import { FlashSaleItem } from "@/services/flashsale/type";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

const FlashSale: React.FC = () => {
  const [data, setData] = useState<FlashSaleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getFlashSale(page, 15);
      const uniqueMap = new Map();
      response.data.content.forEach((item: FlashSaleItem) => {
        if (!item.FlashSale_IsDelete) {
          if (!uniqueMap.has(item.FlashSale_Code)) {
            uniqueMap.set(item.FlashSale_Code, item);
          }
        }
      });
      setData(Array.from(uniqueMap.values()));
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching flash sale:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleAddFlashSale = () => {
    navigate("add");
  };

  const handleUpdateFlashSale = (code: string) => {
    navigate(`update/${code}`);
  };

  const handleDetailFlashSale = (code: string) => {
    navigate(`detail/${code}`);
  };

  const handleDeleteClick = (code: string) => {
    setSelectedCode(code);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCode) return;

    try {
      await deleteFlashSale(selectedCode);
      toast.success("Flash Sale berhasil dihapus.");
      await fetchData();
    } catch (error) {
      console.error("Gagal menghapus flash sale", error);
      toast.error("Gagal menghapus flash sale");
    } finally {
      setOpenDeleteModal(false);
      setSelectedCode(null);
    }
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

  const filteredData = Array.from(uniqueByCodeMap.values()).sort((a, b) =>
    a.FlashSale_Code.localeCompare(b.FlashSale_Code)
  );

  const tableData = filteredData.map((item) => ({
    ...item,
    FlashSale_Discount: `${item.FlashSale_Discount * 100}%`,
    FlashSale_StartDate: new Date(item.FlashSale_StartDate).toLocaleString(),
    FlashSale_EndDate: new Date(item.FlashSale_EndDate).toLocaleString(),
    action: (
      <div className="flex flex-row gap-5 justify-center items-center">
        <InfoIcon
          className="text-blue-500 cursor-pointer"
          onClick={() => handleDetailFlashSale(item.FlashSale_Code)}
        />
        <SettingsIcon
          className="text-yellow-500 cursor-pointer"
          onClick={() => handleUpdateFlashSale(item.FlashSale_Code)}
        />
        <DeleteIcon
          className="text-red-500 cursor-pointer"
          onClick={() => handleDeleteClick(item.FlashSale_Code)}
        />
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
      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogTitle>Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <p>
            Anda ingin menghapus <strong>{selectedCode}</strong>?
          </p>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={() => setOpenDeleteModal(false)} color="primary">
            Tidak
          </MuiButton>
          <MuiButton onClick={handleConfirmDelete} color="error">
            Ya
          </MuiButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FlashSale;
