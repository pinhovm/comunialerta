export interface IPerson {
  id: string;
  cpf: string;
  name: string;
  cns: string;
  identity?: string;
  age: string;
  sex: "M" | "F";
  diabetes: boolean;
  hypertension: boolean;
  heartProblem: boolean;
  isGestante: boolean;
}
