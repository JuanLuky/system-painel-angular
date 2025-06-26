import { Component } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  imports: [],
  template: `
    <div class="text-center py-16 animate-fade-in">
      <div class="mx-auto w-24 h-24 bg-medical-100 rounded-full flex items-center justify-center mb-6">
        <svg class="w-12 h-12 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">Nenhum paciente na fila</h3>
      <p class="text-gray-600 max-w-sm mx-auto">
        Quando houver pacientes aguardando atendimento, eles aparecerão aqui para que você possa chamá-los.
      </p>
    </div>
  `
})
export class EmptyStateComponent {

}
