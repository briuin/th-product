import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { QueryParams } from '../../models/query-params.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AddProductModalComponent, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  apiUrl = environment.apiUrl;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 1;
  total: number = 0;
  sortBy: string = 'name';
  sortDirection: string = 'asc';
  limitOptions: number[] = [1, 5, 10, 20, 50];

  showAddModal = false;

  constructor(private productService: ProductService) {}

  get totalPage() {
    return Math.ceil(this.total / this.itemsPerPage);
  }

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

    this.productService
      .getProducts(queryParams)
      .subscribe((response: any) => {
        this.products = response.data;
        this.filteredProducts = this.products;
        this.total = response.total;
      });
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
    if (newPage > 0 && newPage <= Math.ceil(this.total / this.itemsPerPage)) {
      this.currentPage = newPage;
      this.loadProducts();
    }
  }

  changeLimit(): void {
    this.currentPage = 1;
    this.loadProducts();
  }
}
