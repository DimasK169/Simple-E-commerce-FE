export interface PaymentResponse {
  code: string;
  message: string;
  data: PaymentData[];
  error: [];
}

export interface PaymentData extends PaymentResponse {
  Payment_Number: string;
  Payment_Type: string;
  Product: ProductItem[];
  Cart_Total_Price: number;
  Payment_Status: string;
  Payment_Start_Date: string; // ISO string format
  Payment_End_Date: string;
  Payment_Created_Date: string;
}
export interface ProductItem extends PaymentData {
  Product_Name: string;
  Product_Quantity: string;
  Cart_Total_Price_Per_Item: string;
}
