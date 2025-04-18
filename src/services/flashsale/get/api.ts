import flashSaleClient from "../client";
import { FlashSaleResponse } from "../type";

export const getFlashSale = async (page: number, size: number = 20) => {
  const response = await flashSaleClient.get<FlashSaleResponse>(
    `/flash-sale/get`,
    {
      params: {
        page,
        size,
      },
    }
  );
  return response.data;
};
