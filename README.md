Melhore a ui ux desse painel de senha, sem criar themas somente e components

Cores :

@import "tailwindcss";

@theme {
  --color-medical-50: #f0fdf4;
  --color-medical-100: #dcfce7;
  --color-medical-200: #bbf7d0;
  --color-medical-300: #86efac;
  --color-medical-400: #4ade80;
  --color-medical-500: #22c55e;
  --color-medical-600: #059669;
  --color-medical-700: #047857;
  --color-medical-800:#065f46;
  --color-medical-900:#064e3b;
}


Arquivo HTML:
<app-header></app-header>

<div
  class="min-h-[calc(100vh-65px)] min-w-screen bg-green-600 flex flex-col items-center px-4 py-6"
>
  <div class="w-full max-w-5xl flex flex-col items-center mt-10">
    <div class="flex flex-col items-center justify-center gap-2 w-full">
      <!-- Senha em destaque -->
      @if (senhaAtual) {
      <div
        class="w-full min-h-[300px] sm:min-h-[450px] flex flex-col items-center justify-center p-6 sm:p-10 text-center text-white"
      >
        <h2 class="text-3xl sm:text-6xl font-bold break-words">
          {{ senhaAtual.nomePaciente }}
        </h2>
        <p class="text-xl sm:text-4xl font-semibold mt-2">
          {{ senhaAtual.nomeConsultorio }}
        </p>
        <span
          class="block mt-4 text-lg sm:text-3xl font-semibold uppercase tracking-wide"
        >
          {{ senhaAtual.chamado ? "Chamado" : "Aguardando" }}
        </span>
      </div>
      } @else {
      <div
        class="text-center w-full min-h-[300px] sm:min-h-[450px] flex flex-col items-center justify-center p-6 sm:p-10"
      >
        <h2 class="text-3xl sm:text-5xl font-bold text-white">
          Bem vindo! <br />
          Aguarde sua senha
        </h2>
      </div>
      }

      <!-- Senhas em espera -->
      <div class="w-full fixed bottom-2 sm:bottom-16 px-2 flex justify-center">
        <div
          class="w-full max-w-[98%] flex flex-col sm:flex-row flex-wrap gap-3 justify-center"
        >
          @for( senha of ultimasSenhas; track senha.id) {
          <div
            class="p-4 sm:p-6 flex-1 bg-blue-900 rounded shadow-lg text-white text-center"
          >
            <h3 class="text-base sm:text-lg font-bold break-words">
              {{ senha.nomePaciente }}
            </h3>
            <p class="text-sm sm:text-base font-semibold">
              {{ senha.nomeConsultorio }}
            </p>
            <span class="uppercase text-xs sm:text-sm block mt-2">
              {{ senha.chamado ? "Chamado" : "Aguardando" }}
            </span>
          </div>
          }
        </div>
      </div>
    </div>
  </div>
</div>


Aquivo TS

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
    this.subscription = this.api.listarSenhasChamadas()
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


