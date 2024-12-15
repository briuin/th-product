import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ui-input',
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class UiInputComponent {
  @Input() dataSpec: string = '';
  @Input() type: string = 'text'; 
  @Input() placeholder: string = ''; 
  @Input() value: any; 
  @Input() customClass: string = ''; 

  @Output() valueChange = new EventEmitter<any>();

  onValueChange(rawValue: any): void {
    this.valueChange.emit(this.type === 'number' ? Number(rawValue) : rawValue); 
  }
}
