import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, timer } from 'rxjs';
import type { Paciente } from '../interfaces/paciente.modal';
import type { Consultorio } from '../interfaces/consultorio.modal';
import type { Senha } from '../interfaces/senha.modal';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = environment.API_URL; // organizando o caminho

  private readonly ULTIMAS_SENHAS_LIMITE = 3;

  constructor(private http: HttpClient) {}

  cadastrarPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.API_URL}/paciente`, paciente);
  }

  removerPaciente(pacienteid: number): Observable<Paciente> {
    return this.http.delete<Paciente>(`${this.API_URL}/paciente/${pacienteid}`);
  }

  listarPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.API_URL}/paciente`);
  }

  cadastrarConsultorio(consultorio: Consultorio): Observable<Consultorio> {
    return this.http.post<Consultorio>(
      `${this.API_URL}/consultorios`,
      consultorio
    );
  }

  // Método para listar senhas chamadas com polling
  // Retorna as 3 senhas mais recentes, ordenadas por data e hora.
  // O operador switchMap é usado para fazer a requisição HTTP a cada intervalo de polling
  // O método pode ser usado para atualizar a lista de senhas chamadas em tempo real,
  // sem a necessidade de recarregar a página.
  listarUltimasSenhasChamadas(
    pollingIntervalMs: number = 10000
  ): Observable<Senha[]> {
    return timer(0, pollingIntervalMs).pipe(
      switchMap(() =>
        this.http
          .get<Senha[]>(`${this.API_URL}/senhas/listar-senhas-chamadas`)
          .pipe(
            catchError((error) => {
              console.error('Erro ao buscar senhas:', error);
              return of([]);
            })
          )
      ),
      map((senhas) => this.ordenarSenhasPorDataDecrescente(senhas)),
      map((senhasOrdenadas) =>
        senhasOrdenadas.slice(0, this.ULTIMAS_SENHAS_LIMITE)
      )
    );
  }

  chamarSenhaPaciente(pacienteId: number, consultorioId: number): Observable<Senha> {
    return this.http.post<Senha>(
      `${this.API_URL}/senhas/chamar/${pacienteId}?consultorioId=${consultorioId}`,
      {}
    );
  }

  listarConsultorios(): Observable<Consultorio[]> {
    return this.http.get<Consultorio[]>(`${this.API_URL}/consultorios`);
  }

  ocuparConsultorio(consultorioId: string): Observable<Consultorio> {
    return this.http.patch<Consultorio>(
      `${this.API_URL}/consultorios/${consultorioId}`,
      { status: 'OCUPADO' }
    );
  }

  liberarConsultorio(consultorioId: string): Observable<Consultorio> {
    return this.http.patch<Consultorio>(
      `${this.API_URL}/consultorios/${consultorioId}`,
      { status: 'DISPONIVEL' }
    );
  }

  private ordenarSenhasPorDataDecrescente(senhas: Senha[]): Senha[] {
    return senhas.sort(
      (a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime()
    );
  }
}
