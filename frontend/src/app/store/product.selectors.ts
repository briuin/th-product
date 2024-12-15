import { createFeature, createSelector } from '@ngrx/store';
import { productReducer } from './product.reducer';

// Define the feature
export const productFeature = createFeature({
  name: 'product',
  reducer: productReducer,
});

// Use built-in selectors
export const selectProducts = productFeature.selectProducts;
export const selectTotal = productFeature.selectTotal;
export const selectQueryParams = productFeature.selectQueryParams;
export const selectIsLoading = productFeature.selectIsLoading;
export const selectShowAddModal = productFeature.selectShowAddModal;
export const selectCurrentProduct = productFeature.selectCurrentProduct;
export const selectIsSaving = productFeature.selectIsSaving;

// Custom selector for total pages
export const selectTotalPages = createSelector(
  selectTotal,
  selectQueryParams,
  (total, queryParams) => Math.ceil(total / queryParams.perPage)
);
