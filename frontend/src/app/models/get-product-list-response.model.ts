import { Product } from "./product.model";

export interface GetProductListResponse {
  data: Product[];
  page: number;
  perPage: number;
  total: number;
}
