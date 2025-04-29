import { PainelService } from './../../service/painel.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import type { Senha } from '../../interfaces/senha.modal';

@Component({
  selector: 'app-painel-senha',
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center">
    <h1 class="text-5xl font-bold mb-6">Painel de Chamadas</h1>

    <div *ngIf="senha; else aguardando" class="bg-gray-800 p-10 rounded-lg">
      <h2 class="text-4xl mb-2">{{ senha.pacienteNome }}</h2>
      <p class="text-2xl">Consultório: {{ senha.consultorioNome }}</p>
    </div>

    <ng-template #aguardando>
      <p class="text-2xl">Aguardando chamada...</p>
    </ng-template>
  </div>
  `
})
export class PainelSenhaComponent {

  senha: Senha | null = null;



  constructor(private painelService: PainelService, private router: Router) {
    this.painelService.senha$.subscribe((novaSenha) => {
      if (novaSenha) {
        console.log('Nova senha chamada:', novaSenha);
        this.senha = novaSenha;
      }
    });
    }

  onBack() {
    this.router.navigate(['/']);
  }
}
