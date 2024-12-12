import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-add-product-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
})
export class AddProductModalComponent {
  @Output() onSave = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<void>();

  uploadedImageUrl = '';
  isUploading = false;

  product = {
    name: '',
    type: '',
    price: 0,
    description: '',
    picture: '',
  };

  constructor(private uploadService: UploadService) {}

  saveProduct(): void {
    if (!this.product.name || !this.product.type || this.product.price <= 0) {
      alert('Please fill in all required fields.');
      return;
    }
    this.onSave.emit(this.product);
  }

  closeModal(): void {
    this.onClose.emit();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Start the upload process
      this.isUploading = true;
      this.uploadService.uploadImage(file).subscribe({
        next: (response) => {
          this.uploadedImageUrl = `http://localhost:8080${response.url}`;
          this.product.picture = response.url; // Save URL to product data
          this.isUploading = false;
        },
        error: (err) => {
          console.error('Upload failed', err);
          this.isUploading = false;
        },
      });
    }
  }
}
