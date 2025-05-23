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
    this.api.chamarSenhaPaciente(pacienteId)
    .subscribe({
      next: () => {
        this.errormessage = '';
        this.sucessMessage = 'Senha chamada com sucesso!';
        this.showAlert = true;

        setTimeout(() => {
          this.showAlert = false;
          this.refresh(); // Atualiza a lista de pacientes
        },2000);
      },
      error: (err) => {
        this.errormessage = err.error.message;
        this.sucessMessage = '';

        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
          this.refresh(); // Atualiza a lista de pacientes
        },2000);
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
}
