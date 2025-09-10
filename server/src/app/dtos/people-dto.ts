export type CreatePersonInputDto = {
  name: string;
  bi: string;
  birthDate: Date;
  baptized: "no" | "yes";
  profession?: string | null;
  phone?: string | null;
};

export type GetPersonOutputDto = {
  name: string;
  bi: string;
  birthDate: Date;
  baptized: "no" | "yes";
  profession?: string | null;
  phone?: string | null;
};
