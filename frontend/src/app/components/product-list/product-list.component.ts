import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { QueryParams } from '../../models/query-params.model';
import { map, Observable, take } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AddProductModalComponent, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
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

    const response$ = this.productService.getProducts(queryParams).pipe(take(1));

    this.products$ = response$.pipe(map((response: any) => response.data));
    this.total$ = response$.pipe(map((response: any) => response.total));
    this.totalPage$ = response$.pipe(map((response: any) => Math.ceil(response.total / this.itemsPerPage)));
  }

  openAddProductModal(): void {
    this.showAddModal = true;
  }

  closeAddProductModal(): void {
    this.showAddModal = false;
  }

  applyFilter() {
    this.loadProducts();
  }

  resetFilter() {
    this.searchQuery = '';
    this.loadProducts();
  }

  applySort(sortBy: string): void {
    if (this.sortBy === sortBy) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = sortBy;
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

  changeLimit(): void {
    this.currentPage = 1;
    this.loadProducts();
  }
}
