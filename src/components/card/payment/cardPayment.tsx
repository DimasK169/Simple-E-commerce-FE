import React, { useState } from "react";
import QRCode from "react-qr-code";
import {
  PaymentData,
  ProductItem,
} from "../../../services/payment/payment/type";
import { extractUrlsFromResponse } from "../../../utils/extractUrlsFromResponse";
import Countdown from "@/components/countdown/countdown";

interface CardProps {
  data: PaymentData[] | null;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<"ongoing" | "history">(
    "ongoing"
  );

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      alert("QR Code URL copied to clipboard!");
    });
  };

  if (!data) return <p>Loading...</p>;

  // Filter berdasarkan status
  const filteredData = data.filter((item) => {
    if (filterStatus === "ongoing") {
      return item.Payment_Status === "pending";
    } else {
      return (
        item.Payment_Status === "settlement" || item.Payment_Status === "expire"
      );
    }
  });

  return (
    <div className="p-4">
      {/* Tombol filter */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilterStatus("ongoing")}
          className={`px-4 py-2 rounded-full font-semibold ${
            filterStatus === "ongoing"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Ongoing
        </button>
        <button
          onClick={() => setFilterStatus("history")}
          className={`px-4 py-2 rounded-full font-semibold ${
            filterStatus === "history"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          History
        </button>
      </div>

      {filteredData.length === 0 ? (
        <p className="text-center text-gray-500">Tidak ada data.</p>
      ) : (
        filteredData.map((item, index) => {
          const isOpen = openIndex === index;
          const endDate = item.Payment_End_Date.toString();
          const paymentBody = item.Payment_Third_Party;
          const { qrUrl, deeplinkUrl } = extractUrlsFromResponse(paymentBody);
          const isSettlementOrExpire =
            item.Payment_Status === "settlement" ||
            item.Payment_Status === "expire";

          return (
            <div
              key={index}
              className="border rounded-2xl shadow-md p-6 mb-6 transition-all duration-300 bg-white hover:shadow-lg"
            >
              {item.Payment_Status === "pending" && (
                <div className="text-center pb-5">
                  <Countdown
                    endDate={endDate}
                    message="Waktu Pembayaran Berakhir"
                  />
                </div>
              )}

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

                  {!isSettlementOrExpire && qrUrl && (
                    <div className="mt-4 flex flex-col items-center">
                      <p className="font-medium text-gray-700 mb-2">
                        Scan QR Code:
                      </p>
                      <QRCode value={qrUrl} size={128} />
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => copyToClipboard(qrUrl!)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-full"
                        >
                          Copy QR Code URL
                        </button>
                        {deeplinkUrl && (
                          <a
                            href={deeplinkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-500 text-white px-4 py-2 rounded-full"
                          >
                            Go to Payment
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Card;
