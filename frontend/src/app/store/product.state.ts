import { Product } from '../models/product.model';
import { QueryParams } from '../models/query-params.model';

export interface ProductState {
  products: Product[];
  total: number;
  queryParams: QueryParams;
  isLoading: boolean;
  showAddModal: boolean;
  currentProduct: Product;
  isSaving: boolean;
}

export const initialProductState: ProductState = {
  products: [],
  total: 0,
  queryParams: {
    searchText: '',
    sortBy: '',
    sortDirection: '',
    page: 1,
    perPage: 2,
  },
  isLoading: false,
  showAddModal: false,
  currentProduct: {} as Product,
  isSaving: false
};
