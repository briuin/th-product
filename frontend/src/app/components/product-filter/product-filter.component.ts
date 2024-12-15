import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProductActions } from 'src/app/store/product.actions';
import { selectQueryParams } from 'src/app/store/product.selectors';
import { UiInputComponent } from 'src/app/ui/ui-input.component';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, UiInputComponent],
})
export class ProductFilterComponent {
  searchQuery = '';

  constructor(private store: Store) {
    this.store.select(selectQueryParams).subscribe((queryParams) => {
      this.searchQuery = queryParams.searchText || '';
    });
  }

  onSearch(): void {
    this.store.dispatch(
      ProductActions.updateQueryParams({ queryParams: { searchText: this.searchQuery } })
    );
  }

  onReset(): void {
    this.searchQuery = '';
    this.store.dispatch(ProductActions.updateQueryParams({ queryParams: { searchText: '' } }));
  }
}
