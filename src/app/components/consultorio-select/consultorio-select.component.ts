import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultorio-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './consultorio-select.component.html',
})
export class ConsultorioSelectComponent {
  @Input() selectedConsultorio = '';
  @Output() selectedConsultorioChange = new EventEmitter<string>();

  consultorios = [
    { value: '1', label: 'Consultório 1' },
    { value: '2', label: 'Consultório 2' },
    { value: '3', label: 'Consultório 3' },
    { value: '4', label: 'Consultório 4' }
  ];

  onSelectionChange(value: string) {
    this.selectedConsultorioChange.emit(value);
  }
}
