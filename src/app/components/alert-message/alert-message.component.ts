import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  imports: [CommonModule],
  template: `
    <div
      *ngIf="showAlert"
      class="fixed z-50 text-center right-4 sm:right-6 bottom-4 sm:bottom-6 px-4 sm:px-6 py-3 rounded-lg shadow-lg transition-opacity duration-500 text-sm sm:text-base"
      [ngClass]="
        errormessage ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
      "
    >
      {{ errormessage || sucessMessage }}
    </div>
  `

})
export class AlertMessageComponent {
  @Input() showAlert = false;
  @Input() errormessage?: string;
  @Input() sucessMessage?: string;

}
