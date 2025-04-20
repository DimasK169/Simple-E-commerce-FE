import flashSaleClient from "../client";
import { FlashSaleResponse, FlashSaleItem } from "../type";

// Request types
export type FlashSaleRequest = {
  Product_Code: string[];
  FlashSale_Name: string;
  FlashSale_Code: string;
  FlashSale_StartDate: string;
  FlashSale_EndDate: string;
  FlashSale_CreatedBy?: string;
  FlashSale_Discount: number;
};

export type FlashSaleUpdateRequest = {
  Product_Code: string[];
  FlashSale_Name: string;
  FlashSale_StartDate: string;
  FlashSale_EndDate: string;
  FlashSale_CreatedBy?: string;
  FlashSale_Discount: number;
};

// GET ALL flash sale
export const getFlashSale = async (page: number, size: number = 20) => {
  const response = await flashSaleClient.get<FlashSaleResponse>(
    `/flash-sale/get`,
    {
      params: { page, size },
    }
  );
  return response.data;
};

// GET flash sale by code
export const getFlashSaleByCode = async (fsCode: string) => {
  const response = await flashSaleClient.get<{
    code: string;
    message: string;
    data: FlashSaleItem[];
  }>(`/flash-sale/${fsCode}`);
  return response.data;
};

// CREATE flash sale
export const createFlashSale = async (payload: FlashSaleRequest) => {
  const response = await flashSaleClient.post<{
    code: string;
    message: string;
    data: any[];
  }>(`/flash-sale/save`, payload);
  return response.data;
};

// UPDATE flash sale
export const updateFlashSale = async (
  fsCode: string,
  payload: FlashSaleUpdateRequest
) => {
  const response = await flashSaleClient.patch<{
    code: string;
    message: string;
    data: any[];
  }>(`/flash-sale/update/${fsCode}`, payload);
  return response.data;
};

// DELETE flash sale
export const deleteFlashSale = async (fsCode: string) => {
  const response = await flashSaleClient.delete<{
    code: string;
    message: string;
    data: any;
  }>(`/flash-sale/delete/${fsCode}`);
  return response.data;
};

export const getActiveFlashSaleCode = async () => {
  const response = await flashSaleClient.get<{
    code: string;
    message: string;
    data: { FlashSale_Code: string };
  }>(`/flash-sale/active`);
  return response.data;
};

export const fetchAndShowFlashSale = async () => {
  const code = await getActiveFlashSaleCode();
  const response = await flashSaleClient.get<{
    code: string;
    message: string;
    data: FlashSaleItem[];
  }>(`/flash-sale/${code.data.FlashSale_Code}`);
  return response.data;
};
