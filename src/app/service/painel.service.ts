import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import type { Senha } from '../interfaces/senha.modal';
import SockJS from 'sockjs-client';
import { Client, Message } from '@stomp/stompjs';




@Injectable({
  providedIn: 'root'
})
export class PainelService {

  private baseUrl = 'http://localhost:8080';
  private stompClient!: Client;
  private senhaSubject = new BehaviorSubject<Senha | null>(null);

  senha$ = this.senhaSubject.asObservable();

  constructor() {
    this.connectWebSocket();
  }
  private connectWebSocket() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(`${this.baseUrl}/ws`),
      reconnectDelay: 5000,
    });

    this.stompClient.onConnect = () => {
      console.log('Conectado ao WebSocket!');
      this.stompClient.subscribe('/topic/painel', (message: Message) => {
        const senha: Senha = JSON.parse(message.body);
        this.senhaSubject.next(senha);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Erro STOMP', frame);
    };

    this.stompClient.activate();
  }
}
