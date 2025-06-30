export interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  prioridade: boolean;
  status: 'NAO_ATENDIDO' | 'EM_ATENDIMENTO' | 'ATENDIDO';
  dataCadastro?: string;
}
