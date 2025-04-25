import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // 🌀 Otimiza detecção de mudanças
    provideHttpClient(),                                   // 🌐 Habilita uso do HttpClient
    provideRouter(routes)                                  // 🧭 Configura o roteamento
  ]
};
