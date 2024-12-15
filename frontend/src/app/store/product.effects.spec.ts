import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ProductEffects } from './product.effects';
import { ProductService } from '../services/product.service';
import { ProductActions } from './product.actions';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { addMatchers, cold, hot, initTestScheduler } from 'jasmine-marbles';
import { selectQueryParams } from './product.selectors';

describe('ProductEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductEffects;
  let productService: jasmine.SpyObj<ProductService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProducts',
      'getProductById',
      'updateProduct',
      'createProduct',
    ]);

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          selectors: [
            {
              selector: selectQueryParams,
              value: {
                sortBy: 'name',
                sortDirection: 'asc',
              },
            },
          ],
        }),
        { provide: ProductService, useValue: productServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    effects = TestBed.inject(ProductEffects);
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    initTestScheduler();
    addMatchers();
  });

  it('should dispatch loadProductsSuccess when loadProducts is successful', () => {
    const queryParams = { page: 1, perPage: 10, searchText: '', sortBy: '', sortDirection: '' };
    const products = [{ id: 1, name: 'Product 1', type: '', price: 20 }];
    const total = 1;

    const action = ProductActions.loadProducts({ queryParams });
    const completion = ProductActions.loadProductsSuccess({ products, total });

    productService.getProducts.and.returnValue(
      cold('-a|', { a: { data: products, total } })
    );

    actions$ = hot('-a', { a: action });

    expect(effects.loadProducts$).toBeObservable(cold('--b', { b: completion }));
  });

  it('should dispatch loadProductsFailure when loadProducts fails', () => {
    const queryParams = { page: 1, perPage: 10, searchText: '', sortBy: '', sortDirection: ''  };
    const error = 'Failed to load products';

    const action = ProductActions.loadProducts({ queryParams });
    const completion = ProductActions.loadProductsFailure({ error });

    productService.getProducts.and.returnValue(
      cold('-#|', {}, error)
    );

    actions$ = hot('-a', { a: action });

    expect(effects.loadProducts$).toBeObservable(cold('--b', { b: completion }));
  });

  it('should dispatch updateProductSuccess when updateProduct is successful', () => {
    const product = { id: 1, name: 'Updated Product', type: '', price: 30 };
    const updatedProduct = { ...product, name: 'Updated Product Name' };

    const action = ProductActions.updateProduct({ product });
    const completion = ProductActions.updateProductSuccess({ product: updatedProduct });

    productService.updateProduct.and.returnValue(cold('-a|', { a: updatedProduct }));

    actions$ = hot('-a', { a: action });

    expect(effects.updateProduct$).toBeObservable(cold('--b', { b: completion }));
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should dispatch updateProductFailure when updateProduct fails', () => {
    const product = { id: 1, name: 'Updated Product', type: '', price: 30 };
    const error = 'Failed to update product';

    const action = ProductActions.updateProduct({ product });
    const completion = ProductActions.updateProductFailure({ error });

    productService.updateProduct.and.returnValue(
      cold('-#|', {}, error)
    );

    actions$ = hot('-a', { a: action });

    expect(effects.updateProduct$).toBeObservable(cold('--b', { b: completion }));
  });

  it('should dispatch createProductSuccess when createProduct is successful', () => {
    const product = { name: 'New Product' };

    const action = ProductActions.createProduct({ product });
    const completion = ProductActions.createProductSuccess();

    productService.createProduct.and.returnValue(cold('-a|', { a: product }));

    actions$ = hot('-a', { a: action });

    expect(effects.createProduct$).toBeObservable(cold('--b', { b: completion }));
  });

});
