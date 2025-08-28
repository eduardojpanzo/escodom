import { PeopleProps } from "#core/entities/people.js";

export interface ICreatePersonUseCase {
  execute(
    data: Pick<PeopleProps, "name" | "bi" | "phone">
  ): Promise<{ personId: string }>;
}

export interface IGetPersonUseCase {
  execute(personId: string): Promise<PeopleProps>;
}

export interface IDeletePersonUseCase {
  execute(personId: string): Promise<{ personId: string }>;
}

export interface IChangePersonDataUseCase {
  execute(
    personId: string,
    data: Partial<PeopleProps>
  ): Promise<{ personId: string }>;
}
