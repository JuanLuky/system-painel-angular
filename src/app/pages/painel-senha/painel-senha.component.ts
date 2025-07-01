import { CommonModule } from '@angular/common';
import { Component, type OnDestroy, type OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import type { Senha } from '../../interfaces/senha.modal';
import { Client, type IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ApiService } from '../../service/api.service';
import type { Subscription } from 'rxjs';

@Component({
  selector: 'app-painel-senha',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './painel-senha.component.html',
})
export class PainelSenhaComponent implements OnDestroy {

    public today: Date = new Date();


  ultimasSenhas: Senha[] = [];
  private subscription?: Subscription;


  stompClient?: Client;
  senhaAtual?: Senha;

  constructor(private api: ApiService) {
    this.conectarWebSocket();
    this.carregarSenhasChamadas();
  }

  conectarWebSocket(): void {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('https://spring-painel-senha.onrender.com/ws'),
      // webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      debug: str => console.log(str),
    });

    this.stompClient.onConnect = () => {
      this.stompClient?.subscribe('/topic/senha', (message: IMessage) => {
        this.senhaAtual = JSON.parse(message.body);
        console.log('Nova senha recebida:', this.senhaAtual);

        setTimeout(() => {
          this.senhaAtual = undefined; // Limpa a senha atual após 10 segundos
        }, 10000);
      });
    };

    this.stompClient.activate();
  }

  carregarSenhasChamadas() {
    // Método para carregar senhas chamadas, se necessário
    this.subscription = this.api.listarUltimasSenhasChamadas()
    .subscribe({
      next: (senhas) => {
        this.ultimasSenhas = senhas;
        console.log('Senhas chamadas:', senhas);
      },
      error: (err) => {
        console.error('Erro ao carregar senhas chamadas:', err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
