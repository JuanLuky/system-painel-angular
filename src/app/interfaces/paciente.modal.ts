export interface Paciente {
  id: number;
  nome: string;
  prioridade: boolean;
  status: 'NAO_ATENDIDO' | 'EM_ATENDIMENTO' | 'ATENDIDO';
  dataCadastro?: string;
}
