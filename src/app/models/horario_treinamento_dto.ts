import { ExercicioDTO } from "./exercicio-dto";

export class HorarioTreinamentoDTO {
  diaSemana: number;
  dataTreinamento: Date;
  descricao: string;
  exercicioDTOList: ExercicioDTO[];
  eventoId: number;

  constructor(
    diaSemana: number,
    dataTreinamento: Date,
    descricao: string,
    exercicioDTOList: ExercicioDTO[],
    eventoId: number
  ) {
    this.diaSemana = diaSemana;
    this.dataTreinamento = dataTreinamento;
    this.descricao = descricao;
    this.exercicioDTOList = exercicioDTOList;
    this.eventoId = eventoId;
  }
}
