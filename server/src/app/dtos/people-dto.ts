export type CreatePersonInputDto = {
  name: string;
  bi: string;
  phone?: string;
};

export type GetPersonOutputDto = {
  name: string;
  bi: string;
  phone?: string;
};
