import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PRODUCT_SORT_OPTIONS } from 'src/app/app.constant';
import { ProductActions } from 'src/app/store/product.actions';
import { selectQueryParams } from 'src/app/store/product.selectors';

@Component({
  selector: 'app-product-sort',
  templateUrl: './product-sort.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ProductSortComponent {
    private store = inject(Store);
    queryParams$: Observable<{ sortBy: string; sortDirection: string }> = this.store.select(selectQueryParams);
    readonly sortFields: string[] = PRODUCT_SORT_OPTIONS;

    applySort(field: string): void {
      this.store.dispatch(ProductActions.updateSort({ sortBy: field }));
    }
  
}
