export interface IUser {
  id: number;
  login: string;
  password: string;
  nome: string;
  sobrenome: string;
  email: string;
  area: number;
  microArea: number;
  roleFilter: "SECRETARIO" | "ACS" | "ADMIN";
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  cep: string;
}
