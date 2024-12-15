import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ProductService } from '../services/product.service';
import { ProductActions } from './product.actions';
import { catchError, finalize, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectQueryParams } from './product.selectors';
import { tap } from 'node_modules/cypress/types/lodash';
import { Router } from '@angular/router';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(({ queryParams }) =>
        this.productService.getProducts(queryParams).pipe(
          map((response) =>
            ProductActions.loadProductsSuccess({
              products: response.data,
              total: response.total,
            })
          ),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    )
  );

  updateSort$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateSort),
      withLatestFrom(this.store.select(selectQueryParams)),
      map(([action, queryParams]) => {
        const newSortDirection =
          queryParams.sortBy === action.sortBy && queryParams.sortDirection === 'asc'
            ? 'desc'
            : 'asc';

        return ProductActions.updateQueryParams({
          queryParams: {
            sortBy: action.sortBy,
            sortDirection: newSortDirection,
          },
        });
      })
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap(({ product }) =>
        this.productService.updateProduct(product).pipe(
          map((updatedProduct) => ProductActions.updateProductSuccess({ product: updatedProduct })),
          finalize(() => this.router.navigate(['/'])),
          catchError((error) => of(ProductActions.updateProductFailure({ error })))
        )
      )
    )
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProduct),
      mergeMap(({ id }) =>
        this.productService.getProductById(id).pipe(
          map((product) => ProductActions.loadProductSuccess({ product })),
          catchError((error) => of(ProductActions.loadProductFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private store: Store,  private productService: ProductService, private router: Router) {
  }
}
