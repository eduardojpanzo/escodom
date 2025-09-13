export type CreatePersonInputDto = {
  name: string;
  birthDate: Date;
  baptized: "no" | "yes";
  profession?: string | null;
  phone?: string | null;
  type?: "outro" | "monitor" | "aluno";
};

export type GetPersonOutputDto = {
  name: string;
  personalCode: string;
  birthDate: Date;
  baptized: "no" | "yes";
  profession?: string | null;
  phone?: string | null;
};
