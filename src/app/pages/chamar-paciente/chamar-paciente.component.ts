import type { Consultorio } from './../../interfaces/consultorio.modal';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import type { Paciente } from '../../interfaces/paciente.modal';

import { HeaderComponent } from '../../components/header/header.component';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { ConsultorioSelectComponent } from '../../components/consultorio-select/consultorio-select.component';
import { AlertMessageComponent } from '../../components/alert-message/alert-message.component';

@Component({
  selector: 'app-chamar-paciente',
  imports: [
    CommonModule,
    HeaderComponent,
    EmptyStateComponent,
    ModalComponent,
    ConsultorioSelectComponent,
    AlertMessageComponent,
  ],
  templateUrl: './chamar-paciente.component.html',
})
export class ChamarPacienteComponent {
  showAlert = false;

  modalAberto = false;
  acaoSelecionada: 'chamar' | 'remover' | null = null;

  consultorios: Consultorio[] = [];
  consultorioSelecionado: Consultorio | null = null; // Consultório selecionado para chamar o paciente

  pacienteSelecionado: Paciente | null = null;
  pacientes: Paciente[] = []; // Array para armazenar os pacientes

  errormessage = '';
  sucessMessage = '';


  constructor(private api: ApiService) {
    this.refresh();
    this.carregarConsultorios();
  }

  carregarConsultorios(): void {
    this.api.listarConsultorios().subscribe({
      next: (consultorios) => {
        this.consultorios = consultorios;
      },
      error: (err) => {
        console.error('Erro ao carregar consultórios:', err);
      }
    });
  }

  chamarPaciente(pacienteId: number): void {
    if (!this.consultorioSelecionado) {
      this.errormessage = 'Selecione um consultório antes de chamar o paciente';
      this.showAlert = true;
      this.timer();
      return;
    }

    this.api.chamarSenhaPaciente(pacienteId, this.consultorioSelecionado.id).subscribe({
      next: () => {
        this.errormessage = '';
        this.sucessMessage = 'Senha chamada com sucesso!';
        this.showAlert = true;
        this.timer();
      },
      error: (err) => {
        this.sucessMessage = '';
        this.errormessage = err.error.message || 'Erro ao chamar paciente';
        this.showAlert = true;
        this.timer();
      },
    });
    this.fecharModal();
  }

  onConsultorioSelecionado(consultorio: Consultorio): void {
    this.consultorioSelecionado = consultorio;
  }
  timer() {
    setTimeout(() => {
      this.showAlert = false;
      this.refresh(); // Atualiza a lista de pacientes
    }, 2500);
  }

  formatarCPF(cpf: string): string {
    if (!cpf) return '';
    // Formata o CPF para o padrão XXX.XXX.XXX-XX
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
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

  abrirModalChamar(paciente: Paciente, acao: 'chamar' | 'remover') {
    this.pacienteSelecionado = paciente;
    this.acaoSelecionada = acao;
    this.modalAberto = true;
  }

  confirmarAcao() {
    if (this.acaoSelecionada === 'chamar') {
      this.chamarPaciente(this.pacienteSelecionado?.id || 0);
    } else if (this.acaoSelecionada === 'remover') {
      this.confirmarRemocao();
    }
  }


  fecharModal() {
    this.modalAberto = false;
    this.pacienteSelecionado = null;
    this.consultorioSelecionado = null;
  }


  confirmarRemocao() {
    if (!this.pacienteSelecionado) {
      this.showAlert = true;
      this.errormessage = 'Por favor, selecione um paciente para remover.';

      this.timer();
      return;
    }
    // Chama o método de remoção do paciente
    this.removerPaciente(this.pacienteSelecionado.id);
    this.errormessage = '';
    this.showAlert = true;
    this.sucessMessage = 'Paciente removido com sucesso!';
    this.timer();
    this.fecharModal();
  }

  getPriorityCount(): number {
    return this.pacientes.filter((p) => p.prioridade).length;
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
