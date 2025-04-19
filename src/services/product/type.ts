export interface Root {
  code: string;
  message: string;
  data: Data;
}

export interface Product {
  code: string;
  message: string;
  data: Content;
}

export interface Data {
  content: Content[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort2;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface Content {
  productId: number;
  productCode: string;
  productName: string;
  productImage: string;
  productDescription: string;
  productCategory: string;
  productStock: number;
  productPrice: number;
  productIsAvailable: boolean;
  productIsDelete: boolean;
  createdBy: string;
  createdDate: string;
  updatedDate: any;
}

export interface Pageable {
  pageNumber: number;
  pageSize?: number;
  sort?: Sort;
  offset?: number;
  paged?: boolean;
  unpaged?: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Sort2 {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
