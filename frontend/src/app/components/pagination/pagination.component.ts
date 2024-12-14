import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  imports: [CommonModule, FormsModule],
})
export class PaginationComponent {
  @Input() itemsPerPage = 10;
  @Input() limitOptions: number[] = [10, 20, 50];
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();
  @Output() limitChange = new EventEmitter<number>();

  changePage(page: number) {
    this.pageChange.emit(page);
  }

  changeLimit() {
    this.limitChange.emit(this.itemsPerPage);
  }
}
