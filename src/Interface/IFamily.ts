import { IPerson } from "./IPerson";

export interface IFamily {
  id: number;
  cellphoneHOF: string;
  email: string;
  area: number;
  microarea: number;
  headOfFamilyNickname: string;
  people: IPerson[];
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}
