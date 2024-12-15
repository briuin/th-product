import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { UiInputComponent } from 'src/app/ui/ui-input.component';
import { UploadActions } from 'src/app/store/upload.actions';
import { selectIsUploading, selectUploadedImageUrl } from 'src/app/store/upload.selector';
import { Store } from '@ngrx/store';
import { ProductActions } from 'src/app/store/product.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-product-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, UiInputComponent],
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
})
export class AddProductModalComponent {
  @Output() onClose = new EventEmitter<void>();
  apiUrl = environment.apiUrl;

  product = {
    name: '',
    type: '',
    price: 0,
    description: '',
    picture: '',
  };

  isUploading$: Observable<boolean> = this.store.select(selectIsUploading);
  uploadedImageUrl$: Observable<string | null> = this.store.select(selectUploadedImageUrl);

  constructor(private store: Store) {}

  saveProduct(): void {
    if (!this.product.name || !this.product.type || this.product.price <= 0) {
      alert('Please fill in all required fields.');
      return;
    }

    this.store.dispatch(ProductActions.createProduct({ product: this.product }));

    this.closeModal();
  }

  closeModal(): void {
    this.onClose.emit();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.store.dispatch(UploadActions.uploadImage({ file }));
      this.uploadedImageUrl$.subscribe((url) => {
        if (url) {
          this.product.picture = url;
        }
      });
    }
  }
}
