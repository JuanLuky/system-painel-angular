import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-painel-senha',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './painel-senha.component.html',
})
export class PainelSenhaComponent {

  constructor(private router: Router) { }

  senhaAtual = {
    nome: 'Juan Carlos',
    consultorio: '01',
    tipo: 'normal',
  };

  historico = [
    { nome: 'Loren Santos', consultorio: '02', tipo: 'prioritario' },
    { nome: 'Neymar Jr', consultorio: 'Emergência', tipo: 'emergencia' },
    { nome: 'Maria Silva', consultorio: '03', tipo: 'normal' },
  ];

  onBack() {
    this.router.navigate(['/']);
  }
}
