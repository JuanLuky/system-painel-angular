import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, timer } from 'rxjs';
import type { Paciente } from '../interfaces/paciente.modal';
import type { Consultorio } from '../interfaces/consultorio.modal';
import type { Senha } from '../interfaces/senha.modal';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = environment.API_URL; // organizando o caminho

  constructor(private http: HttpClient) {}

  cadastrarPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.API_URL}/paciente`, paciente);
  }

  removerPaciente(pacienteid : number): Observable<Paciente> {
    return this.http.delete<Paciente>(`${this.API_URL}/paciente/${pacienteid}`);
  }

  listarPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.API_URL}/paciente`);
  }

  cadastrarConsultorio(consultorio: Consultorio): Observable<Consultorio> {
    return this.http.post<Consultorio>(`${this.API_URL}/consultorios`, consultorio);
  }

  listarSenhasChamadas(pollingInterval: number = 10000): Observable<Senha[]> {
    return timer(0, pollingInterval).pipe(
      switchMap(() => this.http.get<any[]>(`${this.API_URL}/senhas/listar-senhas-chamadas`)),
      map(senhas => {
        return senhas
          .sort((a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime())
          .slice(0, 3);
      })
    );
  }

  chamarSenhaPaciente(pacienteId: number): Observable<Senha> {
    return this.http.post<Senha>(`${this.API_URL}/senhas/chamar/${pacienteId}`, {});
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


}
