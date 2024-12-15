import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Product } from '../../models/product.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsUploading, selectUploadedImageUrl } from 'src/app/store/upload.selector';
import { ProductActions } from 'src/app/store/product.actions';
import { selectCurrentProduct, selectIsSaving } from 'src/app/store/product.selectors';
import { UploadActions } from 'src/app/store/upload.actions';
import { UiInputComponent } from 'src/app/ui/ui-input.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, UiInputComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  apiUrl = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  product$: Observable<Product | null> = this.store.select(selectCurrentProduct);
  isUploading$: Observable<boolean> = this.store.select(selectIsUploading);
  isSaving$: Observable<boolean> = this.store.select(selectIsSaving);
  uploadedImageUrl$: Observable<string | null> = this.store.select(selectUploadedImageUrl);

  isEditing: boolean = false;
  editableProduct!: Product;

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.store.dispatch(ProductActions.loadProduct({ id: parseInt(productId, 10) }));
    }

    this.product$.subscribe((product) => {
      if (product && !this.isEditing) {
        this.editableProduct = { ...product };
      }
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.editableProduct = null as any; 
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.store.dispatch(UploadActions.uploadImage({ file }));
    }
  }

  saveProduct(product: Product): void {
    if (this.editableProduct) {
      this.store.dispatch(ProductActions.updateProduct({ product: this.editableProduct }));
      this.isEditing = false;
    }
  }

  cancelEdit(productId: number): void {
    this.isEditing = false;
    this.product$.subscribe((product) => {
      if (product) {
        this.editableProduct = { ...product };
      }
    });

  }

  navigateBackToList(): void {
    this.router.navigate(['/']);
  }
}