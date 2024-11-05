export class ExercicioDTO {
  indice: number;
  descricao: string;
  tipo: string;

  constructor(indice: number, descricao: string, tipo: string) {
    this.indice = indice;
    this.descricao = descricao;
    this.tipo = tipo;
  }
}
