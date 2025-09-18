import { PaginatedResult, PaginationParams } from "#core/common/pagination.js";
import { PeopleProps } from "#core/entities/people.js";

export interface ICreatePersonUseCase {
  execute(
    data: Omit<
      PeopleProps & { type?: "outro" | "monitor" | "aluno" },
      "personId" | "personalCode" | "createdAt" | "updatedAt"
    >
  ): Promise<{ personId: string }>;
}

export interface IGetAllPeopleUseCase {
  execute(filters: PaginationParams): Promise<PaginatedResult<PeopleProps>>;
}

export interface IGetPersonUseCase {
  execute(fields: {
    personId?: string;
    personalCode?: string;
  }): Promise<PeopleProps>;
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
