import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../models/product.model';
import { QueryParams } from '../models/query-params.model';

export const ProductActions = createActionGroup({
  source: 'Product',
  events: {
    'Load Products': props<{ queryParams: QueryParams }>(),
    'Load Products Success': props<{ products: Product[]; total: number }>(),
    'Load Products Failure': props<{ error: any }>(),
    'Update Query Params': props<{ queryParams: Partial<QueryParams> }>(),
    'Toggle Add Modal': props<{ showAddModal: boolean }>(),
    'Update Sort': props<{ sortBy: string }>(),
    'Update Product': props<{ product: Product }>(),
    'Update Product Success': props<{ product: Product }>(),
    'Update Product Failure': props<{ error: any }>(),
    'Load Product': props<{ id: number }>(),
    'Load Product Success': props<{ product: Product }>(),
    'Load Product Failure': props<{ error: any }>(),
  },
});
