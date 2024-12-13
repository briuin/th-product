import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { UploadService } from '../../services/upload.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  apiUrl = environment.apiUrl;
  product!: Product;
  isUploading: boolean = false;
  isSaving: boolean = false;
  isEditing: boolean = false;
  uploadedImageUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(parseInt(productId, 10));
    }
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (err) => {
        console.error('Failed to load product:', err);
        alert('Failed to load product details.');
        this.router.navigate(['/']);
      },
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.isUploading = true;
      this.uploadService.uploadImage(file).subscribe({
        next: (response) => {
          this.uploadedImageUrl = response.url;
          this.isUploading = false;
        },
        error: (err) => {
          console.error('Upload failed:', err);
          this.isUploading = false;
        },
      });
    }
  }

  saveProduct(): void {
    if (!this.product.name || !this.product.type || this.product.price <= 0) {
      alert('Please fill in all required fields.');
      return;
    }

    if (this.uploadedImageUrl) {
      this.product.picture = this.uploadedImageUrl;
    }

    this.isSaving = true;
    this.productService.updateProduct(this.product).subscribe({
      next: () => {
        alert('Product updated successfully!');
        this.isSaving = false;
        this.isEditing = false;
      },
      error: (err) => {
        console.error('Error updating product:', err);
        alert('Failed to update product.');
        this.isSaving = false;
      },
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.loadProduct(this.product.id!); 
  }

  navigateBackToList(): void {
    this.router.navigate(['/']);
  }
}
