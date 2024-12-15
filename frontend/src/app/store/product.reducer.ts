import { createReducer, on } from '@ngrx/store';
import { initialProductState, ProductState } from './product.state';
import { ProductActions } from './product.actions';

export const productReducer = createReducer(
  initialProductState,
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ProductActions.loadProductsSuccess, (state, { products, total }) => ({
    ...state,
    products,
    total,
    isLoading: false,
  })),
  on(ProductActions.loadProductsFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(ProductActions.updateQueryParams, (state, { queryParams }) => ({
    ...state,
    queryParams: {
      ...state.queryParams,
      ...queryParams,
    },
  })),
  on(ProductActions.toggleAddModal, (state, { showAddModal }) => ({
    ...state,
    showAddModal,
  })),
  on(ProductActions.loadProductSuccess, (state, { product }) => ({
    ...state,
    currentProduct: product,
  })),
  on(ProductActions.updateProduct, (state) => ({
    ...state,
    isSaving: true,
  })),
  on(ProductActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    currentProduct: product,
    isSaving: false,
  })),
  on(ProductActions.updateProductFailure, (state) => ({
    ...state,
    isSaving: false,
  })),
  on(ProductActions.createProductSuccess, (state) => ({
    ...state,
  })),
  on(ProductActions.createProductFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
