import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import type { Paciente } from '../../interfaces/paciente.modal';
import type { Senha } from '../../interfaces/senha.modal';

@Component({
  selector: 'app-chamar-paciente',
  imports: [CommonModule],
  templateUrl: './chamar-paciente.component.html',
})
export class ChamarPacienteComponent {
  pacientes: Paciente[] = []; // Array para armazenar os pacientes
  senhasNaoChamadas: Senha[] = [];

  constructor(private api: ApiService) {
    this.senhasNaoChamadas = [];
    this.refresh();
    this.carregarSenhasNaoChamadas();
  }


  carregarSenhasNaoChamadas() {
    this.api.listarSenhasNaoChamadas().subscribe(senhas => {
      this.senhasNaoChamadas = senhas;
    })
  }

  chamarPaciente(pacienteId: number) {
    this.api.chamarSenhaPaciente(pacienteId).subscribe(() => {
      this.carregarSenhasNaoChamadas();
    })
  }

  refresh() {
    this.api.listarPacientes().subscribe((pacientes) => {
      this.pacientes = pacientes;
    });
  }

}
