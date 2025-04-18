import { createPayment } from "../../services/payment/payment/api";
import { CartItem } from "../../services/cart/cart/type";

interface CardProps {
  data: CartItem[] | null;
}

const CardCart: React.FC<CardProps> = ({ data }) => {
  if (!data) return <p>Loading...</p>;

  const pay = async () => {
    const result = await createPayment();
    alert(result.message);
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
                  <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-200 transition">
                    -
                  </button>
                  <span className="mx-3 font-medium text-gray-800">
                    {item.Cart_Quantity}
                  </span>
                  <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-200 transition">
                    +
                  </button>
                </div>
              </td>
              <td className="text-center text-gray-700 font-medium">
                Rp{" "}
                {Number(item.Cart_Total_Price_Per_Item ?? 0).toLocaleString()}
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
          onClick={pay}
          className="px-8 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition duration-200 shadow-md"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CardCart;
