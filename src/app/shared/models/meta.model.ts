export interface Meta {
  id: string;
  titulo: string;
  descricao: string;
  tipo: string; // por exemplo
  paginasLidas: number;
  objetivoPaginas: number;
  alvo: number | string;     // número de páginas ou ID do livro
  dataLimite?: Date;       // opcional
  concluida: boolean;
  dataConclusao?: string;
}
