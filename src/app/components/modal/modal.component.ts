import { Paciente } from './../../interfaces/paciente.modal';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() confirmButtonText = 'Confirmar';
  @Input() cancelButtonText = 'Cancelar';
  @Input() confirmButtonClass = 'bg-blue-500 hover:bg-blue-600';
  @Input() showCancelButton = true;

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  onConfirm(event: Event) {
    this.confirm.emit();
  }

  onOverlayClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}
