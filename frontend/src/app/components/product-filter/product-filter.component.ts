import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ProductFilterComponent {
  searchQuery = '';
  @Output() search = new EventEmitter<string>();
  @Output() reset = new EventEmitter<void>();

  onSearch() {
    this.search.emit(this.searchQuery);
  }

  onReset() {
    this.searchQuery = '';
    this.reset.emit();
  }
}
