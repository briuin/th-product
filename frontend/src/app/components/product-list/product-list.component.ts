import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AddProductModalComponent, RouterModule], 
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
    products: Product[] = [];
    filteredProducts: Product[] = [];
    searchQuery: string = '';
    currentPage: number = 1;
    itemsPerPage: number = 6;
    totalPages: number = 0;
  
    showAddModal = false;
  
    constructor(private productService: ProductService) {}
  
    ngOnInit(): void {
      this.loadProducts();
    }
  
    loadProducts(): void {
      this.productService.getProducts().subscribe((data: Product[]) => {
        this.products = data;
        this.filteredProducts = this.products;
      });
    }
  
    openAddProductModal(): void {
      this.showAddModal = true;
    }
  
    closeAddProductModal(): void {
      this.showAddModal = false;
    }
}
