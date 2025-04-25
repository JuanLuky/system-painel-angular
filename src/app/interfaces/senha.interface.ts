import type { Paciente } from "./paciente.interface";

export interface Senha {
  id: number;
  codigo: string; // Ex: "A001"
  paciente: Paciente;
  prioridade: 'normal' | 'preferencial' | 'emergencia';
  status: 'aguardando' | 'chamado' | 'concluido';
  consultorioId?: number;
}
