import { PeopleProps } from "#core/entities/people.js";

export interface ICreatePersonUseCase {
  execute(
    data: Omit<PeopleProps, "personId" | "createdAt" | "updatedAt">
  ): Promise<{ personId: string }>;
}

export interface IGetPersonUseCase {
  execute(fields: { personId?: string; bi?: string }): Promise<PeopleProps>;
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
