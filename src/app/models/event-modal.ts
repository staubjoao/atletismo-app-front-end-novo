import { Club } from "./club-modal";

export interface Evento {
  id?: number;
  nome: string;
  tipo: string;
  clube: Club;
}
