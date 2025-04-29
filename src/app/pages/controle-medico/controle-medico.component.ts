import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-controle-medico',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './controle-medico.component.html',
})
export class ControleMedicoComponent {

  consultorios = [
    { id: '01', nome: 'Consultório 01', disponivel: true },
    { id: '02', nome: 'Consultório 02', disponivel: false },
    { id: '03', nome: 'Consultório 04', disponivel: true },
    { id: '03', nome: 'Consultório 04', disponivel: true },
  ];

  alternarDisponibilidade(consultorio: any) {
    consultorio.disponivel = !consultorio.disponivel;
    // Aqui pode enviar pro backend com HTTP PATCH/PUT futuramente
  }
}
