import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddProductModalComponent } from '../../components/add-product-modal/add-product-modal.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { QueryParams } from '../../models/query-params.model';
import { map, Observable, shareReplay, take } from 'rxjs';
import { ProductListComponent } from 'src/app/components/product-list/product-list.component';
import { ProductSortComponent } from 'src/app/components/product-sort/product-sort.component';
import { ProductFilterComponent } from 'src/app/components/product-filter/product-filter.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { SortOptions } from 'src/app/models/sort-options.model';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, FormsModule, AddProductModalComponent, RouterModule, ProductListComponent, ProductSortComponent, ProductFilterComponent, PaginationComponent],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent {
  apiUrl = environment.apiUrl;
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 2;
  sortBy: string = '';
  sortDirection: string = '';
  limitOptions: number[] = [2, 6, 10, 20, 50];
  products$!: Observable<Product[]>;
  total$!: Observable<number>;
  totalPage$!: Observable<number>;

  showAddModal = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const queryParams: QueryParams = {
      searchText: this.searchQuery,
      sortBy: this.sortBy,
      sortDirection: this.sortDirection,
      page: this.currentPage,
      perPage: this.itemsPerPage,
    };

    const response$ = this.productService.getProducts(queryParams).pipe(shareReplay(1));

    this.products$ = response$.pipe(map((response) => response.data));
    this.total$ = response$.pipe(map((response) => response.total));
    this.totalPage$ = response$.pipe(map((response) => Math.ceil(response.total / this.itemsPerPage)));
  }

  openAddProductModal(): void {
    this.showAddModal = true;
  }

  closeAddProductModal(): void {
    this.showAddModal = false;
  }

  applyFilter(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.loadProducts();
  }

  resetFilter() {
    this.searchQuery = '';
    this.loadProducts();
  }

  applySort(options: SortOptions): void {
    if (this.sortBy === options.sortBy) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = options.sortBy;
      this.sortDirection = 'asc';
    }
    this.loadProducts();
  }

  changePage(newPage: number): void {
    this.totalPage$.pipe(take(1)).subscribe((x) => {
      if (newPage > 0 && newPage <= x) {
        this.currentPage = newPage;
        this.loadProducts();
      }
    });
  }

  changeLimit(limit: number): void {
    this.currentPage = 1;
    this.itemsPerPage = limit;
    this.loadProducts();
  }
}
