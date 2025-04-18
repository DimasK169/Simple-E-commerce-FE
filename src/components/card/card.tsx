import React, { useState } from "react";
import { PaymentData, ProductItem } from "../../services/payment/payment/type";

interface CardProps {
  data: PaymentData[] | null;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-4">
      {data.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="border rounded-2xl shadow-md p-6 mb-6 transition-all duration-300 bg-white hover:shadow-lg"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
              <div className="flex-1 space-y-1">
                <p
                  className="whitespace-nowrap overflow-hidden text-ellipsis"
                  title={item.Payment_Number}
                >
                  <strong>Payment Number:</strong> {item.Payment_Number}
                </p>
                <p>
                  <strong>Total Harga:</strong> Rp{" "}
                  {item.Cart_Total_Price.toLocaleString()}
                </p>
              </div>

              <div className="flex-1 ps-5 space-y-1">
                <p>
                  <strong>Type:</strong> {item.Payment_Type}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.Payment_Status === "settlement"
                        ? "bg-green-100 text-green-700"
                        : item.Payment_Status === "expire"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.Payment_Status}
                  </span>
                </p>
              </div>

              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`flex items-center gap-1 px-4 py-1.5 text-sm font-semibold rounded-full transition duration-200 shadow 
    ${
      isOpen
        ? "bg-red-100 text-red-600 hover:bg-red-200"
        : "bg-blue-100 text-blue-600 hover:bg-blue-200"
    }`}
              >
                {isOpen ? (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                    Hide Detail
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    Show Detail
                  </>
                )}
              </button>
            </div>

            {isOpen && (
              <div className="mt-5 bg-gray-50 p-4 rounded-lg">
                <p className="font-medium mb-3 text-gray-700">Cart Items:</p>
                {item.Product.map((detail: ProductItem, idx: number) => (
                  <div
                    key={idx}
                    className="grid grid-cols-3 gap-4 text-sm text-center border-b border-gray-200 py-2"
                  >
                    <span className="text-gray-800 break-words">
                      {detail.Product_Name}
                    </span>
                    <span className="text-gray-600">
                      {detail.Product_Quantity} pcs
                    </span>
                    <span className="text-gray-700 font-medium">
                      Rp{" "}
                      {Number(
                        detail.Cart_Total_Price_Per_Item
                      ).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Card;
