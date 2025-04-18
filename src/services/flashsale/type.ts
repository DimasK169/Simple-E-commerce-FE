export type FlashSaleItem = {
  FlashSale_Name: string;
  FlashSale_Code: string;
  FlashSale_Product: string;
  FlashSale_Discount: number; // e.g. 0.5 for 50%
  Product_Price: number; // original product price
  FlashSale_Price: number; // discounted price
  Product_Image: string; // URL to product image
  FlashSale_StartDate: string; // ISO date string
  FlashSale_EndDate: string; // ISO date string
  FlashSale_CreatedBy: string;
  FlashSale_UpdateDate: string | null;
  FlashSale_IsDelete: boolean;
  Status: string; // e.g. "Fetched"
};

export type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type FlashSaleResponse = {
  code: string;
  message: string;
  data: {
    content: FlashSaleItem[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  };
};
