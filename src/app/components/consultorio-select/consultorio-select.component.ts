import { Consultorio } from './../../interfaces/consultorio.modal';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-consultorio-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './consultorio-select.component.html',
})
export class ConsultorioSelectComponent {
  @Input() consultorios: Consultorio[] = [];
  @Input() selectedConsultorio: Consultorio | null = null;
  @Output() selectedConsultorioChange = new EventEmitter<Consultorio>();

  constructor(private api: ApiService) {
    // Inicializa a lista de consultórios
    this.refresh();
  }

  // buscar consultórios de uma API ou serviço
  refresh() {
    this.api.listarConsultorios().subscribe((pacientes) => {
      this.consultorios = pacientes;
    });
  }

  onSelectChange(event: Event): void {
  const selectedId = +(event.target as HTMLSelectElement).value;
  const consultorio = this.consultorios.find(c => c.id === selectedId);
  if (consultorio) {
    this.selectedConsultorioChange.emit(consultorio);
  }
}

}
