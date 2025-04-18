export interface CartResponse {
  code: string;
  message: string;
  data: CartItem[];
}

export interface CartItem extends CartResponse {
  Product_Name: string | null;
  Product_Desc: string | null;
  Product_Price: number | null;
  Cart_Total_Price_Per_Item: number | null;
  Cart_Total_Price: number | null;
  Cart_Quantity: number | null;
  Product_Image: string | null;
  Created_Date: string | null;
}
