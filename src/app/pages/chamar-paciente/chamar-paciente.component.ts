import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import type { Paciente } from '../../interfaces/paciente.modal';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-chamar-paciente',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './chamar-paciente.component.html',
})
export class ChamarPacienteComponent {
  showAlert = false;

  errormessage = '';
  sucessMessage = '';

  pacientes: Paciente[] = []; // Array para armazenar os pacientes

  constructor(private api: ApiService) {
    this.refresh();
  }

  chamarPaciente(pacienteId: number) {
    // Chama a senha do paciente e atualiza a lista de pacientes
    this.api.chamarSenhaPaciente(pacienteId).subscribe({
      next: () => {
        this.errormessage = '';
        this.sucessMessage = 'Senha chamada com sucesso!';
        this.showAlert = true;

        setTimeout(() => {
          this.showAlert = false;
          this.refresh(); // Atualiza a lista de pacientes
        }, 2000);
      },
      error: (err) => {
        this.errormessage = 'A senha já foi chamada!';
        this.sucessMessage = '';

        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
          this.refresh(); // Atualiza a lista de pacientes
        }, 2000);
      },
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

  getPriorityCount(): number {
    return this.pacientes.filter(p => p.prioridade).length;
  }

  getStatusStyle(status: string): string {
    switch (status) {
      case 'NAO_ATENDIDO':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'EM_ATENDIMENTO':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'ATENDIDO':
        return 'bg-green-100 text-green-800 border border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  }

  getStatusDotStyle(status: string): string {
    switch (status) {
      case 'NAO_ATENDIDO':
        return 'bg-yellow-400';
      case 'EM_ATENDIMENTO':
        return 'bg-blue-400';
      case 'ATENDIDO':
        return 'bg-green-400';
      default:
        return 'bg-gray-400';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'NAO_ATENDIDO':
        return 'Não Atendido';
      case 'EM_ATENDIMENTO':
        return 'Em Atendimento';
      case 'ATENDIDO':
        return 'Atendido';
      default:
        return status;
    }
  }
}
