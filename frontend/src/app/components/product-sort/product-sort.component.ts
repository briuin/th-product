import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-sort',
  templateUrl: './product-sort.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class ProductSortComponent {
  @Input() sortBy = '';
  @Input() sortDirection = 'asc';
  @Input() sortFields: string[] = [];
  @Output() sort = new EventEmitter<{ sortBy: string; sortDirection: string }>();

  applySort(field: string) {
    const direction = this.sortBy === field && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sort.emit({ sortBy: field, sortDirection: direction });
  }
}
