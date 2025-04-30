import { PainelService } from './../../service/painel.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import type { Senha } from '../../interfaces/senha.modal';

@Component({
  selector: 'app-painel-senha',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './painel-senha.component.html',
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
