import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { ApiService } from '../../service/api.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-controle-medico',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './controle-medico.component.html',
})
export class ControleMedicoComponent {

  // Variáveis para armazenar os dados dos consultórios e pacientes
  consultorios: any[] = [];

  constructor(private api : ApiService, private router: Router) {
    this.refresh();
  }

  refresh() {
    this.api.listarConsultorios().subscribe((pacientes) => {
      this.consultorios = pacientes;
    });
  }

  ocuparConsultorio(consultorioid: string, consultorioStatus: string) {

    if (consultorioStatus === 'DISPONIVEL') {
      // Ocupa o consultório
      this.api.ocuparConsultorio(consultorioid).subscribe({
        next: (res) => {
          console.log('Consultório ocupado com sucesso!');
          this.refresh(); // Atualiza a lista de consultórios após a ocupação
        },
        error: (err) => {
          console.error('Erro ao ocupar consultório:', err);
        }
      });
    } else if (consultorioStatus === 'OCUPADO') {
      // Libera o consultório
      this.api.liberarConsultorio(consultorioid).subscribe({
        next: (res) => {
          console.log('Consultório liberado com sucesso!');
          this.refresh(); // Atualiza a lista de consultórios após a liberação
        },
        error: (err) => {
          console.error('Erro ao liberar consultório:', err);
        }
      });
    }

  }


  irParaChamada() {
    this.router.navigate(['/chamar-paciente']);
  }



}
