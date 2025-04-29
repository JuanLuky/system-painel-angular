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

  private baseUrl = 'http://localhost:8080/api'; // organizando o caminho

  constructor(private http: HttpClient) {}

  cadastrarPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.baseUrl}/paciente`, paciente);
  }

  cadastrarConsultorio(consultorio: Consultorio): Observable<Consultorio> {
    return this.http.post<Consultorio>(`${this.baseUrl}/consultorios`, consultorio);
  }

  chamarPaciente(pacienteId: string): Observable<Senha> {
    return this.http.post<Senha>(`${this.baseUrl}/senhas/chamar/${pacienteId}`, {});
  }
}
