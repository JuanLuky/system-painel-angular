import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import type { Senha } from '../../interfaces/senha.modal';
import { Client, type IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Component({
  selector: 'app-painel-senha',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './painel-senha.component.html',
})
export class PainelSenhaComponent {


  stompClient?: Client;
  senhaAtual?: Senha;

  constructor() {
    this.conectarWebSocket();
  }

  conectarWebSocket(): void {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('https://localhost:8080/ws'),
      debug: str => console.log(str),
    });

    this.stompClient.onConnect = () => {
      this.stompClient?.subscribe('/topic/senha', (message: IMessage) => {
        this.senhaAtual = JSON.parse(message.body);
        console.log('Nova senha recebida:', this.senhaAtual);

        setTimeout(() => {
          this.senhaAtual = undefined; // Limpa a senha atual após 5 segundos
        }, 8000);
      });
    };

    this.stompClient.activate();
  }

}
