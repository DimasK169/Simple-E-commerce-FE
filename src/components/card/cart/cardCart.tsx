import { createPayment } from "../../../services/payment/payment/api";
import { CartItem } from "../../../services/cart/cart/type";
import { deleteCart, updateCart } from "../../../services/cart/cart/api";
import { useNavigate } from "react-router";
import { useState } from "react";
import { getProduct } from "@/services/product/list/api";

interface CardProps {
  data: CartItem[] | null;
  refetch: () => void;
}

const CardCart: React.FC<CardProps> = ({ data, refetch }) => {
  if (!data)
    return (
      <div className="text-center">
        <p>Data Cart Tidak Ada</p>
      </div>
    );
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disabledItems, setDisabledItems] = useState<{
    [key: string]: boolean;
  }>({});

  const pay = async (type: string) => {
    const result = await createPayment(type);
    setIsModalOpen(false);
    navigate(`/payment`);
  };

  const handleUpdateQuantity = async (
    item: CartItem,
    change: number,
    fsCode: string | null,
    productCode: string | null
  ) => {
    if (item.Product_Quantity != 0) {
      const newQuantity = (item.Cart_Quantity || 0) + change;
      if (newQuantity < 1) return;

      const result = await updateCart(
        item.Cart_Quantity + change,
        fsCode,
        productCode
      );
      if (result.success) {
        refetch();
      } else {
        alert("Failed to update cart: " + result.message);
      }
    } else {
      alert("Failed to update cart: Stock Habis");
    }
  };

  const handleUpdateQuantityMinus = async (
    item: CartItem,
    change: number,
    fsCode: string | null,
    productCode: string | null
  ) => {
    const newQuantity = (item.Cart_Quantity || 0) + change;
    if (newQuantity < 1) return;

    const result = await updateCart(
      item.Cart_Quantity + change,
      fsCode,
      productCode
    );
    if (result.success) {
      refetch();
    } else {
      alert("Failed to update cart: " + result.message);
    }
  };

  const handleDelete = async (productCode: string | null) => {
    const result = await deleteCart(productCode);
    if (result.success) {
      refetch();
    } else {
      alert("Failed to delete item: " + result.message);
    }
  };
  const items = data.slice(0, -1); // semua kecuali yang terakhir
  const totalRow = data[data.length - 1]; // total ada di data terakhir

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg m-2 mt-10">
      <h2 className="text-center mb-8 text-2xl font-bold text-gray-800">
        Your Cart
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-300 text-gray-600 uppercase text-sm tracking-wider">
            <th className="text-left p-4">Item</th>
            <th className="text-center p-4">Price</th>
            <th className="text-center p-4">Quantity</th>
            <th className="text-center p-4">Total</th>
            <th className="text-center p-4">Hapus</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="flex items-center gap-4 py-4 px-4">
                <img
                  src={item.Product_Image || ""}
                  width="70"
                  alt={item.Product_Name || "Product"}
                  className="rounded shadow-sm"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {item.Product_Name}
                  </p>
                  <p className="text-sm text-gray-500">{item.Product_Desc}</p>
                </div>
              </td>
              <td className="text-center text-gray-700 font-medium">
                Rp {Number(item.Product_Price ?? 0).toLocaleString()}
              </td>
              <td className="text-center">
                <div className="flex justify-center items-center">
                  <button
                    onClick={() =>
                      handleUpdateQuantityMinus(
                        item,
                        -1,
                        item.Fs_Code,
                        item.Product_Code
                      )
                    }
                    className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-200 transition"
                  >
                    -
                  </button>
                  <span className="mx-3 font-medium text-gray-800">
                    {item.Cart_Quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(
                        item,
                        +1,
                        item.Fs_Code,
                        item.Product_Code
                      )
                    }
                    disabled={!!disabledItems[item.Product_Code || ""]}
                    className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-200 transition"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="text-center text-gray-700 font-medium">
                Rp{" "}
                {Number(item.Cart_Total_Price_Per_Item ?? 0).toLocaleString()}
              </td>
              <td className="text-center text-gray-700 font-medium">
                <div>
                  <button
                    onClick={() => handleDelete(item.Product_Code)}
                    className="px-8 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition duration-200 shadow-md"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {totalRow && (
            <tr>
              <td
                colSpan={3}
                className="font-semibold text-right pr-6 pt-6 text-gray-800"
              >
                Total:
              </td>
              <td className="font-bold text-center pt-6 text-gray-800">
                Rp {Number(totalRow.Cart_Total_Price ?? 0).toLocaleString()}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="text-center mt-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition duration-200 shadow-md"
        >
          Checkout
        </button>
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 shadow-lg relative">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Pilih Metode Pembayaran
            </h3>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => pay("gopay")}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
              >
                GoPay
              </button>
              <button
                onClick={() => pay("akulaku")}
                className="bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-md font-semibold"
              >
                Akulaku
              </button>
              <button
                onClick={() => pay("bank_transfer")}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
              >
                Permata
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-sm text-gray-500 mt-2 hover:underline"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CardCart;
