import { PeopleProps } from "#core/entities/people.js";

export type CreatePersonInputDto = Omit<
  PeopleProps,
  "personId" | "personalCode" | "createdAt" | "updatedAt"
> & {
  type?: "outro" | "monitor" | "aluno";
};

export type GetPersonOutputDto = PeopleProps;
