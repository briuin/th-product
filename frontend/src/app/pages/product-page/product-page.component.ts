import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddProductModalComponent } from '../../components/add-product-modal/add-product-modal.component';
import { Product } from '../../models/product.model';
import { RouterModule } from '@angular/router';
import { QueryParams } from '../../models/query-params.model';
import { Observable } from 'rxjs';
import { ProductListComponent } from 'src/app/components/product-list/product-list.component';
import { ProductSortComponent } from 'src/app/components/product-sort/product-sort.component';
import { ProductFilterComponent } from 'src/app/components/product-filter/product-filter.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { SortOptions } from 'src/app/models/sort-options.model';
import { Store } from '@ngrx/store';
import { selectProducts, selectQueryParams, selectShowAddModal, selectTotal, selectTotalPages } from 'src/app/store/product.selectors';
import { ProductActions } from 'src/app/store/product.actions';
import { PRODUCT_PAGINATION_LIMIT_OPTIONS } from 'src/app/app.constant';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AddProductModalComponent,
    RouterModule,
    ProductListComponent,
    ProductSortComponent,
    ProductFilterComponent,
    PaginationComponent,
  ],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent {
  private store = inject(Store);

  products$: Observable<Product[]> = this.store.select(selectProducts);
  total$: Observable<number> = this.store.select(selectTotal);
  totalPage$: Observable<number> = this.store.select(selectTotalPages);
  showAddModal$: Observable<boolean> = this.store.select(selectShowAddModal);
  queryParams$: Observable<QueryParams> = this.store.select(selectQueryParams);
  limitOptions: number[] = PRODUCT_PAGINATION_LIMIT_OPTIONS;

  constructor() {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.store.select(selectQueryParams).subscribe((queryParams) => {
        this.store.dispatch(ProductActions.loadProducts({ queryParams }));
      });
  }

  applyFilter(searchQuery: string): void {
    this.store.dispatch(
      ProductActions.updateQueryParams({ queryParams: { searchText: searchQuery } })
    );
    this.loadProducts();
  }

  resetFilter(): void {
    this.store.dispatch(
      ProductActions.updateQueryParams({ queryParams: { searchText: '' } })
    );
    this.loadProducts();
  }

  changePage(newPage: number): void {
    this.store.dispatch(
      ProductActions.updateQueryParams({ queryParams: { page: newPage } })
    );
    this.loadProducts();
  }

  changeLimit(limit: number): void {
    this.store.dispatch(
      ProductActions.updateQueryParams({ queryParams: { perPage: limit, page: 1 } })
    );
    this.loadProducts();
  }

  openAddProductModal(): void {
    this.store.dispatch(ProductActions.toggleAddModal({ showAddModal: true }));
  }

  closeAddProductModal(): void {
    this.store.dispatch(ProductActions.toggleAddModal({ showAddModal: false }));
  }
}
