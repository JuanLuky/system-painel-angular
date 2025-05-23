import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { Paciente } from '../interfaces/paciente.modal';
import type { Consultorio } from '../interfaces/consultorio.modal';
import type { Senha } from '../interfaces/senha.modal';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://localhost:8443/api'; // organizando o caminho

  constructor(private http: HttpClient) {}

  cadastrarPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.baseUrl}/paciente`, paciente);
  }

  removerPaciente(pacienteid : number): Observable<Paciente> {
    return this.http.delete<Paciente>(`${this.baseUrl}/paciente/${pacienteid}`);
  }

  listarPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.baseUrl}/paciente`);
  }

  cadastrarConsultorio(consultorio: Consultorio): Observable<Consultorio> {
    return this.http.post<Consultorio>(`${this.baseUrl}/consultorios`, consultorio);
  }

  listarSenhasNaoChamadas(): Observable<Senha[]> {
    return this.http.get<Senha[]>(`${this.baseUrl}/senhas/listar-senhas-nao-chamadas`);
  }

  chamarSenhaPaciente(pacienteId: number): Observable<Senha> {
    return this.http.post<Senha>(`${this.baseUrl}/senhas/chamar/${pacienteId}`, {});
  }

  listarConsultorios(): Observable<Consultorio[]> {
    return this.http.get<Consultorio[]>(`${this.baseUrl}/consultorios`);
  }

  ocuparConsultorio(consultorioId: string): Observable<Consultorio> {
    return this.http.patch<Consultorio>(
      `${this.baseUrl}/consultorios/${consultorioId}`,
      { status: 'OCUPADO' }
    );
  }

  liberarConsultorio(consultorioId: string): Observable<Consultorio> {
    return this.http.patch<Consultorio>(
      `${this.baseUrl}/consultorios/${consultorioId}`,
      { status: 'DISPONIVEL' }
    );
  }


}
