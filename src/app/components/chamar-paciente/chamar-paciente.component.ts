import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import type { Paciente } from '../../interfaces/paciente.modal';
import type { Senha } from '../../interfaces/senha.modal';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-chamar-paciente',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './chamar-paciente.component.html',
})
export class ChamarPacienteComponent {
  pacientes: Paciente[] = []; // Array para armazenar os pacientes

  constructor(private api: ApiService) {
    this.refresh();
  }

  chamarPaciente(pacienteId: number) {
    this.api.chamarSenhaPaciente(pacienteId).subscribe(() => {
      this.refresh();
    });
  }

  removerPaciente(pacienteId: number) {
    this.api.removerPaciente(pacienteId).subscribe({
      next: () => this.refresh(),
      error: (err) => console.error('Erro ao remover:', err),
    });
  }

  refresh() {
    this.api.listarPacientes().subscribe((pacientes) => {
      this.pacientes = pacientes;
    });
  }
}
